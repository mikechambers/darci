import React, { useState } from "react";
import Stat from "./Stat";
import ExportDataButton from "../../../components/ExportDataButton";
import InfoTip from "../../../components/InfoTip";

const containerStyle = {
  display: "flex",
  backgroundColor: "var(--list-item-background-color)",
  borderRadius: "var(--border-radius)",
  padding: "12px",
  gap: "var(--list-item-gap)",
};

const dataContainerStyle = {
  width: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
};

const headerStyle = {
  display: "flex",
  justifyContent: "space-between",
  width: "100%",
  alignItems: "flex-end",
};

const valuesStyle = {
  display: "flex",
  justifyContent: "space-between",
};

const wrapperStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "var(--list-item-gap)",

  maxHeight: "488px",
  overflow: "auto",
};

const elementStyle = {
  padding: "var(--content-padding)",
  width: "422px",
};

const footerStyle = {
  display: "flex",
  justifyContent: "space-between",
};

const titleStyle = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
};

const WeaponList = (props) => {
  let weapons = props.weapons;
  let title = props.title;
  let sortLabels = props.sortLabels;
  let defaultIndex = props.sortIndex ? props.sortIndex : 0;

  let description = props.description ? props.description : "";
  let [sortIndex, setSortIndex] = useState(defaultIndex);

  weapons.sort((a, b) => {
    let key = "data";

    if (!b.items[sortIndex][key]) {
      key = "value";
    }

    return b.items[sortIndex][key] - a.items[sortIndex][key];
  });

  const onSortChange = function (e) {
    setSortIndex(e.target.selectedIndex);
  };

  return (
    <div style={elementStyle}>
      <div style={titleStyle}>
        <div className="section_header">
          {title} <InfoTip text={description} />
        </div>
        <div>
          <select
            className="nav_select"
            value={sortIndex}
            onChange={onSortChange}
          >
            {sortLabels.map((item, index) => {
              return (
                <option key={index} value={index} className="nav_option">
                  {item}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <div style={wrapperStyle}>
        {weapons.map((item, index) => {
          let iconStyle = {
            backgroundImage: `url(${item.icon})`,
            width: "64px",
            height: "64px",
            flexShrink: "0",
          };
          return (
            <div style={containerStyle} key={index}>
              <div className="weapon_list_icon" style={iconStyle}></div>
              <div id="data_container" style={dataContainerStyle}>
                <div id="header_containter" style={headerStyle}>
                  <div className="list_title">{item.title}</div>
                  <div className="list_subtitle">{item.subtitle}</div>
                </div>
                <div id="values_containter" style={valuesStyle}>
                  {item.items.map((stat, i) => {
                    let align =
                      index === item.items.length - 1 ? "right" : "left";
                    return (
                      <Stat
                        value={stat.value.toLocaleString()}
                        label={stat.label}
                        align={align}
                        key={i}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div style={footerStyle}>
        <div>
          <ExportDataButton />
        </div>
      </div>
    </div>
  );
};

export default WeaponList;
