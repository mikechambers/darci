import PlayerNameView from "../../../components/PlayerNameView";

const rootStyle = {
  width: 200,
};

const entryStyle = {
  display: "grid",
  gridTemplateColumns: "180px 20px",
};

const TrialsLeaderView = (props) => {
  let leaders = props.leaders ? props.leaders : [];

  leaders = leaders.sort((a, b) => b.flawlessCount - a.flawlessCount);
  leaders = leaders.filter((a) => a.flawlessCount > 0);

  return (
    <div style={rootStyle}>
      <div className="subsection_header underline">Weekly Flawless Leaders</div>
      {leaders.map((data) => {
        return (
          <div style={entryStyle}>
            <PlayerNameView player={data.player} />
            <div className="right">{data.flawlessCount}</div>
          </div>
        );
      })}
    </div>
  );
};

export default TrialsLeaderView;
