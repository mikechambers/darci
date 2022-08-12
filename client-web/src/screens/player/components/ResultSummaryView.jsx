import { calculatePercent } from "../../../core/utils";

import StatCollectionView from "../../../components/StatCollectionView";

const ResultSummaryView = (props) => {
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

  return <StatCollectionView title="Games" values={values} />;
};

export default ResultSummaryView;
