import { CharacterClassSelection } from "shared";
import { dateIsToday, dateIsWithinLastWeek } from "../../../utils/date";
import React from "react";
import { DateTime } from "luxon";

const formatCharacterClass = function (classSelection) {
  let out = classSelection.label;

  if (classSelection === CharacterClassSelection.ALL) {
    out = "all classes";
  }

  return out;
};

const getFormatStr = function (d) {
  let out = "cccc 'at' t";
  if (dateIsToday(d)) {
    out = "'Today at' t";
  } else if (dateIsWithinLastWeek(d)) {
    out = "DDD";
  }

  return out;
};

const elementStyle = {
  height: "180px",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  justifyContent: "center",
  //maxWidth: "720px",
};

const PlayerActivitiesOverview = (props) => {
  const player = props.player;
  const mode = props.mode;
  const moment = props.moment;
  let classSelection = props.classSelection;

  let playerName = player.bungieDisplayName;
  let playerNameCode = player.bungieDisplayNameCode;

  let momentDate = moment.getDate();
  let f = getFormatStr(momentDate);
  let dt = DateTime.fromJSDate(momentDate);
  let humanMoment = dt.toFormat(f);

  return (
    <div style={elementStyle}>
      <div className="page_alert">
        <span>{playerName}</span>
        <span className="bungie_name_code">#{playerNameCode}</span>{" "}
      </div>

      <hr className="title" />

      <div>
        {mode.label} stats for {formatCharacterClass(classSelection)} since{" "}
        {moment.label} ({humanMoment})
      </div>
    </div>
  );
};

export default PlayerActivitiesOverview;
