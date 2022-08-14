import PageSectionView from "../../components/PageSectionView";
import ScreenNavigationView from "../../components/ScreenNavigationView";
import { useFetchPlayerMetrics, useFetchPlayers } from "../../hooks/remote";
import CrucibleLeaderView from "./components/CrucibleLeaderView";
import IronBannerLeaderView from "./components/IronBannerLeaderView";
import TrialsLeaderView from "./components/TrialsLeaderView";

const pageContainerStyle = {
  minWidth: "720px",
};

const gappedStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "30px",
};

const HomeView = (props) => {
  //GET https://www.bungie.net/Platform/Destiny2/1/Profile/4611686018429783292/?components=1100
  const [players, isPlayersLoading, isPlayersError] = useFetchPlayers();

  const [metrics, isMetricsLoading, isMetricsError] =
    useFetchPlayerMetrics(players);

  const pageLinks = [
    {
      value: "Crucible",
      id: "crucible",
    },
    {
      value: "Trials",
      id: "trials",
    },
    {
      value: "Iron Banner",
      id: "iron_banner",
    },
  ];

  return (
    <div id="page_nav" className="page_containter" style={pageContainerStyle}>
      <div style={gappedStyle}>
        <ScreenNavigationView links={pageLinks} />

        <PageSectionView
          id="crucible"
          title="Crucible Leaderboards"
          description="Crucible Leaderboards."
        />
        <CrucibleLeaderView metrics={metrics} />

        <PageSectionView
          id="trials"
          title="Trials of Osiris Leaderboards"
          description="Trials of Osiris Leaderboard."
        />
        <TrialsLeaderView metrics={metrics} />

        <PageSectionView
          id="iron_banner"
          title="Iron Banner Leaderboards"
          description="Iron Banner Leaderboards."
        />
        <IronBannerLeaderView metrics={metrics} />
      </div>
    </div>
  );
};

export default HomeView;
