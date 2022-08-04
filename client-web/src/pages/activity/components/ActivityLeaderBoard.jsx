import LeaderList from "./LeaderList";

const ActivityLeaderBoard = (props) => {
  const teams = props.teams;

  //todo: need to test this with rumble
  let players = [];
  for (const t of teams) {
    for (const p of t.players) {
      players.push({
        player: p,
        teamName: t.name,
      });
    }
  }

  players.sort(
    (a, b) =>
      b.player.stats.opponentsDefeated - a.player.stats.opponentsDefeated
  );

  let opponentsDefeatedLeaders = players.slice(0, 3);
  opponentsDefeatedLeaders = opponentsDefeatedLeaders.map((data) => {
    return {
      player: data.player.player,
      stat: data.player.stats.opponentsDefeated,
      teamName: data.teamName,
    };
  });

  players.sort((a, b) => b.player.stats.kills - a.player.stats.kills);

  let assistsLeaders = players.slice(0, 3);
  assistsLeaders = assistsLeaders.map((data) => {
    return {
      player: data.player.player,
      stat: data.player.stats.kills,
      teamName: data.teamName,
    };
  });

  players.sort((a, b) => b.player.stats.deaths - a.player.stats.deaths);

  let deathsLeaders = players.slice(0, 3);
  deathsLeaders = deathsLeaders.map((data) => {
    return {
      player: data.player.player,
      stat: data.player.stats.deaths,
      teamName: data.teamName,
    };
  });

  return (
    <div>
      <LeaderList
        title="Opponents Defeated"
        leaderData={opponentsDefeatedLeaders}
      />
      <LeaderList title="Assists" leaderData={assistsLeaders} />
      <LeaderList title="Deaths" leaderData={deathsLeaders} />
    </div>
  );
};

export default ActivityLeaderBoard;
