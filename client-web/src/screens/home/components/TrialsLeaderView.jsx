import PlayerNameView from "../../../components/PlayerNameView";

const rootStyle = {
  width: 200,
};

const entryStyle = {
  display: "grid",
  gridTemplateColumns: "180px 20px",
};

const TrialsLeaderView = (props) => {
  let metrics = props.metrics ? props.metrics : [];

  metrics = metrics.sort(
    (a, b) => b.metrics.trials.flawlessWeekly - a.metrics.trials.flawlessWeekly
  );
  metrics = metrics.filter((a) => a.metrics.trials.flawlessWeekly > 0);

  return (
    <div style={rootStyle}>
      <div className="subsection_header underline">Weekly Flawless Leaders</div>
      {metrics.map((data) => {
        return (
          <div style={entryStyle} key={data.player.memberId}>
            <PlayerNameView player={data.player} />
            <div className="right">{data.metrics.trials.flawlessWeekly}</div>
          </div>
        );
      })}
    </div>
  );
};

export default TrialsLeaderView;
