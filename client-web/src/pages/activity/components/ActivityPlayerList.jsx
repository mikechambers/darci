import ActivityPlayerListItem from "./ActivityPlayerListItem";

const elementStyle = {
  display: "flex",
  flexDirection: "column",
  rowGap: 2,
};
const ActivityPlayerList = (props) => {
  const players = props.players;

  return (
    <div style={elementStyle}>
      {players.map((player) => {
        return (
          <ActivityPlayerListItem
            player={player}
            key={player.player.memberId}
          />
        );
      })}
    </div>
  );
};

export default ActivityPlayerList;
