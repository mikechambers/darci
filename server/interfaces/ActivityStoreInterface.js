const Database = require("better-sqlite3");

const NO_TEAMS_INDEX = 253;
const { PLAYER_START_BUFFER, DB_SCHEMA_VERSION } = require("../config");

const {
  CharacterClassSelection,
  Mode,
  Standing,
  CompletionReason,
  calculateEfficiency,
  calculateKillsDeathsAssists,
  calculateKillsDeathsRatio,
} = require("shared");

class ActivityStoreInterface {
  #db;
  #dbPath;
  #select_sync_members;
  #select_activities_for_member_since;
  #select_activities_for_character_since;
  #select_weapon_stats;
  #select_medals;
  #select_member;
  #select_activity;
  #select_teams;
  #select_character_activity_stats_for_activity;
  #select_version;
  #select_weapon_meta_for_activity;

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
        `DB Scheme Version mismatch. Expected [${DB_SCHEMA_VERSION}] found [${row.version}]`
      );
    }
  }

  #initStatements() {
    this.#select_activities_for_member_since = this.#db.prepare(
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
                activity.period DESC`
    );

    this.#select_activities_for_character_since = this.#db.prepare(
      `SELECT
                    *,
                    activity.mode as activity_mode,
                    activity.id as activity_row_id,
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
                    activity.period DESC`
    );

    this.#select_sync_members = this.#db.prepare(
      'SELECT "member_id", "platform_id", "display_name", "bungie_display_name", "bungie_display_name_code" from sync join member on sync.member = member.id'
    );

    this.#select_weapon_stats = this.#db.prepare(`
            SELECT
                *
            FROM
                weapon_result
            WHERE character_activity_stats = @characterActivityStatsRowIndex
        `);

    this.#select_medals = this.#db.prepare(`
            SELECT
                *
            FROM
                medal_result
            WHERE
                character_activity_stats = @characterActivityStatsRowIndex
        `);

    this.#select_member = this.#db.prepare(
      `select * from member where member_id = @memberId`
    );

    this.#select_weapon_meta_for_activity = this.#db.prepare(
      `SELECT
        *
        FROM
            weapon_result
        WHERE character_activity_stats
        IN 
            (select id from character_activity_stats 
                where activity = @activityId and fireteam_id != @fireteamId)`
    );

    this.#select_activity = this.#db.prepare(`
            SELECT
                activity.id as activity_row_id,
                activity.activity_id,
                activity.period,
                activity.mode as activity_mode,
                activity.director_activity_hash,
                activity.reference_id,
                activity.platform
            FROM
                activity
            INNER JOIN
                character_activity_stats on character_activity_stats.activity = activity.id,
                character on character_activity_stats.character = character.id,
                member on character.member = member.id
            WHERE
                activity.activity_id = @activityId
            ORDER BY
                period DESC LIMIT 1
        `);

    this.#select_teams = this.#db.prepare(`
            SELECT
                *
            FROM
                team_result
            WHERE
                activity = @activityRowId
        `);

    this.#select_character_activity_stats_for_activity = this.#db.prepare(`
            SELECT
                *,
                character_activity_stats.id as character_activity_stats_index
            FROM
                character_activity_stats
            INNER JOIN
                character on character_activity_stats.character = character.id,
                member on character.member = member.id
            WHERE
                activity = @activityRowId
        `);

    this.#select_version = this.#db.prepare(`
        SELECT version from version
    `);
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
      rows = this.#select_activities_for_member_since.all({
        memberId: memberId,
        startMoment: startDate.toISOString(),
        endMoment: endDate.toISOString(),
        modeId: mode.id,
        restrictModeId: restrictMode,
      });
    } else {
      //TODO: not this could technically be unknown, but it should be
      //validated before being sent in here
      let characterClass = characterSelection.getCharacterClass();

      rows = this.#select_activities_for_character_since.all({
        memberId: memberId,
        startMoment: startDate.toISOString(),
        endMoment: new Date(Date.now()).toISOString(),
        modeId: mode.id,
        restrictModeId: restrictMode,
        characterClassId: characterClass.id,
      });
    }

    let activities = [];

    //begin parsing weapon meta data for activity set
    let weaponMap = new Map();
    for (let r of rows) {
      let weaponRows = this.#select_weapon_meta_for_activity.all({
        activityId: r.activity,
        fireteamId: r.fireteam_id,
      });

      for (let wRow of weaponRows) {
        let id = wRow.reference_id;
        let kills = wRow.kills;
        let precision = wRow.precision_kills;

        let item = weaponMap.get(id);

        if (!item) {
          item = {
            id: id,
            count: 1,
            kills: kills,
            precision: precision,
          };
        } else {
          item = {
            ...item,
            count: item.count + 1,
            kills: item.kills + kills,
            precision: item.precision + precision,
          };
        }

        weaponMap.set(id, item);
      }

      let stats = this.parseCrucibleStats(r);
      let player = this.parsePlayer(r);
      let activity = this.parseActivity(r);

      let details = {
        activity: activity,
        player: player,
        stats: stats,
      };

      activities.push(details);
    }

    return {
      activities: activities,
      meta: mapElementsToArray(weaponMap),
    };
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

    let activity = this.parseActivity(row);

    let activityRowId = row.activity_row_id;

    //TODO: We dont appear to be using this
    let mode = Mode.fromId(row.activity_mode);

    let teamsMap = new Map();

    let teamRows = this.#select_teams.all({ activityRowId: activityRowId });

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

    let charStatsRows = this.#select_character_activity_stats_for_activity.all({
      activityRowId: row.activity_row_id,
    });

    for (let cRow of charStatsRows) {
      let stats = this.parseCrucibleStats(cRow);
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

    let teams = mapElementsToArray(teamsMap);

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
      displayName: data.display_name,
      platformId: data.platform_id,

      characters: [this.parseCharacter(data)],
    };
  }

  parseCrucibleStats(activityRow) {
    let weapons = this.retrieveWeapons(
      activityRow.character_activity_stats_index
    );
    let medals = this.retrieveMedals(
      activityRow.character_activity_stats_index
    );

    let extended = {
      precisionKills: activityRow.precision_kills,
      abilityKills: activityRow.weapon_kills_ability,
      grenadeKills: activityRow.weapon_kills_grenade,
      meleeKills: activityRow.weapon_kills_melee,
      superKills: activityRow.weapon_kills_super,
      //all_medals_earned: activityRow.all_medals_earned,

      weapons: weapons,
      medals: medals,
    };

    const completed = activityRow.completed === 1;
    let stats = {
      assists: activityRow.assists,
      score: activityRow.score,
      kills: activityRow.kills,
      deaths: activityRow.deaths,
      //averageScorePerKill: activityRow.average_score_per_kill,
      //averageScorePerLife: activityRow.average_score_per_life,
      completed: completed,
      //opponentsDefeated: activityRow.opponents_defeated,

      //todo:could calculate this client side
      //efficiency: calculateEfficiency(activityRow.kills, activityRow.deaths, activityRow.assists),
      //killsDeathsRatio: calculateKillsDeathsRatio(activityRow.kills, activityRow.deaths),
      //killsDeathsAssists: calculateKillsDeathsAssists(
      //    activityRow.kills, activityRow.deaths, activityRow.assists,
      //),
      activityDurationSeconds: activityRow.activity_duration_seconds,
      standing: activityRow.standing,
      team: activityRow.team,
      completionReason: activityRow.completion_reason,
      startSeconds: activityRow.start_seconds,
      timePlayedSeconds: activityRow.time_played_seconds,
      playerCount: activityRow.player_count,
      teamScore: activityRow.team_score,
      fireteamId: activityRow.fireteam_id,
      leftEarly: !completed,
      joinedLate: activityRow.start_seconds > PLAYER_START_BUFFER,
      extended: extended,
    };

    return stats;
  }

  summarizeActivities(activities) {
    const out = {
      activityCount: 0,
      timePlayedSeconds: 0,

      wins: 0,
      losses: 0,
      draws: 0,
      mercies: 0,

      assists: 0,
      kills: 0,
      deaths: 0,
      opponentsDefeated: 0,
      efficiency: 0.0,
      killsDeathsRatio: 0.0,
      killsDeathsAssists: 0.0,
      grenadeKills: 0,
      meleeKills: 0,
      superKills: 0,

      highestAssists: 0,
      highestKills: 0,
      highestDeaths: 0,
      highestOpponentsDefeated: 0,
      highestEfficiency: 0.0,
      highestKillsDeathsRatio: 0.0,
      highestKillsDeathsAssists: 0.0,
      highestGrenadeKills: 0,
      highestMeleeKills: 0,
      highestSuperKills: 0,
    };

    out.activityCount = activities.length;

    let medalMap = new Map();
    let weaponMap = new Map();
    for (let activity of activities) {
      if (activity.stats.assists > out.highestAssists) {
        out.highestAssists = activity.stats.assists;
      }
      if (activity.stats.kills > out.highestKills) {
        out.highestKills = activity.stats.kills;
      }
      if (activity.stats.deaths > out.highestDeaths) {
        out.highestDeaths = activity.stats.deaths;
      }

      if (activity.stats.opponentsDefeated > out.highestOpponentsDefeated) {
        out.highestOpponentsDefeated = activity.stats.opponentsDefeated;
      }

      if (activity.stats.efficiency > out.highestEfficiency) {
        out.highestEfficiency = activity.stats.efficiency;
      }
      if (activity.stats.killsDeathsRatio > out.highestKillsDeathsRatio) {
        out.highestKillsDeathsRatio = activity.stats.killsDeathsRatio;
      }
      if (activity.stats.killsDeathsAssists > out.highestKillsDeathsAssists) {
        out.highestKillsDeathsAssists = activity.stats.killsDeathsAssists;
      }

      if (activity.stats.extended.grenadeKills > out.highestGrenadeKills) {
        out.highestGrenadeKills = activity.stats.extended.grenadeKills;
      }
      if (activity.stats.extended.meleeKills > out.highestMeleeKills) {
        out.highestMeleeKills = activity.stats.extended.meleeKills;
      }
      if (activity.stats.extended.superKills > out.highestSuperKills) {
        out.highestSuperKills = activity.stats.extended.superKills;
      }

      out.grenadeKills += activity.stats.extended.grenadeKills;
      out.superKills += activity.stats.extended.superKills;
      out.meleeKills += activity.stats.extended.meleeKills;

      out.assists += activity.stats.assists;
      out.kills += activity.stats.kills;
      out.deaths += activity.stats.deaths;
      //out.opponentsDefeated += activity.stats.opponentsDefeated;

      out.timePlayedSeconds += activity.stats.timePlayedSeconds;

      let mode = Mode.fromId(activity.mode);
      let standing = Standing.fromIdAndMode(activity.stats.standing, mode);
      switch (standing) {
        case Standing.VICTORY:
          out.wins++;
          break;
        case Standing.DEFEAT:
          out.losses++;
          break;
        case Standing.UNKNOWN:
          out.draws++;
          break;
      }

      let completionReason = CompletionReason.fromId(
        activity.stats.completionReason
      );

      if (completionReason == CompletionReason.MERCY) {
        out.mercies++;
      }

      for (const medal of activity.stats.extended.medals) {
        let item = medalMap.get(medal.id);

        if (!item) {
          item = {
            ...medal,
          };
        } else {
          item.count += medal.count;
        }
        medalMap.set(medal.id, item);
      }

      for (const weapon of activity.stats.extended.weapons) {
        let item = weaponMap.get(weapon.id);

        const k = activity.stats.kills;
        const d = activity.stats.deaths;
        const a = activity.stats.assists;
        if (!item) {
          item = {
            ...weapon,
            activityCount: 1,
            totalGameKills: k,
            totalGameDeaths: d,
            totalGameAssists: a,
          };
        } else {
          item.activityCount++;
          item.kills += weapon.kills;
          item.precisionKills += weapon.precisionKills;

          item.totalGameKills += k;
          item.totalGameDeaths += d;
          item.totalGameAssists += a;
        }

        weaponMap.set(weapon.id, item);
      }
    }

    let medalArr = mapElementsToArray(medalMap);
    let weaponArr = mapElementsToArray(weaponMap);

    /*
        out.efficiency = calculateEfficiency(
            out.kills, out.deaths, out.assists);
        out.killsDeathsRatio = calculateKillsDeathsRatio(out.kills, out.deaths);
        out.killsDeathsAssists = calculateKillsDeathsAssists(
            out.kills, out.deaths, out.assists);
*/
    out.medals = medalArr;
    out.weapons = weaponArr;
    return out;
  }

  retrieveMedals(characterActivityStatsRowIndex) {
    let rows = this.#select_medals.all({
      characterActivityStatsRowIndex: characterActivityStatsRowIndex,
    });

    let medals = [];

    for (let r of rows) {
      let id = r.reference_id;

      if (
        id === "precisionKills" ||
        id === "weaponKillsAbility" ||
        id === "weaponKillsGrenade" ||
        id === "weaponKillsMelee" ||
        id === "weaponKillsSuper" ||
        id === "allMedalsEarned"
      ) {
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
    let rows = this.#select_weapon_stats.all({
      characterActivityStatsRowIndex: characterActivityStatsRowIndex,
    });

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
}

const mapElementsToArray = (map) => {
  let out = [];
  map.forEach((val, key) => {
    out.push(val);
  });

  return out;
};

module.exports = ActivityStoreInterface;
