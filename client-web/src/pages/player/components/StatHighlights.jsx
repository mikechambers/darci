import { calculatePercent } from "../../../utils";
import Stat, { ALIGN_RIGHT, LARGE_STYLE } from "./Stat";

const style = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  gap: "100px",
};

const StatHighlights = (props) => {
  const summary = props.summary;

  return (
    <div style={style}>
      <Stat
        styleName={LARGE_STYLE}
        label="win%"
        value={`${calculatePercent(
          summary.wins,
          summary.activityCount
        ).toFixed()}%`}
        align={ALIGN_RIGHT}
      />
      <Stat
        styleName={LARGE_STYLE}
        label="KD"
        value={summary.killsDeathsRatio.toFixed(2)}
        align={ALIGN_RIGHT}
      />
      <Stat
        styleName={LARGE_STYLE}
        label="EFF"
        value={summary.efficiency.toFixed(2)}
        align={ALIGN_RIGHT}
      />
    </div>
  );
};

export default StatHighlights;
