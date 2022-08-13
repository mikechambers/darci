import { calculatePercent } from "../../../core/utils";
import StatView from "../../../components/StatView";
import { calculateKillsDeathsRatio, calculateEfficiency } from "shared";
import { LARGE, RIGHT } from "../../../core/consts";

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
        styleName={LARGE}
        label="win%"
        value={`${calculatePercent(
          summary.wins,
          summary.activityCount
        ).toFixed()}%`}
        align={RIGHT}
      />
      <StatView
        styleName={LARGE}
        label="KD"
        value={calculateKillsDeathsRatio(summary.kills, summary.deaths).toFixed(
          2
        )}
        align={RIGHT}
      />

      <StatView
        styleName={LARGE}
        label="EFF"
        value={calculateEfficiency(
          summary.kills,
          summary.deaths,
          summary.assists
        ).toFixed(2)}
        align={RIGHT}
      />
    </div>
  );
};

export default PlayerHighlightsView;
