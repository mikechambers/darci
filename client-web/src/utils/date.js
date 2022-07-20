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

export const humanDuration = function (ms, short = false) {
  var dur = Duration.fromMillis(ms)
    .shiftTo("years", "months", "days", "hours", "minutes", "seconds")
    .toObject();

  let f = function (data, label) {
    if (!data) {
      return null;
    }

    let out = `${data} ${label}`;

    if (!short && data > 1) {
      out += "s";
    }

    out += ",";
    return out;
  };

  let humanDurationParts = [];
  humanDurationParts.push(f(dur.years, short ? "y" : "year"));
  humanDurationParts.push(f(dur.months, short ? "m" : "month"));
  humanDurationParts.push(f(dur.days, short ? "d" : "day"));
  humanDurationParts.push(f(dur.hours, short ? "h" : "hour"));
  humanDurationParts.push(f(dur.minutes, short ? "m" : "minute"));

  if (!short) {
    humanDurationParts.push(f(dur.seconds, "second"));
  }

  humanDurationParts = humanDurationParts.filter((entry) => entry !== null);

  if (humanDurationParts.length > 1) {
    //remove the comma before the and
    humanDurationParts[humanDurationParts.length - 2] = humanDurationParts
      .at(-2)
      .slice(0, -1);

    humanDurationParts.splice(humanDurationParts.length - 1, 0, "and");
  }

  if (humanDurationParts.length) {
    humanDurationParts[humanDurationParts.length - 1] = humanDurationParts
      .at(-1)
      .slice(0, -1);
  }

  return humanDurationParts.join(" ");
};
