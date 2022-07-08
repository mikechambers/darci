const StatDetailBase = (props) => {
  let title = props.title;
  let col_1_value = props.col_1_value;
  let col_1_label = props.col_1_label;
  let col_2_value = props.col_2_value;
  let col_2_label = props.col_2_label;
  let col_3_value = props.col_3_value;
  let col_3_label = props.col_3_label;

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
        {col_1_label}
      </div>
      <div className="stat_detail_avg_value" style={{ gridArea: "avg_value" }}>
        {col_1_value}
      </div>
      <div
        className="stat_detail_high_label data_label"
        style={{ gridArea: "high_label", textAlign: "right" }}
      >
        {col_2_label}
      </div>
      <div
        className="stat_detail_high_value"
        style={{ gridArea: "high_value", textAlign: "right" }}
      >
        {col_2_value}
      </div>
      <div
        className="stat_detail_total_label data_label"
        style={{ gridArea: "total_label", textAlign: "right" }}
      >
        {col_3_label}
      </div>
      <div
        className="stat_detail_total_value"
        style={{ gridArea: "total_value", textAlign: "right" }}
      >
        {col_3_value}
      </div>
    </div>
  );
};

export default StatDetailBase;
