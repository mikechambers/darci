import { calculatePercent, calculateAverage } from "../../../utils/index";
import {
  DataTable,
  RIGHT_ALIGN,
  LEFT_ALIGN,
  DATA_TYPE,
  generateHeader,
  generateCell,
} from "./DataTable";

const MapsDetail = (props) => {
  let maps = props.maps ? props.maps : [];

  maps.sort((a, b) => {
    return b.summary.activityCount - a.summary.activityCount;
  });

  let headers = [
    generateHeader("name", LEFT_ALIGN),
    generateHeader("games", RIGHT_ALIGN),
    generateHeader("win", RIGHT_ALIGN),
    generateHeader("kills", RIGHT_ALIGN),
    generateHeader("assists", RIGHT_ALIGN),
    generateHeader("defeats", RIGHT_ALIGN),
    generateHeader("deaths", RIGHT_ALIGN),
    generateHeader("kd", RIGHT_ALIGN),
    generateHeader("eff", RIGHT_ALIGN),
    generateHeader("mercies", RIGHT_ALIGN),
    generateHeader("completed", RIGHT_ALIGN),
  ];

  let data = [];

  let totalGames = 0;
  for (const m of maps) {
    totalGames += m.summary.activityCount;
  }

  for (const m of maps) {
    let games = `${m.summary.activityCount} (${calculatePercent(
      m.summary.activityCount,
      totalGames
    ).toFixed()}%)`;

    let row = [];
    row.push(generateCell(m.map.name, DATA_TYPE, LEFT_ALIGN));
    row.push(generateCell(games, DATA_TYPE, RIGHT_ALIGN));
    row.push(
      generateCell(
        `${calculatePercent(
          m.summary.wins,
          m.summary.activityCount
        ).toFixed()}%`,
        DATA_TYPE,
        RIGHT_ALIGN
      )
    );
    row.push(
      generateCell(
        calculateAverage(m.summary.kills, m.summary.activityCount).toFixed(2),
        DATA_TYPE,
        RIGHT_ALIGN
      )
    );
    row.push(
      generateCell(
        calculateAverage(m.summary.assists, m.summary.activityCount).toFixed(2),
        DATA_TYPE,
        RIGHT_ALIGN
      )
    );
    row.push(
      generateCell(
        calculateAverage(
          m.summary.opponentsDefeated,
          m.summary.activityCount
        ).toFixed(2),
        DATA_TYPE,
        RIGHT_ALIGN
      )
    );
    row.push(
      generateCell(
        calculateAverage(m.summary.deaths, m.summary.activityCount).toFixed(2),
        DATA_TYPE,
        RIGHT_ALIGN
      )
    );
    row.push(
      generateCell(
        m.summary.killsDeathsRatio.toFixed(2),
        DATA_TYPE,
        RIGHT_ALIGN
      )
    );
    row.push(
      generateCell(m.summary.efficiency.toFixed(2), DATA_TYPE, RIGHT_ALIGN)
    );
    row.push(
      generateCell(
        `${calculatePercent(
          m.summary.mercies,
          m.summary.activityCount
        ).toFixed()}%`,
        DATA_TYPE,
        RIGHT_ALIGN
      )
    );
    row.push(
      generateCell(
        `${calculatePercent(
          m.summary.completed,
          m.summary.activityCount
        ).toFixed()}%`,
        DATA_TYPE,
        RIGHT_ALIGN
      )
    );

    data.push(row);
  }

  let containterStyle = {
    width: "725px",
    display: "flex",
    flexDirection: "column",
    gap: "12px", //todo: move this to a css variable
    padding: "var(--content-padding)",
  };

  let itemStyle = {
    height: "70px",
  };

  let dataContainterStyle = {
    height: "45px",

    backgroundColor: "#2E2E2E",
    borderRadius: "0px 0px 8px 8px",
  };

  let mapNameStyle = {
    display: "inline-block",
    alignSelf: "flex-end",
  };

  console.log(maps);
  return (
    <div style={containterStyle}>
      {maps.map((map, index) => {
        let mapStyle = {
          display: "flex",
          height: "25px",
          backgroundImage: `url(${map.map.image})`,
          backgroundPosition: "center",
        };

        return (
          <div>
            <div
              className="map_detail_image weapon_title"
              id="map_image"
              style={mapStyle}
            >
              <span style={mapNameStyle}>{map.map.name}</span>
            </div>
            <div style={dataContainterStyle}>data</div>
          </div>
        );
      })}
    </div>
  );
};

export default MapsDetail;
