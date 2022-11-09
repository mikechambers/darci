import { MOMENT_TYPE } from "../consts";

export const calculateAverage = (value, total) => {
  if (!total) {
    return 0;
  }

  return value / total;
};

export const calculatePercent = (value, total) => {
  if (!total) {
    return 0;
  }

  return (value / total) * 100.0;
};

/***
{
  player,
    characterClass,
    mode,
    momentType,
    startMoment,
    endMoment,
    season,
    orderBy;
}
*/
export const createPlayerUrl = function (opts) {
  let seasonStartMomentString =
    opts.momentType === MOMENT_TYPE ? opts.startMoment.type : opts.season.type;

  let lastArgStr =
    opts.momentType === MOMENT_TYPE && opts.endMoment
      ? `${opts.endMoment.type}/`
      : "";

  let orderByStr = opts.orderBy ? `&orderby=${opts.orderBy.id}` : "";

  let ts = new Date().getTime();

  //this is a little messy
  let url = `/player/${opts.player.memberId}/${opts.player.platformId}/${opts.characterClass.type}/${opts.mode.type}/${opts.momentType}/${seasonStartMomentString}/${lastArgStr}?fr=${ts}${orderByStr}`;

  return url;
};
