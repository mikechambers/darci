import React, { useState } from "react";
import ExportDataButton from "../../../components/ExportDataButton";
import InfoTip from "../../../components/InfoTip";
import { FixedSizeList as List } from "react-window";
import WeaponListItem from "./WeaponListItem";

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

  let itemKey = (index, weapons) => weapons[index].id;

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
      <List
        height={488}
        width={422}
        itemData={weapons}
        itemCount={weapons.length}
        itemSize={100}
        itemKey={itemKey}
      >
        {WeaponListItem}
      </List>

      <div style={footerStyle}>
        <div>
          <ExportDataButton />
        </div>
      </div>
    </div>
  );
};

export default WeaponList;
