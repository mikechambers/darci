import React from "react";
import Stat from "./Stat";

const style = {
  paddingBottom:"20px",
};

const StatDetailBase = (props) => {
  let title = props.title;
  let values = props.values;

  if (!values) {
    return "";
  }

  return (
    <div className="stat_detail">
      <div
        className="subsection_header"
        style={style}
      >
        {title}
      </div>
      {values.map((v, index) => {
        return (
          <div style={style} key={index}>
            <Stat value={v.value} label={v.label}/>
          </div>
        );
      })}
    </div>
  );
};

export default StatDetailBase;
