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
  #select_member;
  #select_activity;
  #select_teams;
  #select_character_activity_stats_for_activity;
  #select_version;

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
                activity.activity_id as activity_id,
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
                    activity.activity_id as activity_id,
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

    this.#select_member = this.#db.prepare(
      `select * from member where member_id = @memberId`
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

  retrieveActivitySummary(
    memberId,
    characterSelection,
    mode,
    startDate,
    endDate
  ) {
    let restrictMode = -1;
    if (mode.isPrivate()) {
      restrictMode === Mode.PRIVATE_MATCHES_ALL.id;
    }

    //TODO: move this to prepared statement
    //TODO: add character specicfic
    let sql = `SELECT
      count(*) as activityCount,
      sum(time_played_seconds) as timePlayedSeconds,
      sum((select standing where standing = 1)) as wins,
      sum( character_activity_stats.completion_reason = 4) as mercies,
      sum(completed) as completed,
      sum(assists) as assists,
      sum(character_activity_stats.kills) as kills,
      sum(deaths) as deaths,
      sum(opponents_defeated) as opponentsDefeated,
      sum(weapon_kills_grenade) as grenadeKills,
      sum(weapon_kills_melee) as meleeKills,
      sum(weapon_kills_super) as superKills,
      sum(weapon_kills_ability) as abilityKills,
      sum(character_activity_stats.precision_kills) as precisionKills,
      max(assists) as highestAssists,
      max(character_activity_stats.kills) as highestKills,
      max(deaths) as highestDeaths,
      max(opponents_defeated) as highestOpponentsDefeated,
      max(weapon_kills_grenade) as highestGrenadeKills,
      max(weapon_kills_melee) as highestMeleeKills,
      max(weapon_kills_super) as highestSuperKills,
      max(weapon_kills_ability) as highestAbilityKills,
      max(cast(character_activity_stats.kills as real) / cast(deaths as real)) as highestKillsDeathsRatio,
      max(cast(character_activity_stats.kills + assists as real)   / cast(deaths as real)) as highestEfficiency,
      sum(weapon_result.kills) as weaponKills
      FROM
      character_activity_stats
      INNER JOIN
      weapon_result on character_activity_stats.id = weapon_result.character_activity_stats,
      activity ON character_activity_stats.activity = activity.id,
      character on character_activity_stats.character = character.id,
      member on member.id = character.member
      WHERE
      member.id = (select id from member where member_id = '${memberId}') AND
      period > '${startDate.toISOString()}' AND
      period < '${endDate.toISOString()}' AND
      exists (select 1 from modes where activity = activity.id and mode = ${
        mode.id
      }) AND
      not exists (select 1 from modes where activity = activity.id and mode = ${restrictMode})`;
    console.log(sql);
    const summary = this.#db.prepare(sql).all();
    return summary && summary.length ? summary[0] : {};
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

    let activityIds = rows.map((row) => row.activity_id);

    //Note : sqlite library doesnt allow us to bind arrays to prepared statements
    //we we have to dynamically construct them below

    //select all of the weapon results for the activity set we retrieved
    const ws = `SELECT
          weapon_result.reference_id,
          weapon_result.kills,
          weapon_result.precision_kills,
          weapon_result.character_activity_stats,
          character_activity_stats.fireteam_id as fireteam_id,
          activity.activity_id
      FROM
          weapon_result
      INNER JOIN
          character_activity_stats on character_activity_stats.id = weapon_result.character_activity_stats,
          activity ON character_activity_stats.activity = activity.id
      WHERE
          activity.activity_id IN (${activityIds.join(",")})`;

    const weapons = this.#db.prepare(ws).all();

    let activityRowIds = rows.map((row) => row.activity_index_id);

    //select all of the team data for the activity set we retrieved
    const t = `SELECT
        *
    FROM
        team_result
    WHERE
        activity IN (${activityRowIds.join(",")})`;

    const teamRows = this.#db.prepare(t).all();

    //we query below by character_activity_stat ids and not activity ids
    //because its about twice as fast
    let characterActivityIds = rows.map(
      (row) => row.character_activity_stats_index
    );
    const m = `
      SELECT
        medal_result.reference_id,
        count,
        character_activity_stats as character_activity_stats_index
      FROM
          medal_result
      INNER JOIN
          character_activity_stats on character_activity_stats.id = medal_result.character_activity_stats
      WHERE
          character_activity_stats IN (${characterActivityIds.join(",")})
      AND
          medal_result.reference_id NOT IN ('precisionKills', 'weaponKillsAbility', 'weaponKillsGrenade', 'weaponKillsMelee', 'weaponKillsSuper', 'allMedalsEarned')`;

    const medals = this.#db.prepare(m).all();

    //begin parsing weapon meta data for activity set
    let weaponMap = new Map();
    for (let r of rows) {
      //For Private matches, everyone is in the same fireteam
      //so we included all fireteam members here.
      let fireteamId = mode.isPrivate() ? -1 : r.fireteam_id;

      let weaponRows = weapons.filter(
        (weapon) =>
          weapon.activity_id === r.activity_id &&
          weapon.fireteam_id !== fireteamId
      );

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
            precisionKills: precision,
          };
        } else {
          item = {
            ...item,
            count: item.count + 1,
            kills: item.kills + kills,
            precisionKills: item.precisionKills + precision,
          };
        }

        weaponMap.set(id, item);
      }

      //find the first team that isnt our team to get the opponent score
      //note, for rumble this will return a random opponent score, but
      //property doesnt make sense in multi-team modes
      let tr = teamRows.find(
        (t) => r.activity_index_id === t.activity && t.team_id != r.team
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
      //todo : need to pass in weapons and medals
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

  /* takes an activity row, and then the weapons and medals associated with that row */
  parseCrucibleStats(activityRow, weaponsRows, medalRows) {
    //get only the weapons for the character in the activityRow
    let weapons = weaponsRows.filter(
      (weapon) =>
        weapon.character_activity_stats ===
        activityRow.character_activity_stats_index
    );

    //reformat into output we need
    weapons = weapons.map((w) => {
      return {
        kills: w.kills,
        precisionKills: w.precision_kills,
        id: w.reference_id,
      };
    });

    //NOTE medal rows doesnt contain medals for all players in specified activity
    //only for the character we care about. This is a performance optimization, and is
    //about twice as fast as selecting for all players for all activities
    //here is the query for all players
    //https://gist.github.com/mikechambers/0c5abd11529d22082f9027e997b64f45

    //get only medals for the character in the activity row
    let medals = medalRows.filter(
      (medal) =>
        medal.character_activity_stats_index ===
        activityRow.character_activity_stats_index
    );

    //reformat
    medals = medals.map((m) => {
      return {
        id: m.reference_id,
        count: m.count,
      };
    });

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

      efficiency: calculateEfficiency(
        activityRow.kills,
        activityRow.deaths,
        activityRow.assists
      ),
      killsDeathsRatio: calculateKillsDeathsRatio(
        activityRow.kills,
        activityRow.deaths
      ),
      killsDeathsAssists: calculateKillsDeathsAssists(
        activityRow.kills,
        activityRow.deaths,
        activityRow.assists
      ),
      activityDurationSeconds: activityRow.activity_duration_seconds,
      standing: activityRow.standing,
      completionReason: activityRow.completion_reason,
      startSeconds: activityRow.start_seconds,
      timePlayedSeconds: activityRow.time_played_seconds,
      playerCount: activityRow.player_count,
      team: activityRow.team,
      teamScore: activityRow.team_score,
      opponentTeamScore: activityRow.opponentTeamScore,
      fireteamId: activityRow.fireteam_id,
      joinedLate: activityRow.start_seconds > PLAYER_START_BUFFER,
      extended: extended,
    };

    return stats;
  }

  summarizeMaps(activities) {
    let map = new Map();

    for (let a of activities) {
      let id = a.activity.referenceId;
      let m = map.get(id);

      if (!m) {
        m = [];
      }

      m.push(a);
      map.set(id, m);
    }

    let out = new Map();

    for (const [key, value] of map) {
      let data = this.summarizeActivities(value);
      out.set(key, { referenceId: key, summary: data });
    }

    //todo: we dont really need to return weapon / medal data here
    return mapElementsToArray(out);
  }

  summarizeActivities(activities) {
    const out = {
      activityCount: 0,
      timePlayedSeconds: 0,

      wins: 0,
      losses: 0,
      draws: 0,
      mercies: 0,
      completed: 0,

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
      abilityKills: 0,

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
      highestAbilityKills: 0,
      weaponKills: 0,
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

      if (activity.stats.extended.abilityKills > out.highestAbilityKills) {
        out.highestAbilityKills = activity.stats.extended.abilityKills;
      }

      if (activity.stats.completed) {
        out.completed++;
      }

      out.grenadeKills += activity.stats.extended.grenadeKills;
      out.superKills += activity.stats.extended.superKills;
      out.meleeKills += activity.stats.extended.meleeKills;
      out.abilityKills += activity.stats.extended.abilityKills;

      out.assists += activity.stats.assists;
      out.kills += activity.stats.kills;
      out.deaths += activity.stats.deaths;
      out.opponentsDefeated += activity.stats.opponentsDefeated;

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

      out.efficiency = calculateEfficiency(out.kills, out.deaths, out.assists);

      out.killsDeathsRatio = calculateKillsDeathsRatio(out.kills, out.deaths);

      out.killsDeathsAssists = calculateKillsDeathsAssists(
        out.kills,
        out.deaths,
        out.assists
      );

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

        if (!item) {
          item = {
            ...weapon,
            activityCount: 1,
          };
        } else {
          item.activityCount++;
          item.kills += weapon.kills;
          item.precisionKills += weapon.precisionKills;
        }

        out.weaponKills += weapon.kills;

        weaponMap.set(weapon.id, item);
      }
    }

    let medalArr = mapElementsToArray(medalMap);
    let weaponArr = mapElementsToArray(weaponMap);

    out.medals = medalArr;
    out.weapons = weaponArr;
    return out;
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
