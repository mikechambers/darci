import StatDetailBase from "./StatDetailBase";

const StatDetail = (props) => {
  let title = props.title;

  let values = [
    {
      value: props.avg.toLocaleString(),
      label: "avg",
    },
    {
      value: props.high.toLocaleString(),
      label: "high",
    },
    {
      value: props.total.toLocaleString(),
      label: "total",
    },
  ];

  return <StatDetailBase title={title} values={values} />;
};

export default StatDetail;
