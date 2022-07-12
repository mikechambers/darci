import { Link } from "react-router-dom";
import { CompletionReason } from "shared";

import {
  DataTable,
  RIGHT_ALIGN,
  LEFT_ALIGN,
  DATA_TYPE,
  generateHeader,
  generateCell,
} from "./DataTable";

const ActivitiesDetail = (props) => {
  let activities = props.activities;

  if (props.isLoading) {
    return <div>Loading...</div>;
  }

  let headers = [
    generateHeader("map", LEFT_ALIGN),
    generateHeader("mode", LEFT_ALIGN),
    generateHeader("w/l", LEFT_ALIGN),
    generateHeader("kills", RIGHT_ALIGN),
    generateHeader("assists", RIGHT_ALIGN),
    generateHeader("k+a", RIGHT_ALIGN),
    generateHeader("deaths", RIGHT_ALIGN),
    generateHeader("kd", RIGHT_ALIGN),
    generateHeader("eff", RIGHT_ALIGN),
    generateHeader("completed", RIGHT_ALIGN),
    generateHeader("mercy", RIGHT_ALIGN),
  ];

  let data = [];

  for (const a of activities) {
    let row = [];

    data.push(row);

    row.push(
      generateCell(
        a.activity.map.name,
        DATA_TYPE,
        LEFT_ALIGN,
        `/activity/${a.activity.activityId}/${a.player.memberId}`
      )
    );
    row.push(generateCell(a.activity.mode.label, DATA_TYPE, LEFT_ALIGN));
    row.push(generateCell(a.stats.standing.toString(), DATA_TYPE, LEFT_ALIGN));
    row.push(generateCell(a.stats.kills, DATA_TYPE, RIGHT_ALIGN));
    row.push(generateCell(a.stats.assists, DATA_TYPE, RIGHT_ALIGN));
    row.push(generateCell(a.stats.opponentsDefeated, DATA_TYPE, RIGHT_ALIGN));
    row.push(generateCell(a.stats.deaths, DATA_TYPE, RIGHT_ALIGN));
    row.push(
      generateCell(a.stats.killsDeathsRatio.toFixed(2), DATA_TYPE, RIGHT_ALIGN)
    );
    row.push(
      generateCell(a.stats.efficiency.toFixed(2), DATA_TYPE, RIGHT_ALIGN)
    );
    row.push(
      generateCell(!a.stats.completed ? "FALSE" : "", DATA_TYPE, RIGHT_ALIGN)
    );
    row.push(
      generateCell(
        a.stats.completionReason === CompletionReason.MERCY ? "TRUE" : "",
        DATA_TYPE,
        RIGHT_ALIGN
      )
    );
  }

  return <DataTable data={data} headers={headers} />;
};

export default ActivitiesDetail;
