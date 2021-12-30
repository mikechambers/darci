const CharacterClassSelection = require("./CharacterClassSelection");
const Mode = require("./Mode");

class ActivityStoreInterface {

    #db;
    #select_sync_members;
    #select_activities_for_member_since;
    #select_member_by_name;
    #select_character_id;
    #select_activities_for_character_since;

    constructor(db) {
        this.db = db;
    }

    #initStatements() {
        this.select_member_by_name = db.prepare('SELECT member.member_id, member.platform_id, member.display_name, member.bungie_display_name, member.bungie_display_name_code from "sync" join member on member.id');

    }

    //TODO: add support for endDate
    retrieveActivitiesSince(memberId, characterSelection, mode, startDate) {

        if (this.select_activities_for_member_since === undefined) {
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
        }

        if (this.select_activities_for_character_since === undefined) {

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
        }


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
                endMoment: (new Date(Date.now())).toISOString(),
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

        return rows;
    }

    retrieveSyncMembers() {
        if (this.select_sync_members == undefined) {
            this.select_sync_members = this.db.prepare('SELECT "member_id", "platform_id", "display_name", "bungie_display_name", "bungie_display_name_code" from sync join member on sync.member = member.id');
        }

        return this.select_sync_members.all();
    }

}

module.exports = ActivityStoreInterface;