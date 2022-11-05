const PlayerNameView = (props) => {
  const player = props.player;

  const rootStyle = { width: "100%" };

  return (
    <div
      style={rootStyle}
      className="player_name overflow"
      title={player.getFullName()}
    >
      {player.bungieDisplayName}
      <span className="player_name_code_small">
        #{player.bungieDisplayNameCode}
      </span>
    </div>
  );
};

export default PlayerNameView;
