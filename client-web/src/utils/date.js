export const dateIsToday = function (d) {
  let n = new Date();
  return (
    d.getFullYear() === n.getFullYear() &&
    d.getMonth() === n.getMonth() &&
    d.getDate() === n.getDate()
  );
};

export const dateIsWithinLastWeek = function (d) {
  let n = new Date();
  let diffMs = Math.abs(d.getTime() - n.getTime());
  const weekMs = 7 * 24 * 60 * 60 * 1000;
  return diffMs > weekMs;
};
