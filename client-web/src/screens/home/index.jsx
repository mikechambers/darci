import { useContext } from "react";
import LoadingAnimationView from "../../components/LoadingAnimationView";
import PageSectionView from "../../components/PageSectionView";
import ScreenNavigationView from "../../components/ScreenNavigationView";
import { GlobalContext } from "../../contexts/GlobalContext";
import { useFetchPlayerMetrics } from "../../hooks/remote";
import AllTimeLeaderView from "./components/AllTimeLeaderView";
import SeasonLeaderView from "./components/SeasonLeaderView";
import WeeklyLeaderView from "./components/WeeklyLeaderView";

const pageContainerStyle = {
  //minWidth: "720px",
	width:"100%"
};

const gappedStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "30px",
};

const HomeView = (props) => {
  const { global, dispatchGlobal } = useContext(GlobalContext);
  const players = global.players;

  const [metrics, isMetricsLoading, isMetricsError] =
    useFetchPlayerMetrics(players);

  const pageLinks = [
    {
      value: "Weekly",
      id: "weekly",
    },
    {
      value: "Season",
      id: "season",
    },
    {
      value: "All Time",
      id: "all_time",
    },
  ];

  if (isMetricsLoading) {
    return <LoadingAnimationView message="Loading leaderboard data." />;
  }

  return (
    <div id="page_nav" className="page_containter" style={pageContainerStyle}>
      <div style={gappedStyle}>
        <ScreenNavigationView links={pageLinks} />

        <PageSectionView
          id="weekly"
          title="Weekly Leaderboards"
          description="Weejkly Crucible Leaderboards."
        />
        <WeeklyLeaderView metrics={metrics} />

        <PageSectionView
          id="season"
          title="Season Leaderboards"
          description="Season Leaderboard."
        />
        <SeasonLeaderView metrics={metrics} />

        <PageSectionView
          id="all_time"
          title="All Time Leaderboards"
          description="All Time Leaderboards."
        />
        <AllTimeLeaderView metrics={metrics} />
      </div>
    </div>
  );
};

export default HomeView;
