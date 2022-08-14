import LeaderList from "../../../components/LeaderList";
import { filterLeaderMetrics } from "../../../core/utils/components";

const rootStyle = {
  display: "grid",
  gridTemplateColumns: "min-content min-content min-content",
  gap: 36,
  flexWrap: "wrap",
};

const TrialsLeaderView = (props) => {
  let metrics = props.metrics ? props.metrics : [];

  const weeklyFlawless = filterLeaderMetrics(
    metrics,
    "trials",
    "flawlessWeekly"
  );
  const seasonFlawless = filterLeaderMetrics(
    metrics,
    "trials",
    "flawlessSeason"
  );
  const liftimeFlawless = filterLeaderMetrics(
    metrics,
    "trials",
    "flawlessLifetime"
  );
  const weeklyTrialsWins = filterLeaderMetrics(metrics, "trials", "winsWeekly");
  const seasonTrialsWins = filterLeaderMetrics(metrics, "trials", "winsSeason");
  const lifetimeTrialsWins = filterLeaderMetrics(
    metrics,
    "trials",
    "winsLifetime"
  );
  const weeklyTrialsKills = filterLeaderMetrics(
    metrics,
    "trials",
    "defeatsWeekly"
  );
  const seasonTrialsKills = filterLeaderMetrics(
    metrics,
    "trials",
    "defeatsSeason"
  );
  const lifetimeTrialsKills = filterLeaderMetrics(
    metrics,
    "trials",
    "defeatsLifetime"
  );

  return (
    <div style={rootStyle}>
      <LeaderList
        title="Weekly Flawlesses"
        leaderData={weeklyFlawless}
        showTeams={false}
      />

      <LeaderList
        title="Weekly Wins"
        leaderData={weeklyTrialsWins}
        showTeams={false}
      />

      <LeaderList
        title="Weekly Kills"
        leaderData={weeklyTrialsKills}
        showTeams={false}
      />

      <LeaderList
        title="Season Flawlesses"
        leaderData={seasonFlawless}
        showTeams={false}
      />
      <LeaderList
        title="Season Wins"
        leaderData={seasonTrialsWins}
        showTeams={false}
      />

      <LeaderList
        title="Season Kills"
        leaderData={seasonTrialsKills}
        showTeams={false}
      />
      <LeaderList
        title="Life Time Flawlesses"
        leaderData={liftimeFlawless}
        showTeams={false}
      />

      <LeaderList
        title="Life Time Wins"
        leaderData={lifetimeTrialsWins}
        showTeams={false}
      />

      <LeaderList
        title="Life Time Kills"
        leaderData={lifetimeTrialsKills}
        showTeams={false}
      />
    </div>
  );
};

export default TrialsLeaderView;
