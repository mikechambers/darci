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
    <div>
      <div className="page_title">
        <span>{playerName}</span>
        <span className="bungie_name_code">#{playerNameCode}</span>{" "}
      </div>
      <hr />
      <div className="page_subtitle">
        {mode.label} stats for {formatCharacterClass(classSelection)} since{" "}
        {moment.label} ({humanMoment})
      </div>
    </div>
  );
};

export default PlayerActivitiesOverview;
