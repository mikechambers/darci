import React from "react";

export const SMALL_STYLE = "small";
export const LARGE_STYLE = "large";
export const REGULAR_STYLE = undefined;

export const ALIGN_RIGHT = "right";
export const ALIGN_LEFT = "left";

const Stat = (props) => {
  const label = props.label;
  const value = props.value;
  const styleName = props.styleName;

  const align = props.align ? props.align : ALIGN_LEFT;
  const highlight = props.highlight === true ? true : false;
  const title = props.title ? props.title : "";

  let labelClassName = "label";
  let valueClassName = "data";

  if (styleName) {
    labelClassName = `${labelClassName}_${styleName}`;
    valueClassName = `${valueClassName}_${styleName}`;
  }

  if (styleName === SMALL_STYLE) {
    labelClassName = "label_small";
    valueClassName = "data";
  } else if (styleName === LARGE_STYLE) {
    labelClassName = "label_highlight";
    valueClassName = "data_highlight";
  }

  let s = {
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
    <div style={s}>
      <div className={valueClassName} title={title} style={highlightStyle}>
        {value.toLocaleString()}
      </div>
      <div title={title} className={labelClassName}>
        {label}
      </div>
    </div>
  );
};

export default Stat;
