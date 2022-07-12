import { calculateRatio } from "shared";

import {
  DataTable,
  RIGHT_ALIGN,
  LEFT_ALIGN,
  DATA_TYPE,
  ICON_TYPE,
  generateHeader,
  generateCell,
} from "./DataTable";

const WeaponMetaDetail = (props) => {
  let meta = props.meta ? props.meta : [];
  let maxCount = props.max ? props.max : 5;

  meta.sort((a, b) => {
    return b.count - a.count;
  });

  let headers = [
    generateHeader("", LEFT_ALIGN),
    generateHeader("weapon", RIGHT_ALIGN),
    generateHeader("players", RIGHT_ALIGN),
    generateHeader("kills", RIGHT_ALIGN),
    generateHeader("kills/p", RIGHT_ALIGN),
    generateHeader("type", RIGHT_ALIGN),
  ];

  if (meta.length > maxCount) {
    meta = meta.slice(0, maxCount);
  }

  let data = [];

  for (const w of meta) {
    let row = [];

    data.push(row);

    row.push(generateCell(w.item.icon, ICON_TYPE, LEFT_ALIGN));
    row.push(generateCell(w.item.name, DATA_TYPE, RIGHT_ALIGN));
    row.push(generateCell(w.count, DATA_TYPE, RIGHT_ALIGN));
    row.push(generateCell(w.kills, DATA_TYPE, RIGHT_ALIGN));
    row.push(
      generateCell(
        calculateRatio(w.kills, w.count).toFixed(2),
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

export default WeaponMetaDetail;
