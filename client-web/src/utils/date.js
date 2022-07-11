import { Duration } from "luxon";

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

export const humandDuration = function (ms) {
  var dur = Duration.fromMillis(ms)
    .shiftTo("years", "months", "days", "hours", "minutes", "seconds")
    .toObject();

  let f = function (data, label) {
    if (!data) {
      return null;
    }

    let out = `${data} ${label}`;

    if (data > 1) {
      out += "s";
    }

    out += ",";
    return out;
  };

  let humanDurationParts = [];
  humanDurationParts.push(f(dur.years, "year"));
  humanDurationParts.push(f(dur.months, "month"));
  humanDurationParts.push(f(dur.days, "day"));
  humanDurationParts.push(f(dur.hours, "hour"));
  humanDurationParts.push(f(dur.minutes, "minute"));
  humanDurationParts.push(f(dur.seconds, "second"));

  humanDurationParts = humanDurationParts.filter((entry) => entry !== null);

  if (humanDurationParts.length > 1) {
    //remove the comma before the and
    humanDurationParts[humanDurationParts.length - 2] = humanDurationParts
      .at(-2)
      .slice(0, -1);

    humanDurationParts.splice(humanDurationParts.length - 1, 0, "and");

    humanDurationParts[humanDurationParts.length - 1] = humanDurationParts
      .at(-1)
      .slice(0, -1);
  }

  return humanDurationParts.join(" ");
};
