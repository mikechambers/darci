import StatDetailBase from "./StatDetailBase";

const StatDetail = (props) => {
  let title = props.title;
  let avg = props.avg.toLocaleString();
  let high = props.high.toLocaleString();
  let total = props.total.toLocaleString();

  return (
    <StatDetailBase
      title={title}
      col_1_value={avg}
      col_1_label="avg"
      col_2_value={high}
      col_2_label="high"
      col_3_value={total}
      col_3_label="total"
    />
  );
};

export default StatDetail;
