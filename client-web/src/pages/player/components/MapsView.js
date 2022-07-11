import { calculatePercent, calculateAverage } from "../../../utils/index";
import {
  DataTable,
  RIGHT_ALIGN,
  LEFT_ALIGN,
  DATA_TYPE,
  generateHeader,
  generateCell,
} from "./DataTable";

const MapsView = (props) => {
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

  for (const m of maps) {
    let row = [];
    row.push(generateCell(m.map.name, DATA_TYPE, LEFT_ALIGN));
    row.push(
      generateCell(m.summary.wins + m.summary.losses, DATA_TYPE, RIGHT_ALIGN)
    );
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

  return <DataTable data={data} headers={headers} />;
};

export default MapsView;
