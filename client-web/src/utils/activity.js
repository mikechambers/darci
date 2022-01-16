const { CompletionReason, Standing } = require("shared");

const {
    calculateEfficiency, calculateKillsDeathsRatio, calculateKillsDeathsAssists } = require("shared");



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

