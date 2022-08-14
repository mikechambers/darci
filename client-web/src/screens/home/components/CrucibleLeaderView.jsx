import LeaderList from "../../../components/LeaderList";
import { filterLeaderMetrics } from "../../../core/utils/components";

const rootStyle = {
  display: "grid",
  gridTemplateColumns: "min-content min-content",
  gap: 36,
  flexWrap: "wrap",
};

const CrucibleLeaderView = (props) => {
  const metrics = props.metrics ? props.metrics : [];

  const defeatsWeekly = filterLeaderMetrics(
    metrics,
    "crucible",
    "defeatsWeekly"
  );
  const defeatsSeason = filterLeaderMetrics(
    metrics,
    "crucible",
    "defeatsSeason"
  );
  const defeatsLifetime = filterLeaderMetrics(
    metrics,
    "crucible",
    "defeatsLifetime"
  );

  const winStreakWeekly = filterLeaderMetrics(
    metrics,
    "crucible",
    "winStreakWeekly"
  );
  const winStreakSeason = filterLeaderMetrics(
    metrics,
    "crucible",
    "winStreakSeason"
  );
  const kdaSeason = filterLeaderMetrics(metrics, "crucible", "kdaSeason");

  return (
    <div style={rootStyle}>
      <LeaderList
        title="Weekly Defeats"
        leaderData={defeatsWeekly}
        showTeams={false}
      />

      <LeaderList
        title="Weekly Win Streak"
        leaderData={winStreakWeekly}
        showTeams={false}
      />

      <LeaderList
        title="Season Defeats"
        leaderData={defeatsSeason}
        showTeams={false}
      />

      <LeaderList
        title="Season Win Streak"
        leaderData={winStreakSeason}
        showTeams={false}
      />

      <LeaderList
        title="Lifetime Defeats"
        leaderData={defeatsLifetime}
        showTeams={false}
      />

      <LeaderList
        title="Season Efficiency"
        leaderData={kdaSeason}
        showTeams={false}
      />
    </div>
  );
};

export default CrucibleLeaderView;
