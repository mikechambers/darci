import StatCollectionView from "./StatCollectionView";

const StatSummaryView = (props) => {
  let title = props.title;
  let avg = props.avg;
  let high = props.high;
  let total = props.total;

  let values = [
    {
      value: avg,
      label: "avg",
    },
    {
      value: high,
      label: "high",
    },
    {
      value: total,
      label: "total",
    },
  ];

  return <StatCollectionView title={title} values={values} />;
};

export default StatSummaryView;
