/* MIT License
 *
 * Copyright (c) 2023 Mike Chambers
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

const Database = require("better-sqlite3");

const NO_TEAMS_INDEX = 253;
const {
    PLAYER_START_BUFFER,
    DB_SCHEMA_VERSION,
    DEFAULT_ACTIVITIES_PAGE_LIMIT,
} = require("../config");

const { Mode, Standing, OrderBy } = require("shared");

class ActivityStoreInterface {
    #db;
    #dbPath;
    #select_sync_members;
    #select_member;
    #select_activity;
    #select_teams;
    #select_character_activity_stats_for_activity;
    #select_version;
    #select_meta_weapons_summary;
    #select_class_meta_summary;
    #select_map_summary;
    #select_weapons_summary;
    #select_player_activity_summary;
    #select_medals_summary;
    #select_latest_activity_id_for_member;

    constructor(dbPath) {
        this.#dbPath = dbPath;

        this.#initDb();
    }

    #initDb() {
        if (this.#db !== undefined) {
            //check this
            this.#db.close();
        }

        console.log(`Using data store at: ${this.#dbPath}`);
        this.#db = new Database(this.#dbPath, { readonly: true });

        this.#initStatements();
    }

    checkVersion() {
        let row = this.#select_version.get();

        if (row.version !== DB_SCHEMA_VERSION) {
            throw Error(
                `DB Schema Version mismatch. Expected [${DB_SCHEMA_VERSION}] found [${row.version}]\n
                Please make sure you are running the correct version of DCLI`
            );
        }
    }

    #initStatements() {
        this.#select_latest_activity_id_for_member = this.#db.prepare(`
            SELECT
                CAST(max(activity_id) as TEXT) as activity_id
            FROM
                activity
            INNER JOIN
                character_activity_stats on character_activity_stats.activity = activity.activity_id,
                character on character_activity_stats.character = character.character_id,
                member on character.member = member.member_id
            WHERE
                member.member_id = @memberId
            `);

        this.#select_teams = this.#db.prepare(`
            SELECT
                *
            FROM
                team_result
            WHERE
                activity = @activityId
        `);

        this.#select_sync_members = this.#db.prepare(
            `SELECT
                CAST("member_id" as text) as member_id,
                "platform_id", "display_name", "bungie_display_name", 
                "bungie_display_name_code"
            FROM
                sync 
            JOIN
                member on sync.member = member.member_id`
        );

        this.#select_member = this.#db.prepare(
            `SELECT
                CAST(member_id as TEXT) as member_id, platform_id, display_name,
                bungie_display_name, bungie_display_name_code
            FROM
                member
            WHERE
                member_id = @memberId`
        );

        //TODO: does this need an ORDER BY AND LIMIT?
        this.#select_activity = this.#db.prepare(`
            SELECT
                CAST(activity.activity_id as TEXT) as activity_id,
                activity.period,
                activity.mode as activity_mode,
                activity.director_activity_hash,
                activity.reference_id,
                activity.platform
            FROM
                activity
            INNER JOIN
                character_activity_stats on character_activity_stats.activity = activity.activity_id,
                character on character_activity_stats.character = character.character_id,
                member on character.member = member.member_id
            WHERE
                activity.activity_id = @activityId
            ORDER BY
                period DESC LIMIT 1
        `);

        this.#select_character_activity_stats_for_activity = this.#db.prepare(`
            SELECT
                CAST(character.member as TEXT) as member_id,
                CAST(character_activity_stats.character as TEXT) as character_id,
                CAST(character_activity_stats.fireteam_id as TEXT) as fireteam_id,

                assists, score, kills, deaths, completed, opponents_defeated, activity_duration_seconds,
                standing, team, completion_reason, start_seconds, time_played_seconds, team_score,
                precision_kills, weapon_kills_grenade, weapon_kills_melee, weapon_kills_super,
                all_medals_earned, light_level, emblem_hash,

                character_activity_stats.id as character_activity_stats_index,
                
                member.bungie_display_name as bungie_display_name,
                member.bungie_display_name_code as bungie_display_name_code,
                member.platform_id as platform_id,

                character.class as class
            FROM
                character_activity_stats
            INNER JOIN
                character on character_activity_stats.character = character.character_id,
                member on character.member = member.member_id
            WHERE
                activity = @activityId
        `);

        this.#select_version = this.#db.prepare(`
            SELECT version from version
        `);

        this.#select_meta_weapons_summary = this.#db.prepare(`
            SELECT
                reference_id as id,
                count(*) as count,
                sum(weapon_result.precision_kills) as precision,
                sum(weapon_result.kills) as kills
            FROM
                weapon_result
            INNER JOIN
                character_activity_stats on 
                weapon_result.character_activity_stats = character_activity_stats.id
            WHERE
                activity in (
                    SELECT
                        activity.activity_id
                    FROM
                        character_activity_stats
                    INNER JOIN
                        activity ON character_activity_stats.activity = activity.activity_id,
                        character on character_activity_stats.character = character.character_id,
                        member on member.member_id = character.member
                    WHERE
                        member.member_id = @memberId AND
                        (character.class = @characterSelectionId OR 4 = @characterSelectionId) AND
                        period > @startDate AND
                        period < @endDate AND
                        exists (select 1 from modes where activity = activity.activity_id and mode = @modeId) AND
                        not exists (select 1 from modes where activity = activity.activity_id and mode = @restrictModeId)
                )
            AND
                fireteam_id not in (
                    SELECT
                        fireteam_id
                    FROM
                        character_activity_stats
                    INNER JOIN
                        activity ON character_activity_stats.activity = activity.activity_id,
                        character on character_activity_stats.character = character.character_id,
                        member on member.member_id = character.member
                    WHERE
                        member.member_id = @memberId AND
                        (character.class = @characterSelectionId OR 4 = @characterSelectionId) AND
                        period > @startDate AND
                        period < @endDate AND
                        exists (select 1 from modes where activity = activity.activity_id and mode = @modeId) AND
                        not exists (select 1 from modes where activity = activity.activity_id and mode = @restrictModeId)
            ) 
            GROUP BY reference_id`);

        this.#select_class_meta_summary = this.#db.prepare(`
            SELECT
                character.class as classId,
				count(character.class) as count,
                sum(standing = 0) as wins,
                sum(kills) as kills,
                sum(deaths) as deaths,
                sum(assists) as assists,
                sum(opponents_defeated) as opponentsDefeated,
                sum(weapon_kills_grenade) as grenadeKills,
                sum(weapon_kills_super) as superKills,
                sum(weapon_kills_melee) as meleeKills
            FROM
                character_activity_stats
            INNER JOIN
                character on 
                character_activity_stats.character = character.character_id
            WHERE
                activity in (
                    SELECT
                        activity.activity_id
                    FROM
                        character_activity_stats
                    INNER JOIN
                        activity ON character_activity_stats.activity = activity.activity_id,
                        character on character_activity_stats.character = character.character_id,
                        member on member.member_id = character.member
                    WHERE
                        member.member_id = @memberId AND
                        (character.class = @characterSelectionId OR @characterSelectionId = 4) AND
                        period > @startDate AND
                        period < @endDate AND
                        exists (select 1 from modes where activity = activity.activity_id and mode = @modeId) AND
                        not exists (select 1 from modes where activity = activity.activity_id and mode = @restrictModeId)
                )
                AND
                    fireteam_id not in (
                        SELECT
                            fireteam_id
                        FROM
                            character_activity_stats
                        INNER JOIN
                            activity ON character_activity_stats.activity = activity.activity_id,
                            character on character_activity_stats.character = character.character_id,
                            member on member.member_id = character.member
                        WHERE
                            member.member_id = @memberId AND
                            (character.class = @characterSelectionId OR @characterSelectionId = 4) AND
                            period > @startDate AND
                            period < @endDate AND
                            exists (select 1 from modes where activity = activity.activity_id and mode = @modeId) AND
                            not exists (select 1 from modes where activity = activity.activity_id and mode = @restrictModeId)
                ) 
            GROUP BY class
        `);

        this.#select_map_summary = this.#db.prepare(`
            SELECT
                activity.reference_id as referenceId,
                count(*) as activityCount,
                sum(time_played_seconds) as timePlayedSeconds,
                sum(standing = 0) as wins,
                sum( character_activity_stats.completion_reason = 4) as completionReasonMercy,
                sum( character_activity_stats.completion_reason = 0) as completionReasonObjectiveCompleted,
                sum( character_activity_stats.completion_reason = 1) as completionReasonTimeExpired,
                sum( character_activity_stats.completion_reason = 3) as completionReasonNoOpponents,
                sum(completed) as completed,
                sum(assists) as assists,
                sum(character_activity_stats.kills) as kills,
                sum(deaths) as deaths,
                sum(opponents_defeated) as opponentsDefeated,
                sum(weapon_kills_grenade) as grenadeKills,
                sum(weapon_kills_melee) as meleeKills,
                sum(weapon_kills_super) as superKills,
                sum(weapon_kills_ability) as abilityKills,
                sum(character_activity_stats.precision_kills) as precision,
                max(assists) as highestAssists,
                max(character_activity_stats.kills) as highestKills,
                max(deaths) as highestDeaths,
                max(opponents_defeated) as highestOpponentsDefeated,
                max(weapon_kills_grenade) as highestGrenadeKills,
                max(weapon_kills_melee) as highestMeleeKills,
                max(weapon_kills_super) as highestSuperKills,
                max(weapon_kills_ability) as highestAbilityKills,

                max(
                cast(character_activity_stats.kills as real) 
                / 
                cast(
                    IFNULL(
                        NULLIF(character_activity_stats.deaths, 0), 
                    1) as real
                ))
                as highestKillsDeathsRatio,
                max(
                    cast((character_activity_stats.kills + character_activity_stats.assists) as real) 
                    / 
                cast(
                    IFNULL(
                        NULLIF(character_activity_stats.deaths, 0), 
                    1) as real
                ))
                as highestEfficiency

            FROM
                character_activity_stats
            INNER JOIN
                activity ON character_activity_stats.activity = activity.activity_id,
                character on character_activity_stats.character = character.character_id,
                member on member.member_id = character.member
            WHERE
                member.member_id = @memberId AND
                (character.class = @characterSelectionId OR 4 = @characterSelectionId) AND
                period > @startDate AND
                period < @endDate AND
                exists (select 1 from modes where activity = activity.activity_id and mode = @modeId) AND
                not exists (select 1 from modes where activity = activity.activity_id and mode = @restrictModeId)
                group by activity.reference_id
            ORDER BY
                activityCount`);

        this.#select_weapons_summary = this.#db.prepare(`
            SELECT
                weapon_result.reference_id as id,
                count(*) as count,
                sum(weapon_result.precision_kills) as precision,
                sum(weapon_result.kills) as kills
            FROM
                character_activity_stats
            INNER JOIN
                weapon_result on character_activity_stats.id = weapon_result.character_activity_stats,
                activity ON character_activity_stats.activity = activity.activity_id,
                character on character_activity_stats.character = character.character_id,
                member on member.member_id = character.member
            WHERE
                member.member_id = @memberId AND
                (character.class = @characterSelectionId OR 4 = @characterSelectionId) AND
                period > @startDate AND
                period < @endDate AND
                exists (select 1 from modes where activity = activity.activity_id and mode = @modeId) AND
                not exists (select 1 from modes where activity = activity.activity_id and mode = @restrictModeId)
            GROUP BY
                weapon_result.reference_id
            ORDER BY
                count DESC`);

        this.#select_medals_summary = this.#db.prepare(`
            SELECT
                medal_result.reference_id as id,
                sum(count) as count
            FROM
                character_activity_stats
            INNER JOIN
                medal_result on character_activity_stats.id = medal_result.character_activity_stats,
                activity ON character_activity_stats.activity = activity.activity_id,
                character on character_activity_stats.character = character.character_id,
                member on member.member_id = character.member
            WHERE
                member.member_id = @memberId AND
                (character.class = @characterSelectionId OR 4 = @characterSelectionId) AND
                period > @startDate AND
                period < @endDate AND
                exists (select 1 from modes where activity = activity.activity_id and mode = @modeId) AND
                not exists (select 1 from modes where activity = activity.activity_id and mode = @restrictModeId) AND
                medal_result.reference_id NOT IN ('precisionKills', 'weaponKillsAbility', 'weaponKillsGrenade', 'weaponKillsMelee', 'weaponKillsSuper', 'allMedalsEarned')
            GROUP BY
                medal_result.reference_id
            ORDER BY
                count DESC`);

        this.#select_player_activity_summary = this.#db.prepare(`
            SELECT
                count(*) as activityCount,
                COALESCE(sum(time_played_seconds),0) as timePlayedSeconds,
                COALESCE(sum(character_activity_stats.standing = 0),0) as wins,
                COALESCE(sum( character_activity_stats.completion_reason = 4),0) as completionReasonMercy,
                COALESCE(sum(completed),0) as completed,
                COALESCE(sum(assists),0) as assists,
                COALESCE(sum(character_activity_stats.kills),0) as kills,
                COALESCE(sum(deaths),0) as deaths,
                COALESCE(sum(opponents_defeated),0) as opponentsDefeated,
                COALESCE(sum(weapon_kills_grenade),0) as grenadeKills,
                COALESCE(sum(weapon_kills_melee),0) as meleeKills,
                COALESCE(sum(weapon_kills_super),0) as superKills,
                COALESCE(sum(weapon_kills_ability),0) as abilityKills,
                COALESCE(sum(character_activity_stats.precision_kills),0) as precision,
                COALESCE(max(assists),0) as highestAssists,
                COALESCE(max(score),0) as highestScore,
                COALESCE(max(character_activity_stats.kills),0) as highestKills,
                COALESCE(max(deaths),0) as highestDeaths,
                COALESCE(max(opponents_defeated),0) as highestOpponentsDefeated,
                COALESCE(max(weapon_kills_grenade),0) as highestGrenadeKills,
                COALESCE(max(weapon_kills_melee),0) as highestMeleeKills,
                COALESCE(max(weapon_kills_super),0) as highestSuperKills,
                COALESCE(max(weapon_kills_ability),0) as highestAbilityKills,
                COALESCE(max(
                    cast(character_activity_stats.kills as real) 
                    / 
                    cast(
                        IFNULL(
                            NULLIF(character_activity_stats.deaths, 0), 
                        1) as real
                    )),0.0)
                as highestKillsDeathsRatio,
                COALESCE(max(
                    cast((character_activity_stats.kills + character_activity_stats.assists) as real) 
                    / 
                    cast(
                        IFNULL(
                            NULLIF(character_activity_stats.deaths, 0), 
                        1) as real
                    )),0.0)
                as highestEfficiency
            FROM
                character_activity_stats
            INNER JOIN
                activity ON character_activity_stats.activity = activity.activity_id,
                character on character_activity_stats.character = character.character_id,
                member on member.member_id = character.member
            WHERE
                member.member_id = @memberId AND
                (character.class = @characterSelectionId OR 4 = @characterSelectionId) AND
                period > @startDate AND
                period < @endDate AND
                exists (select 1 from modes where activity = activity.activity_id and mode = @modeId) AND
                not exists (select 1 from modes where activity = activity.activity_id and mode = @restrictModeId)`);
    }

    retrieveCharacterClassMetaSummary(
        memberId,
        characterSelection,
        mode,
        startDate,
        endDate
    ) {
        let restrictModeId = this.getRestrictModeId(mode);

        //todo: should this be get not all?
        let meta = this.#select_class_meta_summary.all({
            memberId,
            restrictModeId,
            characterSelectionId: characterSelection.id,
            startDate: startDate.toISOString(),
            endDate: endDate.toISOString(),
            modeId: mode.id,
        });

        return meta ? meta : [];
    }

    retrieveMetaWeaponsSummary(
        memberId,
        characterSelection,
        mode,
        startDate,
        endDate
    ) {
        let restrictModeId = this.getRestrictModeId(mode);

        //todo: should this be get not all?
        let meta = this.#select_meta_weapons_summary.all({
            memberId,
            restrictModeId,
            characterSelectionId: characterSelection.id,
            startDate: startDate.toISOString(),
            endDate: endDate.toISOString(),
            modeId: mode.id,
        });

        return meta ? meta : [];
    }

    retrieveMapsSummary(
        memberId,
        characterSelection,
        mode,
        startDate,
        endDate
    ) {
        let restrictModeId = this.getRestrictModeId(mode);

        let maps = this.#select_map_summary
            .all({
                memberId,
                restrictModeId,
                characterSelectionId: characterSelection.id,
                startDate: startDate.toISOString(),
                endDate: endDate.toISOString(),
                modeId: mode.id,
            })
            .map((m) => {
                let out = { referenceId: m.referenceId, summary: { ...m } };
                delete out.summary.referenceId;
                return out;
            });

        return maps ? maps : [];
    }

    retrieveMedalsSummary(
        memberId,
        characterSelection,
        mode,
        startDate,
        endDate
    ) {
        let restrictModeId = this.getRestrictModeId(mode);

        let medals = this.#select_medals_summary.all({
            memberId,
            restrictModeId,
            characterSelectionId: characterSelection.id,
            startDate: startDate.toISOString(),
            endDate: endDate.toISOString(),
            modeId: mode.id,
        });

        return medals ? medals : [];
    }

    retrieveWeaponsSummary(
        memberId,
        characterSelection,
        mode,
        startDate,
        endDate
    ) {
        let restrictModeId = this.getRestrictModeId(mode);

        let weapons = this.#select_weapons_summary.all({
            memberId,
            restrictModeId,
            characterSelectionId: characterSelection.id,
            startDate: startDate.toISOString(),
            endDate: endDate.toISOString(),
            modeId: mode.id,
        });

        return weapons ? weapons : [];
    }

    retrieveLastestActivityIdForMember(memberId) {
        const data = this.#select_latest_activity_id_for_member.get({
            memberId,
        });

        if (!data.activity_id) {
            return undefined;
        }

        return data.activity_id;
    }

    retrieveActivitySummary(
        memberId,
        characterSelection,
        mode,
        startDate,
        endDate
    ) {
        let restrictModeId = this.getRestrictModeId(mode);

        const summary = this.#select_player_activity_summary.get({
            memberId,
            restrictModeId,
            characterSelectionId: characterSelection.id,
            startDate: startDate.toISOString(),
            endDate: endDate.toISOString(),
            modeId: mode.id,
        });

        return summary ? summary : {};
    }

    retrieveActivities(
        memberId,
        characterSelection,
        mode,
        startDate,
        endDate,
        orderBy,
        limit = DEFAULT_ACTIVITIES_PAGE_LIMIT
    ) {
        let restrictModeId = this.getRestrictModeId(mode);

        if (!Number.isInteger(limit) || limit < 1) {
            limit = DEFAULT_ACTIVITIES_PAGE_LIMIT;
        }

        let orderByStr;
        switch (orderBy) {
            case OrderBy.PERIOD: {
                orderByStr = "activity.period DESC";
                break;
            }
            case OrderBy.PERIOD_REVERSE: {
                orderByStr = "activity.period";
                break;
            }
            case OrderBy.KILLS: {
                orderByStr = "character_activity_stats.kills DESC";
                break;
            }
            case OrderBy.ASSISTS: {
                orderByStr = "character_activity_stats.assists DESC";
                break;
            }
            case OrderBy.SCORE: {
                orderByStr = "character_activity_stats.score DESC";
                break;
            }
            case OrderBy.OPPONENTS_DEFEATED: {
                orderByStr = "character_activity_stats.opponents_defeated DESC";
                break;
            }
            case OrderBy.DEATHS: {
                orderByStr = "character_activity_stats.deaths DESC";
                break;
            }
            case OrderBy.PRECISION_KILLS: {
                orderByStr = "character_activity_stats.precision_kills DESC";
                break;
            }
            case OrderBy.GRENADE_KILLS: {
                orderByStr =
                    "character_activity_stats.weapon_kills_grenade DESC";
                break;
            }
            case OrderBy.MELEE_KILLS: {
                orderByStr = "character_activity_stats.weapon_kills_melee DESC";
                break;
            }
            case OrderBy.SUPER_KILLS: {
                orderByStr = "character_activity_stats.weapon_kills_super DESC";
                break;
            }
            case OrderBy.MEDALS_EARNED: {
                orderByStr = "character_activity_stats.all_medals_earned DESC";
                break;
            }
            default: {
                orderByStr = "activity.period DESC";
            }
        }

        //We can't pass in order by parameters for a precompiled query, so we
        //need to dynamically create the query here.
        let queryString = `
            SELECT
                activity.mode as activity_mode,
                CAST(activity.activity_id as TEXT) as activity_id,

                CAST(character.member as TEXT) as member_id,
                CAST(character_activity_stats.character as TEXT) as character_id,
                CAST(character_activity_stats.fireteam_id as TEXT) as fireteam_id,

                assists, score, kills, deaths, completed, opponents_defeated, activity_duration_seconds,
                standing, team, completion_reason, start_seconds, time_played_seconds, team_score,
                precision_kills, weapon_kills_grenade, weapon_kills_melee, weapon_kills_super,
                all_medals_earned, light_level, emblem_hash,

                activity.period as period, 
                activity.mode as mode,
                activity.platform as platform,
                activity.director_activity_hash as director_activity_hash,
                activity.reference_id as reference_id,
                character.class as class,
                
                member.bungie_display_name as bungie_display_name,
                member.bungie_display_name_code as bungie_display_name_code,
                member.platform_id as platform_id,
                character_activity_stats.id as character_activity_stats_index
            FROM
                character_activity_stats
            INNER JOIN
                activity ON character_activity_stats.activity = activity.activity_id,
                character on character_activity_stats.character = character.character_id,
                member on member.member_id = character.member
            WHERE
                member.member_id = @memberId AND
                (character.class = @characterSelectionId OR 4 = @characterSelectionId) AND
                period > @startMoment AND
                period < @endMoment AND
                exists (select 1 from modes where activity = activity.activity_id and mode = @modeId) AND
                not exists (select 1 from modes where activity = activity.activity_id and mode = @restrictModeId)
            ORDER BY
                ${orderByStr}
            LIMIT ${limit}`;

        //we compile to a prepared statement every time, since we need to dynamically generate
        //the query (see above). We could compile and cache for each order by, but the
        //prepare call is pretty much instant, and isnt really a performance issue
        let query = this.#db.prepare(queryString);

        const rows = query.all({
            memberId,
            restrictModeId,
            startMoment: startDate.toISOString(),
            endMoment: endDate.toISOString(),
            modeId: mode.id,
            characterSelectionId: characterSelection.id,
        });

        const activityIds = rows.map((row) => row.activity_id);

        const activityIdSQLList = activityIds.join(",");

        //Note : sqlite library doesn't allow us to bind arrays to prepared statements
        //we we have to dynamically construct them below

        //select all of the weapon results for the activity set we retrieved
        const ws = `
            SELECT
                weapon_result.reference_id as id,
                weapon_result.kills as kills,
                weapon_result.precision_kills as precision,
                weapon_result.character_activity_stats as character_activity_stats_index
            FROM
                weapon_result
            INNER JOIN
                character_activity_stats on character_activity_stats.id = weapon_result.character_activity_stats,
                activity ON character_activity_stats.activity = activity.activity_id,
                character on character_activity_stats.character = character.character_id,
                member on member.member_id = character.member
            WHERE
                member.member_id = '${memberId}' AND
                (character.class = ${characterSelection.id} OR 4 = ${characterSelection.id}) AND
                activity.activity_id IN (${activityIdSQLList})`;

        const weapons = this.#db.prepare(ws).all();

        //select all of the team data for the activity set we retrieved
        const t = `
            SELECT
                *
            FROM
                team_result
            WHERE
                activity IN (${activityIdSQLList})`;

        const teamRows = this.#db.prepare(t).all();

        const m = `
            SELECT
                medal_result.reference_id as id,
                count,
                character_activity_stats as character_activity_stats_index
            FROM
                medal_result
            INNER JOIN
                character_activity_stats on character_activity_stats.id = medal_result.character_activity_stats,
                character on character_activity_stats.character = character.character_id,
                member on member.member_id = character.member
            WHERE
                member.member_id = '${memberId}' AND
                (character.class = ${characterSelection.id} OR 4 = ${characterSelection.id}) AND
                character_activity_stats.activity IN (${activityIdSQLList})
            AND
                medal_result.reference_id NOT IN ('precisionKills',
                'weaponKillsAbility', 'weaponKillsGrenade', 'weaponKillsMelee',
                'weaponKillsSuper', 'allMedalsEarned')`;

        const medals = this.#db.prepare(m).all();

        let activities = [];
        for (let r of rows) {
            //find the first team that isn't our team to get the opponent score
            //note, for rumble this will return a random opponent score, but
            //property doesn't make sense in multi-team modes
            let tr = teamRows.find(
                (t) => r.activity_id === t.activity && t.team_id != r.team
            );

            r.opponentTeamScore = tr !== undefined ? tr.score : -1;

            let stats = this.parseCrucibleStats(r, weapons, medals);

            let player = this.parsePlayer(r);
            let activity = this.parseActivity(r);

            let details = {
                activity: activity,
                player: player,
                stats: stats,
            };

            activities.push(details);
        }

        return activities;
    }

    parseActivity(data) {
        return {
            period: data.period,
            activityId: data.activity_id,
            mode: data.activity_mode,
            platform: data.platform,
            directorActivityHash: data.director_activity_hash,
            referenceId: data.reference_id,
        };
    }

    retrieveActivity(activityId) {
        const row = this.#select_activity.get({ activityId: activityId });

        if (!row) {
            return;
        }

        let activity = this.parseActivity(row);

        let teamsMap = new Map();
        let teamRows = this.#select_teams.all({
            activityId: activity.activityId,
        });

        let hasTeams = true;
        if (teamRows && teamRows.length) {
            for (let t of teamRows) {
                teamsMap.set(t.team_id, {
                    id: t.team_id,
                    standing: t.standing,
                    score: t.score,
                    players: [],
                    name: "",
                });
            }
        } else {
            hasTeams = false;
            //Occurs for rumble
            teamsMap.set(NO_TEAMS_INDEX, {
                id: -1,
                standing: Standing.UNKNOWN.id,
                score: 0,
                players: [],
                name: "",
            });
        }

        let charStatsRows =
            this.#select_character_activity_stats_for_activity.all({
                activityId: activity.activityId,
            });

        const ws = `
            SELECT
                weapon_result.reference_id as id,
                weapon_result.kills as kills,
                weapon_result.precision_kills as precision,
                weapon_result.character_activity_stats as character_activity_stats_index
            FROM
                weapon_result
            INNER JOIN
                character_activity_stats on character_activity_stats.id = weapon_result.character_activity_stats,
                activity ON character_activity_stats.activity = activity.activity_id
            WHERE
                activity.activity_id = (${activity.activityId})`;

        const weapons = this.#db.prepare(ws).all();

        const m = `
            SELECT
                medal_result.reference_id as id,
                count,
                character_activity_stats as character_activity_stats_index
            FROM
                medal_result
            INNER JOIN
                character_activity_stats on character_activity_stats.id = medal_result.character_activity_stats,
                activity ON character_activity_stats.activity = activity.activity_id
            WHERE
                activity.activity_id = (${activity.activityId})
            AND
                medal_result.reference_id NOT IN ('precisionKills', 
                'weaponKillsAbility', 'weaponKillsGrenade', 'weaponKillsMelee', 
                'weaponKillsSuper', 'allMedalsEarned')`;

        const medals = this.#db.prepare(m).all();

        for (let cRow of charStatsRows) {
            //todo : need to pass in weapons and medals
            let stats = this.parseCrucibleStats(cRow, weapons, medals);
            let player = this.parsePlayer(cRow);

            let teamIndex = hasTeams ? stats.team : NO_TEAMS_INDEX;

            let t = teamsMap.get(teamIndex);

            if (!t) {
                console.log(`Invalid team id [${t}]. Skipping`);
                continue;
            }

            t.players.push({
                player: player,
                stats: stats,
            });
        }

        let teams = Array.from(teamsMap.values());

        return { activity: activity, teams: teams };
    }

    parseCharacter(data) {
        let emblem = {
            id: data.emblem_hash,
        };

        let character = {
            characterId: data.character_id,
            classType: data.class,
            lightLevel: data.light_level,
            emblem: emblem,
        };

        return character;
    }

    parsePlayer(data) {
        return {
            memberId: data.member_id,
            bungieDisplayName: data.bungie_display_name,
            bungieDisplayNameCode: data.bungie_display_name_code,
            platformId: data.platform_id,

            characters: [this.parseCharacter(data)],
        };
    }

    /* takes an activity row, and then the weapons and medals associated with that row */
    parseCrucibleStats(activityRow, weaponRows, medalRows) {
        let weapons = weaponRows
            .filter(
                (weapon) =>
                    weapon.character_activity_stats_index ===
                    activityRow.character_activity_stats_index
            )
            .map((w) => {
                //remove character_activity_stats_index property
                //https://dev.to/darksmile92/js-use-spread-to-exclude-properties-1km9
                const { character_activity_stats_index, ...out } = w;
                return out;
            });

        //get only medals for the character in the activity row
        let medals = medalRows
            .filter(
                (medal) =>
                    medal.character_activity_stats_index ===
                    activityRow.character_activity_stats_index
            )
            .map((m) => {
                const { character_activity_stats_index, ...out } = m;
                return out;
            });

        let extended = {
            precisionKills: activityRow.precision_kills,
            abilityKills: activityRow.weapon_kills_ability,
            grenadeKills: activityRow.weapon_kills_grenade,
            meleeKills: activityRow.weapon_kills_melee,
            superKills: activityRow.weapon_kills_super,
            totalMedals: activityRow.all_medals_earned,

            weapons: weapons,
            medals: medals,
        };

        //TODO: whether they completed the activity
        //todo: start_seconds (can use to figure out if they loaded in late.)
        const completed = activityRow.completed === 1;
        let stats = {
            assists: activityRow.assists,
            score: activityRow.score,
            kills: activityRow.kills,
            deaths: activityRow.deaths,
            completed: completed,
            opponentsDefeated: activityRow.opponents_defeated,
            activityDurationSeconds: activityRow.activity_duration_seconds,
            standing: activityRow.standing,
            completionReason: activityRow.completion_reason,
            startSeconds: activityRow.start_seconds,
            timePlayedSeconds: activityRow.time_played_seconds,
            //playerCount: activityRow.player_count,
            team: activityRow.team,
            teamScore: activityRow.team_score,
            opponentTeamScore: activityRow.opponentTeamScore,
            fireteamId: activityRow.fireteam_id,
            joinedLate: activityRow.start_seconds > PLAYER_START_BUFFER,
            extended: extended,
        };

        return stats;
    }

    retrieveSyncMembers() {
        let rows = this.#select_sync_members.all();

        let out = [];
        for (let row of rows) {
            let p = this.parsePlayer(row);
            out.push(p);
        }

        return out;
    }

    retrieveMember(memberId) {
        let row = this.#select_member.get({ memberId: memberId });

        let out = this.parsePlayer(row);

        return out;
    }

    getRestrictModeId(mode) {
        let restrictModeId = -1;

        if (mode.isPrivate()) {
            restrictModeId === Mode.PRIVATE_MATCHES_ALL.id;
        }

        return restrictModeId;
    }
}

module.exports = ActivityStoreInterface;
