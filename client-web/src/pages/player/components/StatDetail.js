const StatDetail = (props) => {
  let label = props.label;
  let value = props.value;

  return (
    <div className="stat_detail_container">
      <div className="stat_detail_title">TITLE</div>
      <div className="stat_detail_avg_title">Avg</div>
      <div className="stat_detail_avg_value">Avg Value</div>
      <div className="stat_detail_high_title">High</div>
      <div className="stat_detail_high_value">High Value</div>
      <div className="stat_detail_total_title">Total</div>
      <div className="stat_detail_total_value">Total Value</div>
    </div>
  );
};

export default StatDetail;
