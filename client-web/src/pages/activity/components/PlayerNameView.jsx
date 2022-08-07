const nameCodeStyle = {
  font: "var(--font-player-name-code)",
};

const elementStyle = {
  font: "var(--font-player-name)",
};

const PlayerNameView = (props) => {
  const player = props.player;

  return (
    <div style={elementStyle}>
      {player.bungieDisplayName}
      <span className="bungie_name_code" style={nameCodeStyle}>
        #{player.bungieDisplayNameCode}
      </span>
    </div>
  );
};

export default PlayerNameView;
