import React from "react";
import { humanDuration } from "../../../core/utils/date";

const TimePlayed = (props) => {
  let seconds = props.seconds;

  let out = "";
  if (seconds) {
    let human = humanDuration(seconds * 1000);
    return `Total time played is ${human}`;
  }

  return <div>{out}</div>;
};

export default TimePlayed;
