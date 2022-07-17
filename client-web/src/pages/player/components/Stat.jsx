import React from "react";

const Stat = (props) => {
  const label = props.label;
  const value = props.value;
  const align = props.align ? props.align : "left";

  let style = {
    textAlign: align,
  };

  return (
    <div style={style}>
      <div className="data">{value}</div>
      <div className="label">{label}</div>
    </div>
  );
};

export default Stat;
