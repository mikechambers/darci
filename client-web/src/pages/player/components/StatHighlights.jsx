import StatHighlight from "./StatHighlight";
import { calculatePercent } from "../../../utils";

const style = {
  display: "flex",
  flexWrap: "wrap",
};

const StatHighlights = (props) => {
  const summary = props.summary;

  return (
    <div style={style}>
      <StatHighlight
        label="win%"
        value={`${calculatePercent(
          summary.wins,
          summary.activityCount
        ).toFixed()}%`}
      />
      <StatHighlight label="KD" value={summary.killsDeathsRatio.toFixed(2)} />
      <StatHighlight label="EFF" value={summary.efficiency.toFixed(2)} />
    </div>
  );
};

export default StatHighlights;
