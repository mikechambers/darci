import { calculatePercent } from "../../../utils";

import StatDetailBase from "./StatDetailBase";

const GamesDetail = (props) => {
  let wins = props.wins;
  let mercies = props.mercies;
  let activityCount = props.activityCount;
  let losses = activityCount - wins;

  let values = [
    {
      value: wins,
      label: "win",
    },
    {
      value: losses,
      label: "loss",
    },
    {
      value: calculatePercent(mercies, activityCount).toFixed() + "%",
      label: "mercy",
    },
  ];

  return <StatDetailBase title="Games" values={values} />;
};

export default GamesDetail;
