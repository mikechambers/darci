import React, { useState } from "react";
import { FixedSizeList as List } from "react-window";
import WeaponListItem from "./WeaponListItem";

const elementStyle = {
  //padding: "var(--page-container-padding)",
  width: "422px",
};

const footerStyle = {
  display: "flex",
  justifyContent: "space-between",
};

const titleStyle = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "flex-end",
};

const ITEM_HEIGHT = 100;
const MAX_HEIGHT = 488;
const WeaponList = (props) => {
  let weapons = props.weapons;

  let sortLabels = props.sortLabels;
  let defaultIndex = props.sortIndex ? props.sortIndex : 0;

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

  let height = ITEM_HEIGHT * weapons.length;
  if (height > MAX_HEIGHT) {
    height = MAX_HEIGHT;
  }
  return (
    <div style={elementStyle}>
      <div style={titleStyle}>
        <div>
          <select
            className="nav_select"
            value={sortIndex}
            onChange={onSortChange}
          >
            {sortLabels.map((item, index) => {
              return (
                <option key={item} value={index} className="nav_option">
                  {item}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <List
        height={height}
        width={422}
        itemData={weapons}
        itemCount={weapons.length}
        itemSize={ITEM_HEIGHT}
        itemKey={itemKey}
      >
        {WeaponListItem}
      </List>
    </div>
  );
};

export default WeaponList;
