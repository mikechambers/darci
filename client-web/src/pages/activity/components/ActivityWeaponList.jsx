import React, { useState } from "react";
import IconManager, {
  CHEVRONS_DOWN,
  CHEVRONS_UP,
  LEADERBOARD_ICON,
} from "../../../components/IconManager";
import WeaponIconManager from "../../../components/WeaponIconManager";

const elementStyle = {
  display: "flex",
  flexDirection: "column",
  borderRadius: 4,
  backgroundColor: "var(--list-item-background-color)",
  padding: 8,
  height: "min-content",
};

//16
const weaponContainerStyle = {
  display: "grid",
  gridTemplateColumns: "16px 145px 15px 10px",
  font: "var(--font-small-name)",
  columnGap: 10,
  rowGap: 6,
};

const iconStyleBase = {
  width: 16,
  height: 16,
  backgroundSize: "cover",
  borderRadius: 4,
};

const precisionStyle = {
  font: "var(--light) 12px 'Roboto', sans-serif",
  display: "flex",
  justifyContent: "flex-end",
  opacity: 0.5,
  alignItems: "center",
};

const countStyle = {
  font: "var(--light) 12px 'Roboto', sans-serif",
  display: "flex",
  opacity: 0.5,
  alignItems: "center",
  justifyContent: "flex-end",
};

const titleStyle = {
  borderBottom: "1px #ffffff66 solid",
  display: "grid",
  gridTemplateColumns: "161px 25px 10px",
  columnGap: 10,
  marginBottom: 6,
  font: "var(--font-title-name)",
};

const killsStyle = {
  display: "flex",
  opacity: 0.8,
  alignItems: "center",
  justifyContent: "flex-end",
};

const expandedDivStyle = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "flex-end",
};

const chevronStyle = {
  //hack to link up icon on right with text and overcoming
  //the padding in the svg
  marginRight: -3,
};

export const WEAPON = "WEAPON";
export const WEAPON_TYPE = "WEAPON_TYPE";

const ActivityWeaponList = (props) => {
  const title = props.title;
  let weapons = props.weapons;
  let type = props.type ? props.type : WEAPON;

  const [expanded, setExpanded] = useState(false);

  const onExpandedClick = (e) => {
    setExpanded(!expanded);
  };

  let expandedDiv = "";

  if (props.weapons.length >= 5) {
    if (!expanded) {
      expandedDiv = (
        <div
          title="Expand list"
          onClick={onExpandedClick}
          style={expandedDivStyle}
          className="link icon_link"
        >
          <IconManager icon={CHEVRONS_DOWN} width="14" style={chevronStyle} />
        </div>
      );

      weapons = weapons.slice(0, 5);
    } else {
      expandedDiv = (
        <div
          title="Collapse list"
          onClick={onExpandedClick}
          style={expandedDivStyle}
          className="link icon_link"
        >
          <IconManager icon={CHEVRONS_UP} width="14" style={chevronStyle} />
        </div>
      );
    }
  }

  return (
    <div style={elementStyle}>
      <div style={titleStyle}>
        <div>{title}</div>
        <div
          className="label_small"
          style={killsStyle}
          title="Total kills for all players"
        >
          kills
        </div>
        <div style={countStyle}>
          <IconManager
            icon={LEADERBOARD_ICON}
            width="12"
            title="Number of players using the weapon"
          />
        </div>
      </div>
      <div style={weaponContainerStyle}>
        {weapons.map((data) => {
          let iconDiv;
          if (type === WEAPON) {
            const s = {
              ...iconStyleBase,
              backgroundImage: `url(${data.icon})`,
            };
            iconDiv = <div style={s}></div>;
          } else {
            iconDiv = (
              <div>
                <WeaponIconManager type={data.itemSubType} width="16" />
              </div>
            );
          }

          return (
            <React.Fragment key={data.id}>
              {iconDiv}
              <div className="section_entry overflow">{data.name}</div>

              <div className="section_entry right">{data.kills}</div>

              <div style={countStyle}>{data.count}</div>
            </React.Fragment>
          );
        })}
      </div>
      {expandedDiv}
    </div>
  );
};

export default ActivityWeaponList;
