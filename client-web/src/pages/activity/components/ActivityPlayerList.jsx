import ActivityPlayerListItem from "./ActivityPlayerListItem";

const elementStyle = {
  display: "flex",
  flexDirection: "column",
  rowGap: 8,
};
const ActivityPlayerList = (props) => {
  const players = props.players;

  return (
    <div style={elementStyle}>
      {players.map((player) => {
        return <ActivityPlayerListItem player={player} />;
      })}
    </div>
  );
};

export default ActivityPlayerList;
