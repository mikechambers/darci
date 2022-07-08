import { Mode, Moment as Mom } from "shared";
import Moment from "react-moment";
import { dateIsToday, dateIsWithinLastWeek } from "../../../utils/date";
import React from "react";

const format = function (d) {
  let out = "dddd [at] LT";
  if (dateIsToday(d)) {
    out = "[Today at] LT";
  } else if (dateIsWithinLastWeek(d)) {
    out = "LL";
  }

  return out;
};

const PlayerActivitiesHeader = (props) => {
  let playerName = props.playerName;
  let playerNameCode = props.playerNameCode;
  let classSelection = props.classSelection;
  let mode = Mode.fromString(props.modeName);
  let moment = Mom.fromString(props.momentName);
  let momentDate = new Date(props.momentDate);

  return (
    <div className="player_view_header">
      <div>
        <span>{playerName}</span>#<span>{playerNameCode}</span>{" "}
      </div>
      <div>
        &#47;&#47;&nbsp;<span>{classSelection}</span>&nbsp;&#47;&nbsp;
        <span>{mode.label}</span>&nbsp;&#47;&nbsp;
        <span>{moment.label}</span>
        &nbsp;(<Moment format={format(momentDate)}>{momentDate}</Moment>)
      </div>
    </div>
  );
};

export default PlayerActivitiesHeader;
