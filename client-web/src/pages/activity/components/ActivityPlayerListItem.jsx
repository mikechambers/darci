import PlayerInfoView from "./PlayerInfoView";

const ActivityPlayerListItem = (props) => {
  const player = props.player;

  return (
    <div className="list_item">
      <PlayerInfoView player={player} />
    </div>
  );
};

export default ActivityPlayerListItem;
