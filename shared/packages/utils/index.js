const calculateKillsDeathsRatio = function (kills, deaths) {
  return calculateRatio(kills, deaths);
};

const calculateKillsDeathsAssists = function (kills, deaths, assists) {
  let t = kills + assists / 2;
  return deaths !== 0 ? t / deaths : t;
};

const calculateEfficiency = function (kills, deaths, assists) {
  let t = kills + assists;
  return deaths !== 0 ? t / deaths : t;
};

const calculateRatio = function (n, d) {
  return d !== 0 ? n / d : n;
};

module.exports = {
  calculateEfficiency,
  calculateKillsDeathsRatio,
  calculateKillsDeathsAssists,
  calculateRatio,
};
