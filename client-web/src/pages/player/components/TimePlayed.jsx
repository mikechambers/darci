import React from "react";
import { humandDuration } from "../../../utils/date";

const TimePlayed = (props) => {
  let seconds = props.seconds;


  let out = "";
  if (seconds) {
    let human = humandDuration(seconds * 1000);
    return `Total time played is ${human}`;
  }

  return <div>{out}</div>;
};

export default TimePlayed;
