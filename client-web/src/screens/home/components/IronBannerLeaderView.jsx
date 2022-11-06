import LeaderList from "../../../components/LeaderList";
import { filterLeaderMetrics } from "../../../core/utils/components";

const rootStyle = {
  display: "grid",
  gridTemplateColumns: "min-content min-content min-content",
  gap: "var(--leader-view-grid-gap)",
  flexWrap: "wrap",
};

const IronBannerLeaderView = (props) => {
  let metrics = props.metrics ? props.metrics : [];

  let winsSeason = filterLeaderMetrics(metrics, "ironBanner", "winsSeason");
  let defeatsSeason = filterLeaderMetrics(
    metrics,
    "ironBanner",
    "defeatsSeason"
  );
  let efficiencySeason = filterLeaderMetrics(
    metrics,
    "ironBanner",
    "efficiencySeason"
  );

  return (
    <div style={rootStyle}>
      <LeaderList
        title="Season Wins"
        leaderData={winsSeason}
        showTeams={false}
      />

      <LeaderList
        title="Season Kills"
        leaderData={defeatsSeason}
        showTeams={false}
      />

      <LeaderList
        title="Season Efficiency"
        leaderData={efficiencySeason}
        showTeams={false}
      />
    </div>
  );
};

export default IronBannerLeaderView;
