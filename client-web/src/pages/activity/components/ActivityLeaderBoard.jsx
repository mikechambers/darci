import { calculateEfficiency, calculateKillsDeathsRatio } from "shared";
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

  players.sort(
    (a, b) =>
      calculateKillsDeathsRatio(b.player.stats.kills, b.player.stats.deaths) -
      calculateKillsDeathsRatio(a.player.stats.kills, a.player.stats.deaths)
  );

  let killsDeathsLeaders = players.slice(0, 3);
  killsDeathsLeaders = killsDeathsLeaders.map((data) => {
    return {
      player: data.player.player,
      stat: calculateKillsDeathsRatio(
        data.player.stats.kills,
        data.player.stats.deaths
      ).toFixed(2),
      teamName: data.teamName,
    };
  });

  players.sort(
    (a, b) =>
      calculateEfficiency(
        b.player.stats.kills,
        b.player.stats.deaths,
        b.player.stats.assists
      ) -
      calculateEfficiency(
        a.player.stats.kills,
        a.player.stats.deaths,
        b.player.stats.assists
      )
  );

  let efficiencyLeaders = players.slice(0, 3);
  efficiencyLeaders = efficiencyLeaders.map((data) => {
    return {
      player: data.player.player,
      stat: calculateEfficiency(
        data.player.stats.kills,
        data.player.stats.deaths,
        data.player.stats.assists
      ).toFixed(2),
      teamName: data.teamName,
    };
  });

  players.sort(
    (a, b) =>
      b.player.stats.extended.superKills - a.player.stats.extended.superKills
  );

  let superLeaders = players.slice(0, 3);
  superLeaders = superLeaders.map((data) => {
    return {
      player: data.player.player,
      stat: data.player.stats.extended.superKills,
      teamName: data.teamName,
    };
  });

  const elementWrapperStyle = {
    display: "flex",
    flexDirection: "column",
    gap: 24,
  };

  const leaderRowStyle = {
    display: "flex",
    flexDirection: "columns",
    gap: 24,
  };

  return (
    <div style={elementWrapperStyle}>
      <div style={leaderRowStyle}>
        {" "}
        <LeaderList
          title="Opponents Defeated"
          leaderData={opponentsDefeatedLeaders}
        />
        <LeaderList title="KD" leaderData={killsDeathsLeaders} />
        <LeaderList title="Efficiency" leaderData={efficiencyLeaders} />
      </div>
      <div style={leaderRowStyle}>
        <LeaderList title="Assists" leaderData={assistsLeaders} />
        <LeaderList title="Deaths" leaderData={deathsLeaders} />
        <LeaderList title="Super Kills" leaderData={superLeaders} />
      </div>
    </div>
  );
};

export default ActivityLeaderBoard;
