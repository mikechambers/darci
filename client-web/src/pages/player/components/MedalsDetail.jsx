import ExportDataButton from "../../../components/ExportDataButton";
import InfoTip from "../../../components/InfoTip";
import { FixedSizeList as List } from "react-window";
import MedalListItem from "./MedalListItem";
import { useState } from "react";

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

const ITEM_HEIGHT = 122;
const MAX_HEIGHT = 488;
const MedalsDetail = (props) => {
  let medals = props.medals;
  let activityCount = props.activityCount;

  let [sortIndex, setSortIndex] = useState(0);

  let sortCount = (a, b) => {
    return b.count - a.count;
  };

  let sortName = (a, b) => {
    return a.info.name.localeCompare(b.info.name);
  };

  let sortGold = (a, b) => {
    if (b.info.isGold === a.info.isGold) {
      return b.count - a.count;
    }

    if (b.info.isGold && !a.info.isGold) {
      return 1;
    }

    return -1;
  };

  let sortGamesMedal = (a, b) => {
    return activityCount / b.count - activityCount / a.count;
  };

  let sort = sortGold;
  if (sortIndex === 1) {
    sort = sortCount;
  } else if (sortIndex === 2) {
    sort = sortGamesMedal;
  } else if (sortIndex === 3) {
    sort = sortName;
  }

  medals.sort(sort);

  const onSortChange = (e) => {
    setSortIndex(e.target.selectedIndex);
  };

  let itemKey = (index, data) => data.medals[index].id;

  let itemData = { activityCount: activityCount, medals: medals };
  let height = ITEM_HEIGHT * medals.length;
  if (height > MAX_HEIGHT) {
    height = MAX_HEIGHT;
  }

  return (
    <div style={elementStyle}>
      <div style={titleStyle}>
        <div>
          <select
            className="nav_select"
            defaultValue="0"
            onChange={onSortChange}
          >
            <option value="0" className="nav_option">
              gold medals
            </option>
            <option value="1" className="nav_option">
              count
            </option>
            <option value="2" className="nav_option">
              games until medal
            </option>
            <option value="3" className="nav_option">
              name
            </option>
          </select>
        </div>
      </div>
      <List
        height={height}
        width={422}
        itemData={itemData}
        itemCount={medals.length}
        itemSize={ITEM_HEIGHT}
        itemKey={itemKey}
      >
        {MedalListItem}
      </List>
    </div>
  );
};

export default MedalsDetail;
