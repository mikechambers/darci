const PlayerNameView = (props) => {
  const player = props.player;

  const rootStyle = {
    display: "flex",
    flexWrap: "wrap",
  };

  return (
    <div style={rootStyle} className="player_name">
      {player.bungieDisplayName}
      <span className="player_name_code_small">
        #{player.bungieDisplayNameCode}
      </span>
    </div>
  );
};

export default PlayerNameView;
