import MedalHighlights from "./MedalHighlights";
import StatDetails from "./StatDetails";
import StatHighlights from "./StatHighlights";
import TimePlayed from "./TimePlayed";

import PlayerOverviewBackgroundImage from "../images/player_overview_background.png";

const elementStyle = {
  //padding: "var(--page-container-padding)",
  //height: "460px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-around",

  backgroundImage: `url(${PlayerOverviewBackgroundImage})`,
  backgroundRepeat: "repeat",
  borderRadius: "var(--border-radius)",
  rowGap: "36px",
  width: "min-content",
  padding: "var(--content-padding)",
};

const PlayerOverview = (props) => {
  const summary = props.summary;
  const medals = props.medals;

  return (
    <div style={elementStyle}>
      <StatHighlights summary={summary} />
      <StatDetails summary={summary} />
      <MedalHighlights medals={medals} />
      <TimePlayed seconds={summary.timePlayedSeconds} />
    </div>
  );
};

export default PlayerOverview;
