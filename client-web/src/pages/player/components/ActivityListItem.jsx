import { useState } from "react";
import { CompletionReason, Standing } from "shared";
import PlayerActivityDetail from "./PlayerAcitivtyDetail";
import Stat from "./Stat";

import { ReactComponent as JoinedLateIcon } from "../../../components/images/tabler/joined_late_icon.svg";
import { ReactComponent as JoinedLateLeftEarlyIcon } from "../../../components/images/tabler/joined_late_left_early_icon.svg";
import { ReactComponent as MercyIcon } from "../../../components/images/tabler/mercy_icon.svg";
import Medal, { SMALL } from "../../../components/Medal";

const resultWinStyle = {
  backgroundColor: "#3FD445",
  width: "6px",
  borderRadius: "4px 0px 0px 4px",
};

const resultLossStyle = {
  backgroundColor: "#E92626",
  width: "6px",
  borderRadius: "4px 0px 0px 4px",
};

const statsStyle = {
  //display: "flex",
  //flexDirection: "row",
  //justifyContent: "space-between",
  width: "480px",

  alignItems: "center",

  display: "grid",
  gridTemplateColumns: "repeat(6, 1fr)",
};

//todo: remove this here or in parent
const WIDTH = 735;

const gameContainerStyle = {
  display: "flex",
  flexDirection: "row",
  width: `${WIDTH}px`,
  height: "46px",
  backgroundColor: "var(--list-item-background-color)",
  border: "var(--list-item-border)",
  borderLeftWidth: "0px",
  borderRadius: "4px",
  cursor: "pointer",
};

const gameTitleStyle = {
  display: "flex",
  flexDirection: "column",
  width: "158px",
  justifyContent: "center",
  paddingLeft: "4px",
};

const gameContainerWrapper = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const statusStyleWrapper = {
  width: "35px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
};

const mercyStyle = {
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "flex-start",
};

const statusStyle = {
  display: "flex",

  alignItems: "flex-end",
};

const medalsStyle = {
  width: "60px",
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  flexWrap: "wrap",
  columnGap: "4px",
};

const rotateStyle = { transform: "rotate(180deg)" };
const ActivityListItem = (props) => {
  let activity = props.activity;
  let summary = props.summary;

  let resultStyle =
    activity.stats.standing === Standing.VICTORY
      ? resultWinStyle
      : resultLossStyle;

  let dimen = 18;
  let mercyIcon =
    activity.stats.completionReason === CompletionReason.MERCY ? (
      <MercyIcon width={dimen} height={dimen} title="Game ended in mercy" />
    ) : (
      ""
    );

  let statusIcon = "";
  if (!activity.stats.completed) {
    statusIcon = (
      <JoinedLateIcon
        style={rotateStyle}
        width={dimen}
        height={dimen}
        title="Left game before completion"
      />
    );
  }

  if (activity.stats.joinedLate) {
    statusIcon = (
      <JoinedLateIcon
        width={dimen}
        height={dimen}
        title="Joined game in progress"
      />
    );
  }

  if (!activity.stats.completed && activity.stats.joinedLate) {
    statusIcon = (
      <JoinedLateLeftEarlyIcon
        width={dimen}
        height={dimen}
        title="Joined game in progress and left before completion"
      />
    );
  }

  let gm = new Map();
  for (let m of activity.stats.extended.medals) {
    if (m.info.isGold) {
      gm.set(m.id, m);
    }
  }

  let goldMedals = Array.from(gm.values());

  if (goldMedals.length > 6) {
    goldMedals = goldMedals.slice(0, 5);
  }

  let title = "Highest Value";
  let killsHighlight = activity.stats.kills === summary.highestKills;
  let killsTitle = killsHighlight ? title : "";

  let assistsHighlight = activity.stats.assists === summary.highestAssists;
  let assistsTitle = assistsHighlight ? title : "";

  let defeatsHighlight =
    activity.stats.opponenentsDefeated === summary.highestOpponentsDefeated;
  let defeatsTitle = defeatsHighlight ? title : "";

  let deathsHighlight = activity.stats.deaths === summary.highestDeaths;
  let deathsTitle = deathsHighlight ? title : "";

  let kdHighlight =
    activity.stats.killsDeathsRatio.toFixed(2) ===
    summary.highestKillsDeathsRatio.toFixed(2);
  let kdTitle = kdHighlight ? title : "";

  let effHighlight =
    activity.stats.efficiency.toFixed(2) ===
    summary.highestEfficiency.toFixed(2);
  let effTitle = effHighlight ? title : "";

  let [isExpanded, setIsExpanded] = useState(
    props.expanded === undefined ? false : props.expanded
  );

  const onItemClick = function () {
    setIsExpanded(!isExpanded);
  };

  let detailsDiv = isExpanded ? (
    <PlayerActivityDetail width={WIDTH - 10} activity={activity} />
  ) : (
    ""
  );

  return (
    <div style={gameContainerWrapper}>
      <div style={gameContainerStyle} onClick={onItemClick}>
        <div style={resultStyle}></div>
        <div style={gameTitleStyle}>
          <div className="list_title">{activity.activity.map.name}</div>
          <div className="list_subtitle">{activity.activity.mode.label}</div>
        </div>

        <div style={statsStyle}>
          <Stat
            label="kills"
            value={activity.stats.kills}
            highlight={killsHighlight}
            title={killsTitle}
          />
          <Stat
            label="assists"
            value={activity.stats.assists}
            highlight={assistsHighlight}
            title={assistsTitle}
          />
          <Stat
            label="defeats"
            value={activity.stats.opponentsDefeated}
            highlight={defeatsHighlight}
            title={defeatsTitle}
          />
          <Stat
            label="deaths"
            value={activity.stats.deaths}
            highlight={deathsHighlight}
            title={deathsTitle}
          />
          <Stat
            label="kd"
            value={activity.stats.killsDeathsRatio.toFixed(2)}
            highlight={kdHighlight}
            title={kdTitle}
          />
          <Stat
            label="eff"
            value={activity.stats.efficiency.toFixed(2)}
            highlight={effHighlight}
            title={effTitle}
          />
        </div>

        <div style={statusStyleWrapper}>
          <div style={statusStyle}>{statusIcon}</div>
          <div style={mercyStyle}>{mercyIcon}</div>
        </div>
        <div style={medalsStyle}>
          {goldMedals.map((medal, index) => {
            let countLabel = "";
            if (medal.count > 2) {
              countLabel = `${medal.count} x `;
            }

            return (
              <Medal
                key={medal.id}
                medal={medal.info}
                count={medal.count}
                size={SMALL}
              />
            );
          })}
        </div>
      </div>
      {detailsDiv}
    </div>
  );
};

export default ActivityListItem;

/*
           <img
                key={medal.id}
                src={medal.info.icon}
                alt={medal.info.description}
                title={`${countLabel}${medal.info.name.toUpperCase()} - ${
                  medal.info.description
                }`}
                width="18"
              />
*/
