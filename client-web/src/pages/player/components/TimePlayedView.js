import React from "react";
import { humandDuration } from "../../../utils/date";

const TimePlayedView = (props) => {
  let seconds = props.seconds;

  if (!seconds) {
    return "";
  }

  let human = humandDuration(seconds * 1000);

  return <div>Total time played is {human}</div>;
};

export default TimePlayedView;
