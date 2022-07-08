import { calculatePercent } from "../../../utils";

import StatDetailBase from "./StatDetailBase";

const GamesDetail = (props) => {
  let wins = props.wins.toLocaleString();
  let losses = props.losses.toLocaleString();
  let mercies = props.mercies;
  let activityCount = props.activity_count;

  console.log(
    mercies,
    activityCount,
    calculatePercent(mercies, activityCount).toFixed()
  );

  return (
    <StatDetailBase
      title="Games"
      col_1_value={wins}
      col_1_label="win"
      col_2_value={losses}
      col_2_label="loss"
      col_3_value={`${calculatePercent(mercies, activityCount).toFixed()}%`}
      col_3_label="mercy"
    />
  );
};

export default GamesDetail;
