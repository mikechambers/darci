import React from "react";
import { calculateRatio } from "shared";
import IconManager, {
  GRENADE_ICON,
  MELEE_ICON,
  PRECISION_ICON,
  SUPER_ICON,
} from "../../../components/IconManager";
import WeaponIcon from "../../../components/WeaponIcon";
import { calculatePercent } from "../../../utils";
import { humanDuration } from "../../../utils/date";
import Stat, { SMALL_STYLE } from "./Stat";

const GAP = 4;
const PlayerActivityDetail = (props) => {
  let width = props.width;
  let activity = props.activity;

  let detailStyle = {
    width: `${width}px`,

    backgroundColor: "var(--list-item-detail-background-color)",

    border: "var(--list-item-border)",
    borderTopWidth: "0px",
    borderRadius: "0px 0px 4px 4px",

    selfAlign: "center",
    display: "flex",
    flexDirection: "row",

    //todo: make sure spacing is correct
    gap: `${GAP}px`,
  };

  let backgroundStyle = {
    width: "185px",

    backgroundImage: `url(${activity.activity.map.image})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    borderRadius: "4px",
    margin: "4px",
    /*filter: "saturate(50%)",*/
  };

  let weaponCount = activity.stats.extended.weapons
    ? activity.stats.extended.weapons.length
    : 0;

  const weaponEntryStyle = {
    display: "grid",
    gridTemplateColumns: "25px 100px 15px 55px",

    //todo: default to 0 if empty
    gridTemplateRows: `repeat(${weaponCount} 1fr)`,
    gridGap: `${GAP}px`,
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
    gridGap: `${GAP}px`,
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
    width: "140px",
    gridTemplateColumns: "50% 50%",
    gridTemplateRows: `repeat(3 1fr)`,
    alignContent: "start",
    gridGap: `${GAP}px`,
  };

  let killsAssistStyle = {
    gridColumnStart: "1",
    gridColumnEnd: "3",
  };

  let medalsContainerStyle = {
    display: "flex",
    flexWrap: "wrap",
    columnGap: "4px",
    rowGap: "4px",
    width: "100px",
    alignContent: "flex-start",
  };

  //activity.stats.meleeKills

  let dataContainerStyle = {
    display: "flex",
    justifyContent: "space-between",
  };

  let timePlayedStyle = {
    display: "flex",
    justifyContent: "flex-end",
    font: "var(--font-small)",
  };

  let dataContainerWrapperStyle = {
    width: "100%",
    margin: "4px",
  };

  let totalWeaponKills = 0;

  let medals = activity.stats.extended.medals.sort((a, b) => {
    return b.count - a.count;
  });

  let weapons = activity.stats.extended.weapons.sort((a, b) => {
    return b.kills - a.kills;
  });

  console.log(activity);

  return (
    <div className="activity_details" style={detailStyle}>
      <div style={backgroundStyle}></div>

      <div style={dataContainerWrapperStyle}>
        <div style={dataContainerStyle}>
          <div style={weaponEntryStyle}>
            {weapons.map((weapon, index) => {
              totalWeaponKills += weapon.kills;

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
                    % &nbsp; <IconManager icon={PRECISION_ICON} />
                  </div>
                </React.Fragment>
              );
            })}
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
              <Stat
                label="weapons"
                styleName={SMALL_STYLE}
                value={`${calculatePercent(
                  totalWeaponKills,
                  activity.stats.kills
                ).toFixed()}%`}
              />
            </div>
            <div>
              <Stat
                label="supers"
                value={`${calculatePercent(
                  activity.stats.extended.superKills,
                  activity.stats.kills
                ).toFixed()}%`}
                styleName={SMALL_STYLE}
              />
            </div>
            <div>
              <Stat
                label="melee"
                value={`${calculatePercent(
                  activity.stats.extended.meleeKills,
                  activity.stats.kills
                ).toFixed()}%`}
                styleName={SMALL_STYLE}
              />
            </div>
            <div>
              <Stat
                label="grenades"
                value={`${calculatePercent(
                  activity.stats.extended.grenadeKills,
                  activity.stats.kills
                ).toFixed()}%`}
                styleName={SMALL_STYLE}
              />
            </div>
            <div style={killsAssistStyle}>
              <Stat
                label="k/a"
                value={`${calculateRatio(
                  activity.stats.kills,
                  activity.stats.assists
                ).toFixed(2)}`}
                styleName={SMALL_STYLE}
              />
            </div>
          </div>
          <div style={medalsContainerStyle}>
            {medals.map((medal, index) => {
              if (medal.info.isGold) {
                return "";
              }

              let countLabel = "";
              if (medal.count) {
                countLabel = `${medal.count} x `;
              }
              return (
                <img
                  key={index}
                  src={medal.info.icon}
                  alt={medal.info.description}
                  title={`${countLabel}${medal.info.name} - ${medal.info.description}`}
                  height="14"
                />
              );
            })}
          </div>
        </div>
        <div style={timePlayedStyle}>
          {humanDuration(activity.stats.activityDurationSeconds * 1000)}
        </div>
      </div>
    </div>
  );
};

export default PlayerActivityDetail;
