import ActivityPlayerListItem from "./ActivityPlayerListItem";

const elementStyle = {
  display: "flex",
  flexDirection: "column",
  rowGap: 2,
};
const ActivityPlayerList = (props) => {
  const players = props.players;

  let teamMap = new Map();

  //shouldnt ever have more than 3 fireteams per team
  let colors = ["#29756d", "#ff138f", "#fbf67c"];

  for (const p of players) {
    let fireteam = p.stats.fireteamId;

    if (!teamMap.has(fireteam)) {
      teamMap.set(fireteam, { color: undefined });
    } else {
      let color = teamMap.get(fireteam).color;

      if (!color) {
        teamMap.set(fireteam, { color: colors.pop() });
      }
    }
  }

  players.sort((a, b) => b.stats.score - a.stats.score);

  return (
    <div style={elementStyle}>
      {players.map((player) => {
        return (
          <ActivityPlayerListItem
            player={player}
            key={player.player.memberId}
            teamColor={teamMap.get(player.stats.fireteamId).color}
          />
        );
      })}
    </div>
  );
};

export default ActivityPlayerList;
