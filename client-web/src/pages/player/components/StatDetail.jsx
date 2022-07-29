import StatDetailBase from "./StatDetailBase";

const StatDetail = (props) => {
  let title = props.title;

  let values = [
    {
      value: props.avg,
      label: "avg",
    },
    {
      value: props.high,
      label: "high",
    },
    {
      value: props.total,
      label: "total",
    },
  ];

  return <StatDetailBase title={title} values={values} />;
};

export default StatDetail;
