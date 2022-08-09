const PlayerNameView = (props) => {
  const player = props.player;

  return (
    <div className="player_name">
      {player.bungieDisplayName}
      <span className="player_name_code_small">
        #{player.bungieDisplayNameCode}
      </span>
    </div>
  );
};

export default PlayerNameView;
