import { calculatePercent } from "../../../utils";

import StatDetailBase from "./StatDetailBase";

const GamesDetail = (props) => {
  let wins = props.wins.toLocaleString();
  let losses = props.losses.toLocaleString();
  let mercies = props.mercies;
  let activityCount = props.activity_count;

  let values = [
    {
      value: wins,
      label: "wins",
    },
    {
      value: losses,
      label: "losses",
    },
    {
      value: calculatePercent(mercies, activityCount).toFixed(),
      label: "mercies",
    },
  ];

  return <StatDetailBase title="Games" values={values} />;
};

export default GamesDetail;
