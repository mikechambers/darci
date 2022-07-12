import { calculatePercent, calculateAverage } from "../../../utils/index";

import {
  DataTable,
  RIGHT_ALIGN,
  LEFT_ALIGN,
  DATA_TYPE,
  ICON_TYPE,
  generateHeader,
  generateCell,
} from "./DataTable";

const WeaponsDetail = (props) => {
  let weapons = props.weapons ? props.weapons : [];
  let maxCount = props.max ? props.max : 5;

  weapons.sort((a, b) => {
    return b.kills - a.kills;
  });

  if (weapons.length > maxCount) {
    weapons = weapons.slice(0, maxCount);
  }

  let headers = [
    generateHeader("", LEFT_ALIGN),
    generateHeader("weapon", RIGHT_ALIGN),
    generateHeader("games", RIGHT_ALIGN),
    generateHeader("kills", RIGHT_ALIGN),
    generateHeader("kills/g", RIGHT_ALIGN),
    generateHeader("precision", RIGHT_ALIGN),
    generateHeader("type", RIGHT_ALIGN),
  ];

  let data = [];

  for (const w of weapons) {
    let row = [];

    data.push(row);

    row.push(generateCell(w.item.icon, ICON_TYPE, LEFT_ALIGN));
    row.push(generateCell(w.item.name, DATA_TYPE, RIGHT_ALIGN));
    row.push(generateCell(w.kills, DATA_TYPE, RIGHT_ALIGN));
    row.push(generateCell(w.activityCount, DATA_TYPE, RIGHT_ALIGN));
    row.push(
      generateCell(
        calculateAverage(w.kills, w.activityCount).toFixed(2),
        DATA_TYPE,
        RIGHT_ALIGN
      )
    );
    row.push(
      generateCell(
        calculatePercent(w.precisionKills, w.kills).toFixed(2) + "%",
        DATA_TYPE,
        RIGHT_ALIGN
      )
    );

    row.push(
      generateCell(w.item.itemSubType.toString(), DATA_TYPE, RIGHT_ALIGN)
    );
  }

  return <DataTable data={data} headers={headers} />;
};

export default WeaponsDetail;
