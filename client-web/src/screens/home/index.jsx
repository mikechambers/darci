import { useFetchPlayerMilestones, useFetchPlayers } from "../../hooks/remote";
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

  const [milestones, isMilestonesLoading, isMilestonesError] =
    useFetchPlayerMilestones(players);

  return (
    <div id="page_nav" className="page_containter" style={pageContainerStyle}>
      <div style={gappedStyle}>
        <TrialsLeaderView leaders={milestones} />
      </div>
    </div>
  );
};

export default HomeView;
