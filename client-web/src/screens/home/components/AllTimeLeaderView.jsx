import LeaderList from "../../../components/LeaderList";
import { filterLeaderMetrics } from "../../../core/utils/components";

const rootStyle = {
  display: "grid",
  gridTemplateColumns: "min-content min-content min-content",
  gap: "var(--leader-view-grid-gap)",
  flexWrap: "wrap",
};

const AllTimeLeaderView = (props) => {
  const metrics = props.metrics ? props.metrics : [];

  const defeatsLifetime = filterLeaderMetrics(
    metrics,
    "crucible",
    "defeatsLifetime"
  );

  const liftimeFlawless = filterLeaderMetrics(
    metrics,
    "trials",
    "flawlessLifetime"
  );

  const lifetimeTrialsWins = filterLeaderMetrics(
    metrics,
    "trials",
    "winsLifetime"
  );

  const lifetimeTrialsKills = filterLeaderMetrics(
    metrics,
    "trials",
    "defeatsLifetime"
  );

  return (
    <div style={rootStyle}>
      <LeaderList
        title="Crucible Defeats"
        leaderData={defeatsLifetime}
        showTeams={false}
      />
      <div></div>
      <div></div>

      <LeaderList
        title="Trials Flawlesses"
        leaderData={liftimeFlawless}
        showTeams={false}
      />

      <LeaderList
        title="Trials Wins"
        leaderData={lifetimeTrialsWins}
        showTeams={false}
      />

      <LeaderList
        title="Trials Kills"
        leaderData={lifetimeTrialsKills}
        showTeams={false}
      />
    </div>
  );
};

export default AllTimeLeaderView;
