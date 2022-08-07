import EmblemIconDisplay from "./EmblemIconDisplay";
import LightLevelView from "./LightLevelView";
import PlayerNameView from "./PlayerNameView";

const elementStyle = {
  display: "flex",
  flexDirection: "row",
  columnGap: 4,
};

const detailsStyle = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-around",
  rowGap: 4,
};

const PlayerInfoView = (props) => {
  const player = props.player.player;
  const character = player.character;
  return (
    <div style={elementStyle}>
      <div>
        <EmblemIconDisplay emblem={character.emblem} />
      </div>
      <div style={detailsStyle}>
        <PlayerNameView player={player} />
        <LightLevelView level={character.lightLevel} />
      </div>
    </div>
  );
};

export default PlayerInfoView;
