import React from "react";
import IconManager, {
  GRENADE_ICON,
  MELEE_ICON,
  PRECISION_ICON,
  SUPER_ICON,
} from "../../../components/IconManager";
import WeaponIcon from "../../../components/WeaponIcon";
import { calculatePercent } from "../../../utils";
import Stat, { SMALL_STYLE } from "./Stat";

const PlayerActivityDetail = (props) => {
  let width = props.width;
  let activity = props.activity;

  let detailStyle = {
    width: `${width}px`,

    backgroundColor: "var(--list-item-background-color)",
    border: "var(--list-item-border)",
    borderTopWidth: "0px",
    selfAlign: "center",
    display: "flex",
    flexDirection: "row",

    //todo: make sure spacing is correct
    gap: "4px",
  };

  let backgroundStyle = {
    width: "185px",

    backgroundImage: `url(${activity.activity.map.image})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    /*filter: "saturate(50%)",*/
  };

  let weaponCount = activity.stats.extended.weapons
    ? activity.stats.extended.weapons.length
    : 0;
  const weaponEntryStyle = {
    display: "grid",
    gridTemplateColumns: "25px 105px 20px 40px",

    //todo: default to 0 if empty
    gridTemplateRows: `repeat(${weaponCount + 1} 1fr)`,
    gridGap: "2px",
    font: "var(--font-data-small)",
    width: "190px",
    alignContent: "start",
  };

  let precisionStyle = {
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "flex-end",
  };
  let precisionStyleLabel = {
    ...precisionStyle,
    opacity: ".5",
  };

  let killsStyle = {
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "flex-end",
  };

  let abilitiesContainerStyle = {
    display: "grid",
    gridTemplateColumns: "25px 25px",
    gridTemplateRows: `repeat(3, fr)`,
    width: "50px",
    gridGap: "2px",
    font: "var(--font-data-small)",
    alignContent: "start",
  };

  let abilitiesStyle = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  };

  let abilitiesIconStyle = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  };

  let statsContainterStyle = {
    display: "grid",
    width: "150px",
    gridTemplateColumns: "50% 50%",
    gridTemplateRows: `repeat(3 1fr)`,
    alignContent: "start",
  };

  let killsAssistStyle = {
    gridColumnStart: "1",
    gridColumnEnd: "3",
  };

  let medalsContainerStyle = {
    display: "flex",
    flexWrap: "wrap",
  };

  console.log(activity.stats.extended);

  let dataContainerStyle = {
    display: "flex",
    justifyContent: "space-between",
  };

  let timePlayedStyle = {
    display: "flex",
    justifyContent: "flex-end",
  };

  let dataContainerWrapperStyle = {
    width: "100%",
  };
  return (
    <div className="activity_details" style={detailStyle}>
      <div style={backgroundStyle}></div>

      <div style={dataContainerWrapperStyle}>
        <div style={dataContainerStyle}>
          <div style={weaponEntryStyle}>
            {activity.stats.extended.weapons.map((weapon, index) => {
              return (
                <React.Fragment>
                  <div>
                    <WeaponIcon itemSubType={weapon.item.itemSubType} />
                  </div>
                  <div className="overflow">{weapon.item.name}</div>
                  <div style={killsStyle}>{weapon.kills}</div>
                  <div style={precisionStyle}>
                    {calculatePercent(
                      weapon.precisionKills,
                      weapon.kills
                    ).toFixed(0)}
                    %
                  </div>
                </React.Fragment>
              );
            })}
            <div></div>
            <div></div>
            <div style={killsStyle} className="label_small">
              kills
            </div>
            <div style={precisionStyleLabel}>
              <IconManager icon={PRECISION_ICON} />
            </div>
          </div>
          <div style={abilitiesContainerStyle}>
            <div style={abilitiesStyle}>
              {activity.stats.extended.meleeKills}
            </div>
            <div style={abilitiesIconStyle}>
              <IconManager icon={MELEE_ICON} width="16" />
            </div>
            <div style={abilitiesStyle}>
              {activity.stats.extended.grenadeKills}
            </div>
            <div style={abilitiesIconStyle}>
              <IconManager icon={GRENADE_ICON} />
            </div>
            <div style={abilitiesStyle}>
              {activity.stats.extended.superKills}
            </div>
            <div style={abilitiesIconStyle}>
              <IconManager icon={SUPER_ICON} width="14" />
            </div>
          </div>
          <div style={statsContainterStyle}>
            <div>
              <Stat label="weapons" value="0" styleName={SMALL_STYLE} />
            </div>
            <div>
              <Stat label="supers" value="0" styleName={SMALL_STYLE} />
            </div>
            <div>
              <Stat label="melee" value="0" styleName={SMALL_STYLE} />
            </div>
            <div>
              <Stat label="grenades" value="0" styleName={SMALL_STYLE} />
            </div>
            <div style={killsAssistStyle}>
              <Stat label="kills/assists" value="0" styleName={SMALL_STYLE} />
            </div>
          </div>
          <div style={medalsContainerStyle}>
            {activity.stats.extended.medals.map((medal, index) => {
              if (medal.info.isGold) {
                return "";
              }
              return (
                <img
                  key={index}
                  src={medal.info.icon}
                  alt={medal.info.description}
                  title={`${medal.info.name} - ${medal.info.description}`}
                  height="14"
                />
              );
            })}
          </div>
        </div>
        <div style={timePlayedStyle}>hi</div>
      </div>
    </div>
  );
};

export default PlayerActivityDetail;
