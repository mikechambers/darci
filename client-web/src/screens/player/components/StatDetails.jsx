import GamesDetail from "./GamesDetail";
import KillsStatDetail from "./KillsStatDetail";
import StatDetail from "./StatDetail";

import { calculateAverage } from "../../../core/utils";

const style = {
  display: "flex",
  flexWrap: "wrap",
  columnGap: "40px",
  backgroundColor: "rgba(0,0,0,0.1)",
  padding: "10px",
  borderRadius: "var(--radius-border)",
  width: "max-content",
  //border: "var(--border-list-item)",
  backdropFilter: "var(--blur-background)",
};

const StatDetails = (props) => {
  const summary = props.summary;

  return (
    <div style={style}>
      <GamesDetail
        wins={summary.wins}
        mercies={summary.mercies}
        activityCount={summary.activityCount}
      />

      <StatDetail
        avg={calculateAverage(summary.kills, summary.activityCount).toFixed(2)}
        total={summary.kills}
        high={summary.highestKills}
        title="Kills"
      />

      <StatDetail
        avg={calculateAverage(summary.assists, summary.activityCount).toFixed(
          2
        )}
        total={summary.assists}
        high={summary.highestAssists}
        title="Assists"
      />

      <StatDetail
        avg={calculateAverage(
          summary.opponentsDefeated,
          summary.activityCount
        ).toFixed(2)}
        total={summary.opponentsDefeated}
        high={summary.highestOpponentsDefeated}
        title="Defeats"
      />

      <StatDetail
        avg={calculateAverage(summary.deaths, summary.activityCount).toFixed(2)}
        total={summary.deaths}
        high={summary.highestDeaths}
        title="Deaths"
      />

      <KillsStatDetail
        total={summary.kills}
        weapons={summary.weaponKills}
        supers={summary.superKills}
        melees={summary.meleeKills}
      />
    </div>
  );
};

export default StatDetails;
