import { humanDuration } from "../../../utils/date";
import Stat from "./Stat";
import { calculateEfficiency, calculateKillsDeathsRatio } from "shared";
import { calculatePercent, calculateAverage } from "../../../core/utils/index";

const headerStyle = {
  display: "flex",
  height: "50px",
  alignSelf: "flex-start",
};

const elementStyle = {
  width: "235px",
  height: "310px",
  borderRadius: "var(--radius-border)",
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

const PlayerMapSummaryView = (props) => {
  let map = props.map;

  let h = {
    ...elementStyle,
    backgroundImage: `url(${map.map.image}), url(${map.map.image})`,
  };

  let timePlayed = humanDuration(map.summary.timePlayedSeconds * 1000, true);

  return (
    <div style={h}>
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
};

export default PlayerMapSummaryView;
