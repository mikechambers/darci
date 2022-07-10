import { calculatePercent, calculateAverage } from "../../../utils/index";
import {
  DataTable,
  RIGHT_ALIGN,
  LEFT_ALIGN,
  DATA_TYPE,
  generateHeader,
  generateData,
} from "./DataTable";

const MapsView = (props) => {
  let maps = props.maps ? props.maps : [];

  maps.sort((a, b) => {
    return b.summary.activityCount - a.summary.activityCount;
  });

  let headers = [
    generateHeader("name", "name", LEFT_ALIGN),
    generateHeader("games", "total", RIGHT_ALIGN),
    generateHeader("win", "wins", RIGHT_ALIGN),
    generateHeader("kills", "kills", RIGHT_ALIGN),
    generateHeader("assists", "assists", RIGHT_ALIGN),
    generateHeader("defeats", "defeats", RIGHT_ALIGN),
    generateHeader("deaths", "deaths", RIGHT_ALIGN),
    generateHeader("kd", "kd", RIGHT_ALIGN),
    generateHeader("eff", "eff", RIGHT_ALIGN),
    generateHeader("mercies", "mercies", RIGHT_ALIGN),
    generateHeader("completed", "completed", RIGHT_ALIGN),
  ];

  let data = [];

  for (const m of maps) {
    let row = [];
    row.push(generateData(m.map.name, DATA_TYPE, LEFT_ALIGN));
    row.push(
      generateData(m.summary.wins + m.summary.losses, DATA_TYPE, RIGHT_ALIGN)
    );
    row.push(
      generateData(
        `${calculatePercent(
          m.summary.wins,
          m.summary.activityCount
        ).toFixed()}%`,
        DATA_TYPE,
        RIGHT_ALIGN
      )
    );
    row.push(
      generateData(
        calculateAverage(m.summary.kills, m.summary.activityCount).toFixed(2),
        DATA_TYPE,
        RIGHT_ALIGN
      )
    );
    row.push(
      generateData(
        calculateAverage(m.summary.assists, m.summary.activityCount).toFixed(2),
        DATA_TYPE,
        RIGHT_ALIGN
      )
    );
    row.push(
      generateData(
        calculateAverage(
          m.summary.opponentsDefeated,
          m.summary.activityCount
        ).toFixed(2),
        DATA_TYPE,
        RIGHT_ALIGN
      )
    );
    row.push(
      generateData(
        calculateAverage(m.summary.deaths, m.summary.activityCount).toFixed(2),
        DATA_TYPE,
        RIGHT_ALIGN
      )
    );
    row.push(
      generateData(
        m.summary.killsDeathsRatio.toFixed(2),
        DATA_TYPE,
        RIGHT_ALIGN
      )
    );
    row.push(
      generateData(m.summary.efficiency.toFixed(2), DATA_TYPE, RIGHT_ALIGN)
    );
    row.push(
      generateData(
        `${calculatePercent(
          m.summary.mercies,
          m.summary.activityCount
        ).toFixed()}%`,
        DATA_TYPE,
        RIGHT_ALIGN
      )
    );
    row.push(
      generateData(
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

  return <DataTable data={data} headers={headers} />;
};

export default MapsView;
