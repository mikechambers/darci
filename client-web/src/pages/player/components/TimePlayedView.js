import { Duration } from "luxon";

import React from "react";

const TimePlayedView = (props) => {
  let seconds = props.seconds;

  if (!seconds) {
    return "";
  }

  //var dur = Duration.fromMillis({ count: seconds * 1000 });
  var dur = Duration.fromMillis(seconds * 1000)
    .shiftTo("years", "months", "days", "hours", "minutes", "seconds")
    .toObject();

  let humanDurationParts = [];

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

  humanDurationParts.push(f(dur.years, "year"));
  humanDurationParts.push(f(dur.months, "month"));
  humanDurationParts.push(f(dur.days, "day"));
  humanDurationParts.push(f(dur.hours, "hour"));
  humanDurationParts.push(f(dur.minutes, "minute"));
  humanDurationParts.push(f(dur.seconds, "second"));

  humanDurationParts = humanDurationParts.filter((entry) => entry !== null);

  if (humanDurationParts.length > 1) {
    humanDurationParts[humanDurationParts.length - 2] = humanDurationParts
      .at(-2)
      .slice(0, -1);

    humanDurationParts.splice(humanDurationParts.length - 1, 0, "and");

    humanDurationParts[humanDurationParts.length - 1] = humanDurationParts
      .at(-1)
      .slice(0, -1);
  }

  let human = humanDurationParts.join(" ");

  return <div>Total time played is {human}</div>;
};

export default TimePlayedView;
