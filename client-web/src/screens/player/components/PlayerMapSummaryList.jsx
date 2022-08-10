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

  let description =
    "Data aggregated by map.\n\nOrdered by number of times the map was played.";

  maps.sort((a, b) => {
    return b.summary.activityCount - a.summary.activityCount;
  });

  let totalGames = 0;
  for (const m of maps) {
    totalGames += m.summary.activityCount;
  }

  let data = [];
  for (const m of maps) {
    let games = m.summary.activityCount;

    let d = [];

    d.push({
      label: "games",
      value: games,
    });

    d.push({
      label: "total",
      value: `${calculatePercent(
        m.summary.activityCount,
        totalGames
      ).toFixed()}%`,
    });

    d.push({
      label: "win",
      value: `${calculatePercent(
        m.summary.wins,
        m.summary.activityCount
      ).toFixed()}%`,
    });

    d.push({
      label: "kills",
      value: calculateAverage(m.summary.kills, m.summary.activityCount).toFixed(
        2
      ),
    });

    d.push({
      label: "assists",
      value: calculateAverage(
        m.summary.assists,
        m.summary.activityCount
      ).toFixed(2),
    });

    d.push({
      label: "defeats",
      value: calculateAverage(
        m.summary.opponentsDefeated,
        m.summary.activityCount
      ).toFixed(2),
    });

    d.push({
      label: "deaths",
      value: calculateAverage(
        m.summary.deaths,
        m.summary.activityCount
      ).toFixed(2),
    });

    d.push({
      label: "kd",
      value: calculateKillsDeathsRatio(
        m.summary.kills,
        m.summary.deaths
      ).toFixed(2),
    });

    d.push({
      label: "eff",
      value: calculateEfficiency(
        m.summary.kills,
        m.summary.deaths,
        m.summary.assists
      ),
    });

    d.push({
      label: "mercies",
      value: `${calculatePercent(
        m.summary.mercies,
        m.summary.activityCount
      ).toFixed()}%`,
    });

    d.push({
      label: "completed",
      value: `${calculatePercent(
        m.summary.completed,
        m.summary.activityCount
      ).toFixed()}%`,
    });
    data.push({
      title: m.map.name,
      image: m.map.image,
      items: d,
    });
  }

  <div id="parent">
    <div id="a"></div>
    <div id="b"></div>
  </div>;

  return (
    <div style={containerStyle}>
      <div style={wrapperStyle}>
        {maps.map((map, index) => {
          return <PlayerMapSummaryView map={map} key={map.referenceId} />;
        })}
      </div>
    </div>
  );
};

export default PlayerMapSummaryList;
