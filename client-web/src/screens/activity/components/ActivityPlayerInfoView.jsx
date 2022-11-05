import EmblemImageView from "../../../components/EmblemImageView";
import LightLevelView from "../../../components/LightLevelView";
import PlayerNameView from "../../../components/PlayerNameView";

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

const ActivityPlayerInfoView = (props) => {
  const player = props.player.player;
  const character = player.character;
  return (
    <div style={elementStyle}>
      <div>
        <EmblemImageView emblem={character.emblem} />
      </div>
      <div style={detailsStyle} class="overflow">
        <PlayerNameView player={player} />
        <LightLevelView level={character.lightLevel} />
      </div>
    </div>
  );
};

export default ActivityPlayerInfoView;
