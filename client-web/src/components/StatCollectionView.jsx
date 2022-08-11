import React from "react";
import StatView from "./StatView";

const style = {
  paddingBottom: "20px",
};

const StatCollectionView = (props) => {
  let title = props.title;
  let values = props.values;

  if (!values) {
    return "";
  }

  return (
    <div className="stat_detail">
      <div className="subsection_header" style={style}>
        {title}
      </div>
      {values.map((v, index) => {
        return (
          <div style={style} key={index}>
            <StatView value={v.value.toLocaleString()} label={v.label} />
          </div>
        );
      })}
    </div>
  );
};

export default StatCollectionView;
