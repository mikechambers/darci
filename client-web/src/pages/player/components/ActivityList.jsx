import { CompletionReason, Standing } from "shared";
import ExportDataButton from "../../../components/ExportDataButton";
import GraphicListHeader from "../../../components/GraphicListHeader";
import JoinedLateIcon from "../../../components/JoinedLateIcon";
import JoinedLeftIcon from "../../../components/JoinedLeftIcon";
import LeftEarlyIcon from "../../../components/LeftEarlyIcon";
import MercyIcon from "../../../components/MercyIcon";

import Stat from "./Stat";

const WIDTH = 735;

const containerStyle = {
  width: `${WIDTH}px`,
  display: "flex",
  flexDirection: "column",
  padding: "var(--content-padding)",
};

const wrapperStyle = {
  display: "flex",
  flexDirection: "column",
  /*gap: "var(--list-item-gap)"*/
  gap: "2px",
};

const gameContainerStyle = {
  display: "flex",
  flexDirection: "row",
  width: `${WIDTH}px`,
  height: "46px",
  backgroundColor: "var(--list-item-background-color)",
  border: "var(--list-item-border)",
  borderLeftWidth: "0px",
};

const resultWinStyle = {
  backgroundColor: "#3FD445",
  width: "4px",
};

const resultLossStyle = {
  backgroundColor: "#E92626",
  width: "4px",
};

const gameTitleStyle = {
  display: "flex",
  flexDirection: "column",
  width: "160px",
  justifyContent: "center",
  paddingLeft: "4px",
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

const statusStyle = {
  width: "35px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
};

const medalsStyle = {
  width: "60px",
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  flexWrap: "wrap",
  columnGap: "4px",
};

const footerStyle = {
  display: "flex",
  justifyContent: "space-between",
};

const ActivityList = (props) => {
  let activities = props.activities;
  let summary = props.summary;

  let description =
    "List of most recent activities, displaying stats, highlights and game status.";

  if (props.isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={containerStyle}>
      <GraphicListHeader description={description} title="Games" />

      <div style={wrapperStyle}>
        {activities.map((game, index) => {
          let resultStyle =
            game.stats.standing === Standing.VICTORY
              ? resultWinStyle
              : resultLossStyle;

          let dimen = 10;
          let mercyIcon =
            game.stats.completionReason === CompletionReason.MERCY ? (
              <MercyIcon height={dimen} width={dimen} />
            ) : (
              ""
            );

          let statusIcon = "";
          if (!game.stats.completed) {
            statusIcon = <LeftEarlyIcon height={dimen} width={dimen} />;
          }

          if (game.stats.joinedLate) {
            statusIcon = <JoinedLateIcon height={dimen} width={dimen} />;
          }

          if (!game.stats.completed && game.stats.joinedLate) {
            statusIcon = <JoinedLeftIcon height={dimen} width={dimen} />;
          }

          let gm = new Map();
          for (let m of game.stats.extended.medals) {
            if (m.info.isGold) {
              gm.set(m.id, m.info);
            }
          }

          let goldMedals = Array.from(gm.values());

          if (goldMedals.length > 6) {
            goldMedals = goldMedals.slice(0, 5);
          }

          let title = "Highest Value";
          let killsHighlight = game.stats.kills === summary.highestKills;
          let killsTitle = killsHighlight ? title : "";

          let assistsHighlight = game.stats.assists === summary.highestAssists;
          let assistsTitle = assistsHighlight ? title : "";

          let defeatsHighlight =
            game.stats.opponenentsDefeated === summary.highestOpponentsDefeated;
          let defeatsTitle = defeatsHighlight ? title : "";

          let deathsHighlight = game.stats.deaths === summary.highestDeaths;
          let deathsTitle = deathsHighlight ? title : "";

          let kdHighlight =
            game.stats.killsDeathsRatio.toFixed(2) ===
            summary.highestKillsDeathsRatio.toFixed(2);
          let kdTitle = kdHighlight ? title : "";

          let effHighlight =
            game.stats.efficiency.toFixed(2) ===
            summary.highestEfficiency.toFixed(2);
          let effTitle = effHighlight ? title : "";

          return (
            <div style={gameContainerStyle} key={index}>
              <div style={resultStyle}></div>
              <div style={gameTitleStyle}>
                <div className="list_title">{game.activity.map.name}</div>
                <div className="list_subtitle">{game.activity.mode.label}</div>
              </div>

              <div style={statsStyle}>
                <Stat
                  label="kills"
                  value={game.stats.kills}
                  highlight={killsHighlight}
                  title={killsTitle}
                />
                <Stat
                  label="assists"
                  value={game.stats.assists}
                  highlight={assistsHighlight}
                  title={assistsTitle}
                />
                <Stat
                  label="defeats"
                  value={game.stats.opponentsDefeated}
                  highlight={defeatsHighlight}
                  title={defeatsTitle}
                />
                <Stat
                  label="deaths"
                  value={game.stats.deaths}
                  highlight={deathsHighlight}
                  title={deathsTitle}
                />
                <Stat
                  label="kd"
                  value={game.stats.killsDeathsRatio.toFixed(2)}
                  highlight={kdHighlight}
                  title={kdTitle}
                />
                <Stat
                  label="eff"
                  value={game.stats.efficiency.toFixed(2)}
                  highlight={effHighlight}
                  title={effTitle}
                />
              </div>

              <div style={statusStyle}>
                <div>{statusIcon}</div>
                <div>{mercyIcon}</div>
              </div>
              <div style={medalsStyle}>
                {goldMedals.map((medal, index) => {
                  return (
                    <img
                      key={index}
                      src={medal.icon}
                      alt={medal.description}
                      title={`${medal.name.toUpperCase()} - ${
                        medal.description
                      }`}
                      height="14"
                    />
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
      <div style={footerStyle}>
        <div>
          <ExportDataButton />
        </div>
      </div>
    </div>
  );
};

export default ActivityList;
