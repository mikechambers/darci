import ExportDataButton from "../../../components/ExportDataButton";
import InfoTip from "../../../components/InfoTip";
import { FixedSizeList as List } from "react-window";
import MedalListItem from "./MedalListItem";
import { useState } from "react";

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

const MedalsDetail = (props) => {
  let medals = props.medals;

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

  let sort = sortGold;
  if (sortIndex === 1) {
    sort = sortCount;
  } else if (sortIndex === 2) {
    sort = sortName;
  }

  medals.sort(sort);

  const onSortChange = (e) => {
    setSortIndex(e.target.selectedIndex);
  };

  let itemKey = (index, medals) => medals[index].id;

  return (
    <div style={elementStyle}>
      <div style={titleStyle}>
        <div className="section_header">
          Medals <InfoTip text="Medals" />
        </div>
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
              name
            </option>
          </select>
        </div>
      </div>
      <List
        height={488}
        width={422}
        itemData={medals}
        itemCount={medals.length}
        itemSize={100}
        itemKey={itemKey}
      >
        {MedalListItem}
      </List>

      <div style={footerStyle}>
        <div>
          <ExportDataButton />
        </div>
      </div>
    </div>
  );
};

export default MedalsDetail;
