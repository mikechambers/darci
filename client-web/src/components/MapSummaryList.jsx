import React from "react";
import MapSummaryView from "./MapSummaryView";

const rootStyle = {
  display: "flex",
  flexDirection: "column",
};

const wrapperStyle = {
  display: "flex",
  flexDirection: "row",
  gap: "var(--gap-list-item)",
  flexWrap: "wrap",
};

const MapSummaryList = (props) => {
  let maps = props.maps ? props.maps : [];

  maps.sort((a, b) => {
    return b.summary.activityCount - a.summary.activityCount;
  });

  let totalGames = maps.reduce(
    (prev, cur) => cur.summary.activityCount + prev,
    0
  );

  return (
    <div style={rootStyle}>
      <div style={wrapperStyle}>
        {maps.map((map, index) => {
          return (
            <MapSummaryView
              map={map}
              totalGames={totalGames}
              key={map.referenceId}
            />
          );
        })}
      </div>
    </div>
  );
};

export default MapSummaryList;
