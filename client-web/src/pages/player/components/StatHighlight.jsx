const StatHighlight = (props) => {
  let label = props.label;
  let value = props.value;

  let stat_highlight_child_style = {
    padding: "0px !important",
    textAlign: "right",
  };

  let stat_highlight_style = {
    width: "min-content",
    paddingRight: "100px",
    lineHeight: "1.0",
  };

  return (
    <div style={stat_highlight_style}>
      <div className="data_highlight" style={stat_highlight_child_style}>
        {value}
      </div>
      <div
        className="label_highlight"
        style={stat_highlight_child_style}
      >
        {label}
      </div>
    </div>
  );
};

export default StatHighlight;
