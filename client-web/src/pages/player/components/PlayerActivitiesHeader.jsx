import { CharacterClassSelection, Mode, Moment } from "shared";
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

const format = function (d) {
  let out = "cccc 'at' t";
  if (dateIsToday(d)) {
    out = "'Today at' t";
  } else if (dateIsWithinLastWeek(d)) {
    out = "DDD";
  }

  return out;
};

const PlayerActivitiesOverview = (props) => {
  let playerName = props.playerName;
  let playerNameCode = props.playerNameCode;
  let classSelection = props.classSelection;

  let mode = Mode.fromString(props.modeName);
  let moment = Moment.fromString(props.momentName);

  let momentDate = DateTime.fromJSDate(props.momentDate);

  let f = format(props.momentDate);
  let humandMoment = momentDate.toFormat(f);

  return (
    <div>
      <div className="page_title">
        <span>{playerName}</span><span className="bungie_name_code">#{playerNameCode}</span>{" "}
      </div>
      <hr />
      <div className="page_subtitle">

      {mode.label} stats for {formatCharacterClass(classSelection)} since {moment.label} ({humandMoment})

 
      </div>
    </div>
  );
};

export default PlayerActivitiesOverview;
