const StatDetail = (props) => {
  let title = props.title;
  let avg = props.avg.toLocaleString();
  let high = props.high.toLocaleString();
  let total = props.total.toLocaleString();

  let stat_detail_style = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gridTemplateRows: "1fr 1fr 1fr",

    gridTemplateAreas: `"header header header"
        "avg_value high_value total_value"
        "avg_label high_label total_label"`,

    width: "160px",
  };

  return (
    <div className="stat_detail" style={stat_detail_style}>
      <div
        className="stat_detail_title data_title"
        style={{ gridArea: "header" }}
      >
        {title}
      </div>
      <div
        className="stat_detail_avg_label data_label"
        style={{ gridArea: "avg_label" }}
      >
        Avg
      </div>
      <div className="stat_detail_avg_value" style={{ gridArea: "avg_value" }}>
        {avg}
      </div>
      <div
        className="stat_detail_high_label data_label"
        style={{ gridArea: "high_label", textAlign: "right" }}
      >
        High
      </div>
      <div
        className="stat_detail_high_value"
        style={{ gridArea: "high_value", textAlign: "right" }}
      >
        {high}
      </div>
      <div
        className="stat_detail_total_label data_label"
        style={{ gridArea: "total_label", textAlign: "right" }}
      >
        Total
      </div>
      <div
        className="stat_detail_total_value"
        style={{ gridArea: "total_value", textAlign: "right" }}
      >
        {total}
      </div>
    </div>
  );
};

export default StatDetail;
