const PlayerNameView = (props) => {
  const player = props.player;

  const rootStyle = {};

  return (
    <div
      style={rootStyle}
      className="player_name overflow"
      titlte={player.getFullName()}
    >
      {player.bungieDisplayName}
      <span className="player_name_code_small">
        #{player.bungieDisplayNameCode}
      </span>
    </div>
  );
};

export default PlayerNameView;
