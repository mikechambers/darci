import { CharacterClassSelection, Moment } from "shared";
import { dateIsToday, dateIsWithinLastWeek } from "../../../core/utils/date";
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
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  justifyContent: "center",
  //maxWidth: "720px",
};

const PlayerActivitiesOverview = (props) => {
  const player = props.player;
  const mode = props.mode;
  const startMoment = props.startMoment;
  const endMoment = props.endMoment;
  let classSelection = props.classSelection;

  let playerName = player.bungieDisplayName;
  let playerNameCode = player.bungieDisplayNameCode;

  const f = (m) => {
    let momentDate = m.getDate();
    let f = getFormatStr(momentDate);
    let dt = DateTime.fromJSDate(momentDate);
    let humanMoment = dt.toFormat(f);
    return humanMoment;
  };

  let momentStr;
  if (endMoment === Moment.NOW) {
    momentStr = `since ${startMoment.label} (${f(startMoment)})`;
  } else {
    momentStr = `from ${startMoment.label} (${f(startMoment)}) to ${
      endMoment.label
    } (${f(endMoment)})`;
  }

  return (
    <div style={elementStyle}>
      <div className="page_title">
        <span>{playerName}</span>
        <span className="player_name_code">#{playerNameCode}</span>{" "}
      </div>

      <hr className="page_section_title" />

      <div>
        {mode.label} stats for {formatCharacterClass(classSelection)}{" "}
        {momentStr}
      </div>
    </div>
  );
};

export default PlayerActivitiesOverview;
