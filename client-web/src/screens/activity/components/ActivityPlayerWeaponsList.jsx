import React from "react";
import IconManager, { PRECISION_ICON } from "../../../components/IconManager";
import { SMALL } from "../../../components/Medal";
import WeaponIconManager from "../../../components/WeaponIconManager";
import WeaponImage from "./WeaponImage";
import { calculatePercent } from "../../../core/utils";

const rootStyle = {
  width: 365,
  display: "flex",
  flexDirection: "column",
  rowGap: 4,
};

const headerStyle = {
  display: "grid",
  gridTemplateColumns: "244px 35px 35px 39px",
  alignItems: "end",
  columnGap: 4,
};

const weaponEntryStyle = {
  display: "grid",
  gridTemplateColumns: "16px 180px 40px 35px 35px 39px",
  rowGap: 1,
  columnGap: 4,
};

const iconStyle = {
  display: "flex",
  alignItems: "flex-end",
  justifyContent: "flex-end",
  marginBottom: 1,
};

const weaponIconStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const ActivityPlayerWeaponsList = (props) => {
  const weapons = props.weapons;

  weapons.sort((a, b) => b.kills - a.kills);

  return (
    <div style={rootStyle}>
      <div style={headerStyle} className="subsection_header underline">
        <div className="subsection_header">Weapons</div>
        <div className="label_small right">kills</div>
        <div className="label_icon" style={iconStyle}>
          <IconManager width="10" icon={PRECISION_ICON} />
        </div>
        <div>&nbsp;</div>
      </div>

      {weapons.map((weapon) => {
        return (
          <div style={weaponEntryStyle} key={weapon.id}>
            <div key={weapon.id}>
              <WeaponImage weapon={weapon} size={SMALL} />
            </div>
            <div className="section_entry overflow">{weapon.item.name}</div>
            <div style={weaponIconStyle}>
              <WeaponIconManager type={weapon.item.itemSubType} />
            </div>
            <div className="right section_entry">{weapon.kills}</div>
            <div className="right section_entry">{weapon.precision}</div>
            <div className="right section_entry">
              {Math.round(calculatePercent(weapon.precision, weapon.kills))}%
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ActivityPlayerWeaponsList;
