import React from "react";

const StatDetailBase = (props) => {
  let title = props.title;
  let values = props.values;

  if (!values) {
    return "";
  }

  let len = values ? values.length : 0;

  let gridTemplateColumns = `repeat(${len}, 1fr)`;
  let gridTemplateRows = `repeat(${len}, 1fr)`;
  let gridTemplateAreas = "";

  let h = "";
  let v = "";
  let l = "";
  for (let i = 0; i < len; i++) {
    h += "header ";
    v += `value_${i} `;
    l += `label_${i} `;
  }

  h = `"${h}"\n`;
  v = `"${v}"\n`;
  l = `"${l}"\n`;

  gridTemplateAreas = h + v + l;

  let stat_detail_style = {
    display: "grid",
    gridTemplateColumns: gridTemplateColumns,
    gridTemplateRows: gridTemplateRows,

    gridTemplateAreas: gridTemplateAreas,

    width: 60 * len,
  };

  let key = 0;
  return (
    <div className="stat_detail" style={stat_detail_style}>
      <div
        className="stat_detail_title subsection_header"
        style={{ gridArea: "header" }}
      >
        {title}
      </div>
      {values.map((v, index) => {
        let align = index ? "right" : "left";

        return (
          <React.Fragment key={key++}>
            <div
              className={`label ${align}`}
              style={{ gridArea: `label_${index}` }}
            >
              {v.label}
            </div>
            <div className={align} style={{ gridArea: `value_${index}` }}>
              {v.value}
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default StatDetailBase;
