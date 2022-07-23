import React from "react";
import { calculatePercent } from "../../../utils";

const PlayerActivityDetail = (props) => {
  let width = props.width;
  let activity = props.activity;

  let detailStyle = {
    width: `${width}px`,
    height: "100px",
    backgroundColor: "var(--list-item-background-color)",
    border: "var(--list-item-border)",
    borderTopWidth: "0px",
    selfAlign: "center",
    display: "flex",
    flexDirection: "row",

    //todo: make sure spacing is correct
    gap: "8px",
  };

  let backgroundStyle = {
    width: "185px",
    height: "100%",
    backgroundImage: `url(${activity.activity.map.image})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    /*filter: "saturate(50%)",*/
  };

  const weaponsStyle = {
    width: "210px",
  };

  let weaponCount = activity.stats.extended.weapons
    ? activity.stats.extended.weapons.length
    : 0;
  const weaponEntryStyle = {
    display: "grid",
    gridTemplateColumns: "5% 70% 10% 10% 5%",

    //todo: default to 0 if empty
    gridTemplateRows: `repeat(${weaponCount} 1fr)`,
    gridRowGap: "5px",
    font: "var(--font-data-small)",
  };

  return (
    <div className="activity_details" style={detailStyle}>
      <div style={backgroundStyle}></div>
      <div style={weaponsStyle}>
        <div style={weaponEntryStyle}>
          {activity.stats.extended.weapons.map((weapon, index) => {
            return (
              <React.Fragment>
                <div>0</div>
                <div>{weapon.item.name}</div>
                <div>{weapon.kills}</div>
                <div>{calculatePercent(weapon.precision / weapon.kills)}</div>
                <div>0</div>
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PlayerActivityDetail;
