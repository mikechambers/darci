import { DateTime, Interval } from "luxon";
import React from "react";
import ExportDataButton from "../../../components/ExportDataButton";
import GraphicListHeader from "../../../components/GraphicListHeader";
import ActivityListItem from "./ActivityListItem";

const WIDTH = 735;

const containerStyle = {
  width: `${WIDTH}px`,
  display: "flex",
  flexDirection: "column",
  //padding: "var(--page-container-padding)",
};

const wrapperStyle = {
  display: "flex",
  flexDirection: "column",
  /*gap: "var(--list-item-gap)"*/
  gap: "2px",
};

const footerStyle = {
  display: "flex",
  justifyContent: "space-between",
};

const dateStyle = {
  width: "735px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-end",
  textTransform: "capitalize",
  font: "var(--font-subsection-header)",
};

const ActivityList = (props) => {
  let activities = props.activities;
  let summary = props.summary;

  if (props.isLoading) {
    return <div>Loading...</div>;
  }

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
              s = dt.toRelativeCalendar();
            } else if (diff < 7) {
              s = dt.toFormat("EEEE, LLLL d");
            } else {
              s = dt.toFormat("DDD");
            }
            dateDiv = <div style={dateStyle}>{s}</div>;
          }

          return (
            <React.Fragment key={game.activity.activityId}>
              {dateDiv}
              <ActivityListItem
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

export default ActivityList;
