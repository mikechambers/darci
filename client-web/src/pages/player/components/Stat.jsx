import React from "react";

const Stat = (props) => {
  const label = props.label;
  const value = props.value;
  const align = props.align ? props.align : "left";
  const highlight = props.highlight === true ? true : false;
  const title = props.title ? props.title : "";

  let style = {
    textAlign: align,
  };

  let highlightStyle = {};

  if (highlight) {
    highlightStyle.textDecoration = "underline";
    highlightStyle.textDecorationColor = "#3FD445";
    highlightStyle.textDecorationStyle = "solid";
    highlightStyle.textDecorationThickness = "2px";
  }

  return (
    <div style={style}>
      <div className="data" title={title} style={highlightStyle}>
        {value}
      </div>
      <div className="label">{label}</div>
    </div>
  );
};

export default Stat;
