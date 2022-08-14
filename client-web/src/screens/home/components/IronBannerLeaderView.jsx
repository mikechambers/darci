import LeaderList from "../../../components/LeaderList";
import { filterLeaderMetrics } from "../../../core/utils/components";

const rootStyle = {
  display: "grid",
  gridTemplateColumns: "min-content min-content min-content",
  gap: 36,
  flexWrap: "wrap",
};

const IronBannerLeaderView = (props) => {
  let metrics = props.metrics ? props.metrics : [];

  let winsSeason = filterLeaderMetrics(metrics, "ironBanner", "winsSeason");
  let killsSeason = filterLeaderMetrics(metrics, "ironBanner", "killsSeason");
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
        leaderData={killsSeason}
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
