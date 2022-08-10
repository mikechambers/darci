import React from "react";
import { calculateEfficiency, calculateKillsDeathsRatio } from "shared";
import { humanDuration } from "../../../core/utils/date";
import { calculatePercent, calculateAverage } from "../../../core/utils/index";
import Stat from "./Stat";

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

const headerStyle = {
  display: "flex",
  height: "50px",
  alignSelf: "flex-start",
};

const elementStyle = {
  width: "235px",
  height: "310px",
  borderRadius: "var(--radius-border)",
  //border: "var(--border-list-item)",
  //backgroundPosition: "0px 49px, center",
  //backgroundSize: "contain, cover", //contain cover
  //backgroundRepeat: "repeat, no-repeat",
  backgroundPosition: "top 49px left 0px, top",
  backgroundSize: "cover, contain", //contain cover
  backgroundRepeat: "no-repeat, no-repeat",

  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const datacontainerStyle = {
  height: "265px",
  width: "100%",

  //backgroundColor: "var(--color-list-item-background)",
  backgroundColor: "#1C1C1Cee",
  backdropFilter: "var(--blur-background)",
  borderRadius: "0px 0px var(--radius-border) var(--radius-border)",

  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  /*
  alignItems: "center",
  padding: "0px 12px",
  */
};

const topContainerDataStyle = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  margin: "12px",
};

const bottomContainerDataStyle = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  margin: "12px",
};

const mapNameStyle = {
  display: "inline-block",
  alignSelf: "flex-end",
  padding: "0px 12px",
  textShadow: "1px 1px 1px black",
};

const statContainerStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "16px",
};

const footerStyle = {
  display: "flex",
  justifyContent: "space-between",
};

const MapsDetail = (props) => {
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
          let h = {
            ...elementStyle,
            backgroundImage: `url(${map.map.image}), url(${map.map.image})`,
          };

          let timePlayed = humanDuration(
            map.summary.timePlayedSeconds * 1000,
            true
          );

          return (
            <div key={map.referenceId} style={h}>
              <div className="subsection_header" style={headerStyle}>
                <span style={mapNameStyle}>{map.map.name}</span>
              </div>

              <div style={datacontainerStyle}>
                <div style={topContainerDataStyle}>
                  <div style={statContainerStyle}>
                    <Stat
                      label="win"
                      value={`${calculatePercent(
                        map.summary.wins,
                        map.summary.activityCount
                      ).toFixed()}%`}
                    />
                    <Stat label="games" value={map.summary.activityCount} />
                    <Stat
                      label="total"
                      value={`${calculatePercent(
                        map.summary.activityCount,
                        totalGames
                      ).toFixed()}%`}
                    />
                    <Stat
                      label="mercy"
                      value={`${calculatePercent(
                        map.summary.mercies,
                        map.summary.activityCount
                      ).toFixed()}%`}
                    />
                  </div>
                  <div style={statContainerStyle}>
                    <Stat
                      label="kd"
                      value={calculateKillsDeathsRatio(
                        map.summary.kills,
                        map.summary.deaths
                      ).toFixed(2)}
                      align="center"
                    />
                    <Stat
                      label="kills"
                      value={calculateAverage(
                        map.summary.kills,
                        map.summary.activityCount
                      ).toFixed(2)}
                      align="center"
                    />
                    <Stat
                      label="defeats"
                      value={calculateAverage(
                        map.summary.opponentsDefeated,
                        map.summary.activityCount
                      ).toFixed(2)}
                      align="center"
                    />
                  </div>
                  <div style={statContainerStyle}>
                    <Stat
                      label="eff"
                      value={calculateEfficiency(
                        map.summary.kills,
                        map.summary.deaths,
                        map.summary.assists
                      ).toFixed(2)}
                      align="right"
                    />
                    <Stat
                      label="assists"
                      value={calculateAverage(
                        map.summary.assists,
                        map.summary.activityCount
                      ).toFixed(2)}
                      align="right"
                    />
                    <Stat
                      label="deaths"
                      value={calculateAverage(
                        map.summary.deaths,
                        map.summary.activityCount
                      ).toFixed(2)}
                      align="right"
                    />
                  </div>
                </div>

                <div style={bottomContainerDataStyle}>
                  <Stat
                    label="completed"
                    value={`${calculatePercent(
                      map.summary.completed,
                      map.summary.activityCount
                    ).toFixed()}%`}
                  />
                  <Stat label="time played" value={timePlayed} align="right" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MapsDetail;
