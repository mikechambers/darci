import ActivityPlayerListItem from "./ActivityPlayerListItem";

const elementStyle = {
  display: "flex",
  flexDirection: "column",
  rowGap: 2,
};
const ActivityPlayerList = (props) => {
  const players = props.players;

  players.sort((a, b) => b.stats.score - a.stats.score);

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
