import PlayerNameView from "./PlayerNameView";

const rootStyle = {
  padding: "2px 4px",
  borderRadius: 4,
  display: "flex",
  alignItems: "flex-start",
  columnGap: 4,
};

const ActivityPlayerEffectivenessTooltip = (props) => {
  const data = props.data;
  const color = props.color;

  const player = data.player;
  const deaths = data.y;
  const kills = data.x;
  const eff = data.z;

  let colorStyle = {
    backgroundColor: color,
  };

  return (
    <div className="nivo_tooltip" style={rootStyle}>
      <div style={colorStyle} className="tooltip_color_swatch"></div>
      <div>
        <PlayerNameView player={player} />
        <div>
          <div className="label_small label_dark">KILLS : {kills}</div>
          <div className="label_small label_dark">DEATHS : {deaths}</div>
          <div className="label_small label_dark">EFF : {eff.toFixed(2)}</div>
        </div>
      </div>
    </div>
  );
};

export default ActivityPlayerEffectivenessTooltip;
