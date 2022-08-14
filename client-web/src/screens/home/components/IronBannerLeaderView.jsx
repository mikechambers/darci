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
  let goldMedalsSeason = filterLeaderMetrics(
    metrics,
    "ironBanner",
    "goldMedalsSeason"
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
        title="Season Gold Medals"
        leaderData={goldMedalsSeason}
        showTeams={false}
      />
    </div>
  );
};

export default IronBannerLeaderView;
