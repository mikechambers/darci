import { calculatePercent } from "../../../core/utils";
import StatView, {
  ALIGN_RIGHT,
  LARGE_STYLE,
} from "../../../components/StatView";
import { calculateKillsDeathsRatio, calculateEfficiency } from "shared";

const style = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  gap: "100px",
};

const PlayerHighlightsView = (props) => {
  const summary = props.summary;

  return (
    <div style={style}>
      <StatView
        styleName={LARGE_STYLE}
        label="win%"
        value={`${calculatePercent(
          summary.wins,
          summary.activityCount
        ).toFixed()}%`}
        align={ALIGN_RIGHT}
      />
      <StatView
        styleName={LARGE_STYLE}
        label="KD"
        value={calculateKillsDeathsRatio(summary.kills, summary.deaths).toFixed(
          2
        )}
        align={ALIGN_RIGHT}
      />

      <StatView
        styleName={LARGE_STYLE}
        label="EFF"
        value={calculateEfficiency(
          summary.kills,
          summary.deaths,
          summary.assists
        ).toFixed(2)}
        align={ALIGN_RIGHT}
      />
    </div>
  );
};

export default PlayerHighlightsView;
