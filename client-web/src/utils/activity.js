const { CompletionReason, Standing, CharacterClass } = require("shared");

const {
    calculateEfficiency, calculateKillsDeathsRatio, calculateKillsDeathsAssists } = require("shared");

export const parseCharacter = (data, manifest) => {

    let emblem = {
        id: data.emblemHash,
    };

    if (manifest) {
        emblem = manifest.getEmblem(data.emblemHash);
    }

    let character = {
        characterId: data.characterId,
        classType: CharacterClass.fromId(data.classType),
        lightLevel: data.light,
        emblem: emblem,
        dateLastPlayed: new Date(Date.parse(data.dateLastPlayed)),
    };

    return character;
}

export const parsePlayer = (data, manifest) => {
    return {
        memberId: data.member_id,
        bungieDisplayName: data.bungie_display_name,
        bungieDisplayNameCode: data.bungie_display_name_code,
        displayName: data.display_name,
        platformId: data.platform_id,

        character: this.parseCharacter(data, manifest),
    };
}

//note this modifies the passed in reference (to save memory / cpu)
export const calculateStats = (stats, mode) => {

    let standing = Standing.fromIdAndMode(stats.standing, mode);
    stats.standing = standing;

    let completionReason = CompletionReason.fromId(stats.completionReason);
    stats.completionReason = completionReason;

    let kills = stats.kills;
    let assists = stats.assists;
    let deaths = stats.deaths;

    stats.opponentsDefeated = kills + assists;

    stats.efficiency = calculateEfficiency(kills, deaths, assists);
    stats.killsDeathsRatio = calculateKillsDeathsRatio(kills, deaths);
    stats.killsDeathsAssists = calculateKillsDeathsAssists(
        kills, deaths, assists,
    );

    return stats;
}

