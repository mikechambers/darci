import { DateTime, Interval } from "luxon";
import React from "react";
import PlayerActivityListItemHeader from "./PlayerActivityListItemHeader";

const containerStyle = {
  display: "flex",
  flexDirection: "column",
};

const wrapperStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "2px",
};

const dateStyleFirst = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-end",
  textTransform: "capitalize",
};

const dateStyle = {
  ...dateStyleFirst,
  paddingTop: "24px",
};

const PlayerActivityList = (props) => {
  let activities = props.activities;
  let summary = props.summary;

  let lastDate;
  let now = DateTime.now();
  return (
    <div style={containerStyle}>
      <div style={wrapperStyle}>
        {activities.map((game, index) => {
          let dt = DateTime.fromISO(game.activity.period);

          let dateDiv = "";
          if (!lastDate || !dt.hasSame(lastDate, "day")) {
            lastDate = dt;

            let s;
            let diff = Interval.fromDateTimes(dt, now).length("days");

            if (diff < 4) {
              s = dt.toRelativeCalendar({ unit: "days" });
            } else if (diff < 7) {
              s = dt.toFormat("EEEE, LLLL d");
            } else {
              s = dt.toFormat("DDD");
            }
            let style = !index ? dateStyleFirst : dateStyle;

            dateDiv = (
              <div style={style} className="subsection_header">
                {s}
              </div>
            );
          }

          return (
            <React.Fragment key={game.activity.activityId}>
              {dateDiv}
              <PlayerActivityListItemHeader
                activity={game}
                summary={summary}
                key={game.activity.activityId}
              />
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default PlayerActivityList;
