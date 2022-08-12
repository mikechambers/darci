import MedalHighlights from "./GoldMedalSummaryView";
import StatDetails from "./PlayerStatsView";
import PlayerHighlightsView from "./PlayerHighlightsView";
import { humanDuration } from "../../../core/utils/date";

import PlayerOverviewBackgroundImage from "../images/player_overview_background.png";

const elementStyle = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-around",

  backgroundImage: `url(${PlayerOverviewBackgroundImage})`,
  backgroundRepeat: "repeat",
  borderRadius: "var(--radius-border)",
  rowGap: "36px",
  width: "min-content",
  padding: "var(--padding-content)",
};

const PlayerPerformanceSummaryView = (props) => {
  const summary = props.summary;
  const medals = props.medals;

  let timePlayed = humanDuration(summary.timePlayedSeconds * 1000);

  return (
    <div style={elementStyle}>
      <PlayerHighlightsView summary={summary} />
      <StatDetails summary={summary} />
      <MedalHighlights medals={medals} />
      <div>{timePlayed}</div>
    </div>
  );
};

export default PlayerPerformanceSummaryView;
