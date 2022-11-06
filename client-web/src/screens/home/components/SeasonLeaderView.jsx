import LeaderList from "../../../components/LeaderList";
import { filterLeaderMetrics } from "../../../core/utils/components";

const rootStyle = {
  display: "grid",
  gridTemplateColumns: "min-content min-content min-content",
  gap: "var(--leader-view-grid-gap)",
  flexWrap: "wrap",
};

const SeasonLeaderView = (props) => {
  const metrics = props.metrics ? props.metrics : [];

  const defeatsSeason = filterLeaderMetrics(
    metrics,
    "crucible",
    "defeatsSeason"
  );

  const winStreakSeason = filterLeaderMetrics(
    metrics,
    "crucible",
    "winStreakSeason"
  );
  const kdaSeason = filterLeaderMetrics(metrics, "crucible", "kdaSeason");

  const seasonTrialsWins = filterLeaderMetrics(metrics, "trials", "winsSeason");

  const seasonTrialsKills = filterLeaderMetrics(
    metrics,
    "trials",
    "defeatsSeason"
  );

  const seasonFlawless = filterLeaderMetrics(
    metrics,
    "trials",
    "flawlessSeason"
  );

  let ibWinsSeason = filterLeaderMetrics(metrics, "ironBanner", "winsSeason");
  let ibDefeatsSeason = filterLeaderMetrics(
    metrics,
    "ironBanner",
    "defeatsSeason"
  );
  let ibEfficiencySeason = filterLeaderMetrics(
    metrics,
    "ironBanner",
    "efficiencySeason"
  );

  return (
    <div style={rootStyle}>
      <LeaderList
        title="Crucible Defeats"
        leaderData={defeatsSeason}
        showTeams={false}
      />

      <LeaderList title="KDA" leaderData={kdaSeason} showTeams={false} />

      <LeaderList
        title="Crucible Win Streak"
        leaderData={winStreakSeason}
        showTeams={false}
      />

      <LeaderList
        title="Trials Flawlesses"
        leaderData={seasonFlawless}
        showTeams={false}
      />
      <LeaderList
        title="Trials Wins"
        leaderData={seasonTrialsWins}
        showTeams={false}
      />

      <LeaderList
        title="Trials Kills"
        leaderData={seasonTrialsKills}
        showTeams={false}
      />

      <LeaderList
        title="Iron Banner Wins"
        leaderData={ibWinsSeason}
        showTeams={false}
      />

      <LeaderList
        title="Iron Banner Kills"
        leaderData={ibDefeatsSeason}
        showTeams={false}
      />

      <LeaderList
        title="Iron Banner Efficiency"
        leaderData={ibEfficiencySeason}
        showTeams={false}
      />
    </div>
  );
};

export default SeasonLeaderView;
