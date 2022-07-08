const StatDetail = (props) => {
  let title = props.title;
  let avg = props.avg;
  let high = props.high;
  let total = props.total;

  return (
    <div className="stat_detail_container">
      <div className="stat_detail_title">{title}</div>
      <div className="stat_detail_avg_title">Avg</div>
      <div className="stat_detail_avg_value">{avg}</div>
      <div className="stat_detail_high_title">High</div>
      <div className="stat_detail_high_value">{high}</div>
      <div className="stat_detail_total_title">Total</div>
      <div className="stat_detail_total_value">{total}</div>
    </div>
  );
};

export default StatDetail;
