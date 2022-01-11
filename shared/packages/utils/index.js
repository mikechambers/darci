const calculateKillsDeathsRatio = function (kills, deaths) {
    return (deaths !== 0) ? kills / deaths : kills;
}

const calculateKillsDeathsAssists = function (kills, deaths, assists) {
    let t = kills + (assists / 2);
    return (deaths !== 0) ? t / deaths : t;
}

const calculateEfficiency = function (kills, deaths, assists) {
    return (deaths !== 0) ? (kills + assists) / deaths : 0;
}

module.exports = {
    calculateEfficiency,
    calculateKillsDeathsRatio,
    calculateKillsDeathsAssists
};