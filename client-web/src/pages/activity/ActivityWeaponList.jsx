import React from "react";
import IconManager, {
  PLAYER_ICON,
  PRECISION_ICON,
} from "../../components/IconManager";

const ActivityWeaponList = (props) => {
  const title = props.title;
  const weapons = props.weapons;

  const elementStyle = {
    display: "flex",
    flexDirection: "column",
  };

  const weaponContainerStyle = {
    display: "grid",
    gridTemplateColumns: "16px 135px 25px 10px",
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
  const nameStyle = {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "flex",
    alignItems: "center",
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
  };

  const titleStyle = {
    borderBottom: "1px #ffffff66 solid",
    display: "grid",
    gridTemplateColumns: "161px 25px 10px",
    columnGap: 10,
    marginBottom: 6,
  };

  const killsStyle = {
    display: "flex",
    opacity: 0.8,
    alignItems: "center",
    justifyContent: "flex-end",
  };
  return (
    <div style={elementStyle}>
      <div style={titleStyle}>
        <div>{title}</div>
        <div className="label_small" style={killsStyle}>
          kills
        </div>
        <div style={countStyle}>
          <IconManager icon={PLAYER_ICON} width="12" />
        </div>
      </div>
      <div style={weaponContainerStyle}>
        {weapons.map((data) => {
          const s = {
            ...iconStyleBase,
            backgroundImage: `url(${data.weapon.icon})`,
          };
          return (
            <React.Fragment key={data.weapon.id}>
              <div style={s}></div>
              <div style={nameStyle}>{data.weapon.name}</div>

              <div className="right">{data.kills}</div>

              <div style={countStyle}>{data.count}</div>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default ActivityWeaponList;
