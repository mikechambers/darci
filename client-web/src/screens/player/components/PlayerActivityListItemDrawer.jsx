import React from "react";
import { calculateRatio } from "shared";
import Icon, {
  DESTINY_LOGO,
  GRENADE_ICON,
  MELEE_ICON,
  PRECISION_ICON,
  SUPER_ICON,
} from "../../../components/Icon";
import Medal, { SMALL } from "../../../components/Medal";
import WeaponIcon from "../../../components/WeaponIcon";
import { calculatePercent } from "../../../core/utils";
import { humanDuration } from "../../../core/utils/date";
import StatView, { SMALL_STYLE } from "../../../components/StatView";
import DurationView from "../../../components/DurationView";

const GAP = 4;

let killsStyle = {
  display: "flex",
  alignItems: "flex-end",
  justifyContent: "flex-end",
};

let abilitiesContainerStyle = {
  display: "grid",
  gridTemplateColumns: "25px 25px",
  //gridTemplateRows: `repeat(3, 1fr)`,
  width: "50px",
  gridGap: `${GAP}px`,
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
  width: "120px",
  gridTemplateColumns: "50% 50%",
  alignContent: "start",
  gridGap: `${GAP}px`,
};

const killsAssistStyle = {
  gridColumnStart: "1",
  gridColumnEnd: "3",
};

const medalsContainerStyle = {
  display: "flex",
  flexWrap: "wrap",
  columnGap: "4px",
  rowGap: "4px",
  width: "100px",
  alignContent: "flex-start",
};

const dataContainerStyle = {
  display: "flex",
  justifyContent: "space-between",
};

const timePlayedStyle = {
  display: "flex",
  justifyContent: "flex-start",
};

const dataContainerWrapperStyle = {
  width: "100%",
  margin: "4px",
};

const precisionStyle = {
  display: "flex",
  alignItems: "flex-end",
  justifyContent: "flex-end",
};

const backgroundStyleBase = {
  width: "185px",

  backgroundSize: "cover",
  backgroundPosition: "center",
  borderRadius: "4px",
  margin: "4px",
  display: "flex",
  alignItems: "flex-end",
  /*filter: "saturate(50%)",*/
};

const weaponEntryStyle = {
  display: "grid",
  gridTemplateColumns: "25px 100px 15px 55px",
  gridGap: `${GAP}px`,
  width: "190px",
  alignContent: "start",
};

let detailStyleBase = {
  display: "flex",
  flexDirection: "row",

  //todo: make sure spacing is correct
  gap: `${GAP}px`,
};

const PlayerActivityListItemDrawer = (props) => {
  let activity = props.activity;

  const detailStyle = {
    ...detailStyleBase,
  };

  const backgroundStyle = {
    ...backgroundStyleBase,
    backgroundImage: `url(${activity.activity.map.image})`,
  };

  let medals = activity.stats.extended.medals.sort((a, b) => {
    return b.count - a.count;
  });

  let weapons = activity.stats.extended.weapons.sort((a, b) => {
    return b.kills - a.kills;
  });

  let totalWeaponKills = 0;

  const metaDataStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  };

  const linksStyle = {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
  };

  const siteIconStyle = {
    verticalAlign: "middle",
  };

  let activityId = activity.activity.activityId;
  let characterId = activity.player.character.characterId;

  let scoreStyle = {
    //fontWeight: "var(--bold)",
    backgroundColor: "#00000088",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    borderRadius: "0px 0px 4px 4px",
    paddingTop: "2px",
  };
  let scoreDiv =
    activity.stats.opponentTeamScore !== -1 ? (
      <div style={scoreStyle}>
        {activity.stats.teamScore} - {activity.stats.opponentTeamScore}
      </div>
    ) : (
      ""
    );

  return (
    <div className="list_item_drawer" style={detailStyle}>
      <div style={backgroundStyle}>{scoreDiv}</div>

      <div style={dataContainerWrapperStyle}>
        <div style={dataContainerStyle}>
          <div style={weaponEntryStyle} className="data_small">
            {weapons.map((weapon, index) => {
              totalWeaponKills += weapon.kills;

              return (
                <React.Fragment key={weapon.id}>
                  <div>
                    <WeaponIcon type={weapon.item.itemSubType} />
                  </div>
                  <div className="overflow">{weapon.item.name}</div>
                  <div style={killsStyle}>{weapon.kills}</div>
                  <div style={precisionStyle}>
                    {calculatePercent(weapon.precision, weapon.kills).toFixed(
                      0
                    )}
                    % &nbsp; <Icon icon={PRECISION_ICON} />
                  </div>
                </React.Fragment>
              );
            })}
          </div>
          <div style={abilitiesContainerStyle} className="data_small">
            <div style={abilitiesStyle}>
              {activity.stats.extended.meleeKills}
            </div>
            <div style={abilitiesIconStyle}>
              <Icon icon={MELEE_ICON} width="16" />
            </div>
            <div style={abilitiesStyle}>
              {activity.stats.extended.grenadeKills}
            </div>
            <div style={abilitiesIconStyle}>
              <Icon icon={GRENADE_ICON} />
            </div>
            <div style={abilitiesStyle}>
              {activity.stats.extended.superKills}
            </div>
            <div style={abilitiesIconStyle}>
              <Icon icon={SUPER_ICON} width="14" />
            </div>
          </div>
          <div style={statsContainterStyle}>
            <div>
              <StatView
                label="weapons"
                styleName={SMALL_STYLE}
                value={`${calculatePercent(
                  totalWeaponKills,
                  activity.stats.kills
                ).toFixed()}%`}
              />
            </div>
            <div>
              <StatView
                label="supers"
                value={`${calculatePercent(
                  activity.stats.extended.superKills,
                  activity.stats.kills
                ).toFixed()}%`}
                styleName={SMALL_STYLE}
              />
            </div>
            <div>
              <StatView
                label="melee"
                value={`${calculatePercent(
                  activity.stats.extended.meleeKills,
                  activity.stats.kills
                ).toFixed()}%`}
                styleName={SMALL_STYLE}
              />
            </div>
            <div>
              <StatView
                label="grenades"
                value={`${calculatePercent(
                  activity.stats.extended.grenadeKills,
                  activity.stats.kills
                ).toFixed()}%`}
                styleName={SMALL_STYLE}
              />
            </div>
            <div style={killsAssistStyle}>
              <StatView
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
            {medals.map((medal, i) => {
              if (medal.info.isGold) {
                return "";
              }

              return (
                <Medal
                  key={medal.id}
                  size={SMALL}
                  medal={medal.info}
                  count={medal.count}
                />
              );
            })}
          </div>
        </div>
        <div style={metaDataStyle}>
          <div style={timePlayedStyle} className="section_entry">
            <DurationView
              duration={activity.stats.activityDurationSeconds * 1000}
            />
          </div>
          <div style={linksStyle}>
            <a href={`https://crucible.report/pgcr/${activityId}`}>
              <img
                src="https://trials.report/assets/svg/icon.svg"
                width="12"
                alt="View game on Crucible Report"
                title="View game on Crucible Report"
                style={siteIconStyle}
              />
            </a>
            &nbsp;
            <a href={`https://destinytracker.com/destiny-2/pgcr/${activityId}`}>
              <img
                src="https://destinytracker.com/public/icons/icon192.png"
                width="18"
                alt="View game on DestinyTracker.com"
                title="View game on DestinyTracker.com"
                style={siteIconStyle}
              />
            </a>
            &nbsp;
            <a
              href={`https://www.bungie.net/en/PGCR/${activityId}?character=${characterId}`}
            >
              <Icon
                icon={DESTINY_LOGO}
                style={siteIconStyle}
                title="View game on Bungie.com"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerActivityListItemDrawer;
