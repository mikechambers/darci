import React from "react";
import PlayerMapSummaryView from "./PlayerMapSummaryView";

const containerStyle = {
  display: "flex",
  flexDirection: "column",
  //padding: "var(--padding-page-container)",
};

const wrapperStyle = {
  display: "flex",
  flexDirection: "row",
  gap: "var(--gap-list-item)",
  //gap: "20px",
  flexWrap: "wrap",
};

const PlayerMapSummaryList = (props) => {
  let maps = props.maps ? props.maps : [];

  maps.sort((a, b) => {
    return b.summary.activityCount - a.summary.activityCount;
  });

  let totalGames = maps.reduce(
    (prev, cur) => cur.summary.activityCount + prev,
    0
  );

  return (
    <div style={containerStyle}>
      <div style={wrapperStyle}>
        {maps.map((map, index) => {
          return (
            <PlayerMapSummaryView
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

export default PlayerMapSummaryList;
