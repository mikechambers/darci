import ResultSummaryView from "./ResultSummaryView";
import PlayerAbilityStatSummaryView from "./PlayerAbilityStatSummaryView";
import StatSummaryView from "../../../components/StatSummaryView";

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

const PlayerStatsView = (props) => {
  const summary = props.summary;

  return (
    <div style={style}>
      <ResultSummaryView
        wins={summary.wins}
        mercies={summary.completionReasonMercy}
        activityCount={summary.activityCount}
      />

      <StatSummaryView
        avg={calculateAverage(summary.kills, summary.activityCount).toFixed(2)}
        total={summary.kills}
        high={summary.highestKills}
        title="Kills"
      />

      <StatSummaryView
        avg={calculateAverage(summary.assists, summary.activityCount).toFixed(
          2
        )}
        total={summary.assists}
        high={summary.highestAssists}
        title="Assists"
      />

      <StatSummaryView
        avg={calculateAverage(
          summary.opponentsDefeated,
          summary.activityCount
        ).toFixed(2)}
        total={summary.opponentsDefeated}
        high={summary.highestOpponentsDefeated}
        title="Defeats"
      />

      <StatSummaryView
        avg={calculateAverage(summary.deaths, summary.activityCount).toFixed(2)}
        total={summary.deaths}
        high={summary.highestDeaths}
        title="Deaths"
      />

      <PlayerAbilityStatSummaryView
        total={summary.kills}
        weapons={summary.weaponKills}
        supers={summary.superKills}
        melees={summary.meleeKills}
        grenades={summary.grenadeKills}
      />
    </div>
  );
};

export default PlayerStatsView;
