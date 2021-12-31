const CharacterClassSelection = require("./CharacterClassSelection");
const Mode = require("./Mode");

class ActivityStoreInterface {

    #db;
    #select_sync_members;
    #select_activities_for_member_since;
    #select_character_id;
    #select_activities_for_character_since;
    #select_weapon_stats;

    constructor(db) {
        this.db = db;
        this.#initStatements();
    }

    #initStatements() {

        this.select_activities_for_member_since = this.db.prepare(
            `SELECT
                *,
                activity.mode as activity_mode,
                activity.id as activity_index_id,
                character_activity_stats.id as character_activity_stats_index  
            FROM
                character_activity_stats
            INNER JOIN
                activity ON character_activity_stats.activity = activity.id,
                character on character_activity_stats.character = character.id,
                member on member.id = character.member
            WHERE
                member.id = (select id from member where member_id = @memberId) AND
                period > @startMoment AND
                period < @endMoment AND
                exists (select 1 from modes where activity = activity.id and mode = @modeId) AND
                not exists (select 1 from modes where activity = activity.id and mode = @restrictModeId)
            ORDER BY
                activity.period DESC`);

        this.select_activities_for_character_since = this.db.prepare(
            `SELECT
                    *,
                    activity.mode as activity_mode,
                    activity.id as activity_index_id,
                    character_activity_stats.id as character_activity_stats_index  
                FROM
                    character_activity_stats
                INNER JOIN
                    activity ON character_activity_stats.activity = activity.id,
                    character on character_activity_stats.character = character.id,
                    member on member.id = character.member
                WHERE
                    member.id = (select id from member where member_id = @memberId) AND
                    activity.period > @startMoment AND
                    activity.period < @endMoment AND
                    exists (select 1 from modes where activity = activity.id and mode = @modeId) AND
                    not exists (select 1 from modes where activity = activity.id and mode = @restrictModeId) AND
                    character_activity_stats.character = character.id AND
                    character.class = @characterClassId
                ORDER BY
                    activity.period DESC`);

        this.select_sync_members = this.db.prepare('SELECT "member_id", "platform_id", "display_name", "bungie_display_name", "bungie_display_name_code" from sync join member on sync.member = member.id');

        this.select_weapon_stats = this.db.prepare(`
            SELECT
                *
            FROM
                weapon_result
            WHERE character_activity_stats = @characterActivityStatsRowIndex
        `);

        this.select_medals = this.db.prepare(`
            SELECT
                *
            FROM
                medal_result
            WHERE
                character_activity_stats = @characterActivityStatsRowIndex
        `);

        this.select_member = this.db.prepare(`select * from member where member_id = @memberId`);

    }

    //TODO: add support for endDate
    retrieveActivities(memberId, characterSelection, mode, startDate, endDate) {

        let restrictMode = -1;
        if (mode.isPrivate()) {
            restrictMode === Mode.PRIVATE_MATCHES_ALL.id;
        }

        let rows = undefined;

        //NOTE: we could have a single query for both below (character.class IN (0,1,2))
        //but since ALL will probably be the most used case, we have a query just for
        //that which is more efficient (that doing an IN). (about 30% faster).
        if (characterSelection === CharacterClassSelection.ALL) {
            rows = this.select_activities_for_member_since.all({
                memberId: memberId,
                startMoment: startDate.toISOString(),
                endMoment: endDate.toISOString(),
                modeId: mode.id,
                restrictModeId: restrictMode
            });
        } else {

            //TODO: not this could technically be unknown, but it should be
            //validated before being sent in here
            let characterClass = characterSelection.getCharacterClass();

            rows = this.select_activities_for_character_since.all({
                memberId: memberId,
                startMoment: startDate.toISOString(),
                endMoment: (new Date(Date.now())).toISOString(),
                modeId: mode.id,
                restrictModeId: restrictMode,
                characterClassId: characterClass.id
            });
        }

        let activities = [];
        for (let r of rows) {
            let stats = this.parseCrucibleStats(r);

            let player = {
                classType: r.class,
                characterId: r.character_id,
            };

            let summary = {
                period: r.period,
                activityId: r.activity_id,
                mode: r.mode,
                platform: r.platform,
                directorActivityHash: r.director_activity_hash,
                referenceId: r.reference_id,
                player: player,
                stats: stats,
            };


            activities.push(summary);
        }

        return activities;
    }

    parseCrucibleStats(activityRow) {

        let weapons = this.retrieveWeapons(activityRow.character_activity_stats_index);
        let medals = this.retrieveMedals(activityRow.character_activity_stats_index);

        let extended = {
            precisionKills: activityRow.precision_kills,
            abilityKills: activityRow.weapon_kills_ability,
            grenadeKills: activityRow.weapon_kills_grenade,
            meleeKills: activityRow.weapon_kills_melee,
            superKills: activityRow.weapon_kills_super,
            all_medals_earned: activityRow.all_medals_earned,

            weapons: weapons,
            medals: medals,
        };

        let stats = {
            assists: activityRow.assists,
            score: activityRow.score,
            kills: activityRow.kills,
            deaths: activityRow.deaths,
            averageScorePerKill: activityRow.average_score_per_kill,
            averageScoreRerLife: activityRow.average_score_per_life,
            completed: activityRow.completed === 1,
            opponents_defeated: activityRow.opponents_defeated,
            //efficiency: calculate_efficiency(kills, deaths, assists),
            //killsDeathsRatio: calculate_kills_deaths_ratio(kills, deaths),
            //killsDeathsAssists: calculate_kills_deaths_assists(
            //    kills, deaths, assists,
            //),
            activity_duration_seconds: activityRow.activity_duration_seconds,
            standing: activityRow.standing, //TODO: might need to do something here
            team: activityRow.team,
            completionReason: activityRow.completion_reason,
            startSeconds: activityRow.start_seconds,
            timePlayedSeconds: activityRow.time_played_seconds,
            playerCount: activityRow.player_count,
            teamScore: activityRow.team_score,
            extended: extended,
        };

        return stats;
    }

    retrieveMedals(characterActivityStatsRowIndex) {
        let rows = this.select_medals.all(
            { characterActivityStatsRowIndex: characterActivityStatsRowIndex });

        let medals = [];

        for (let r of rows) {

            let id = r.reference_id;

            if (id === "precisionKills" ||
                id === "weaponKillsAbility" ||
                id === "weaponKillsGrenade" ||
                id === "weaponKillsMelee" ||
                id === "weaponKillsSuper" ||
                id === "allMedalsEarned") {
                continue;
            }

            let item = {
                id: r.reference_id,
                count: r.count,
            };

            medals.push(item);
        }

        return medals;
    }

    retrieveWeapons(characterActivityStatsRowIndex) {
        let rows = this.select_weapon_stats.all({ characterActivityStatsRowIndex: characterActivityStatsRowIndex }
        );

        let weaponStats = [];
        for (let r of rows) {
            let item = {
                id: r.reference_id,
                kills: r.kills,
                precisionKills: r.precision_kills,
            };

            weaponStats.push(item);
        }

        return weaponStats;
    }


    retrieveSyncMembers() {
        return this.select_sync_members.all();
    }

    retrieveMember(memberId) {

        let row = this.select_member.get({ memberId: memberId });

        let out = {
            memberId: row.member_id,
            bungieDisplayName: row.bungie_display_name,
            bungieDisplayNameCode: row.bungie_display_name_code,
            platform: row.platform_id,
        }

        return out;
    }
}



module.exports = ActivityStoreInterface;