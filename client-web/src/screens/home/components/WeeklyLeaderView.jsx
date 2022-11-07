import LeaderList from "../../../components/LeaderList";
import { filterLeaderMetrics } from "../../../core/utils/components";

const rootStyle = {
  display: "grid",
  gridTemplateColumns: "min-content min-content min-content",
  gap: "var(--leader-view-grid-gap)",
};

const WeeklyLeaderView = (props) => {
  const metrics = props.metrics ? props.metrics : [];

  const defeatsWeekly = filterLeaderMetrics(
    metrics,
    "crucible",
    "defeatsWeekly"
  );

  const winStreakWeekly = filterLeaderMetrics(
    metrics,
    "crucible",
    "winStreakWeekly"
  );

  const weeklyFlawless = filterLeaderMetrics(
    metrics,
    "trials",
    "flawlessWeekly"
  );

  const weeklyTrialsWins = filterLeaderMetrics(metrics, "trials", "winsWeekly");

  const weeklyTrialsKills = filterLeaderMetrics(
    metrics,
    "trials",
    "defeatsWeekly"
  );

  return (
    <div style={rootStyle}>
      <LeaderList
        title="Crucible Defeats"
        leaderData={defeatsWeekly}
        showTeams={false}
      />

      <LeaderList
        title="Crucible Win Streak"
        leaderData={winStreakWeekly}
        showTeams={false}
      />
      <div></div>

      <LeaderList
        title="Trials Flawlesses"
        leaderData={weeklyFlawless}
        showTeams={false}
      />

      <LeaderList
        title="Trials Wins"
        leaderData={weeklyTrialsWins}
        showTeams={false}
      />

      <LeaderList
        title="Trials Kills"
        leaderData={weeklyTrialsKills}
        showTeams={false}
      />
    </div>
  );
};

export default WeeklyLeaderView;
