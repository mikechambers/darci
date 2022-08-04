import { calculateEfficiency, calculateKillsDeathsRatio } from "shared";
import LeaderList from "./LeaderList";

const elementWrapperStyle = {
  display: "flex",
  flexDirection: "column",
  gap: 24,
};

const leaderRowStyle = {
  display: "flex",
  flexDirection: "columns",
  gap: 36,
};

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

  players.sort((a, b) => b.player.stats.score - a.player.stats.score);

  let scoreLeaders = players.slice(0, 3);
  scoreLeaders = scoreLeaders.map((data) => {
    return {
      player: data.player.player,
      stat: data.player.stats.score,
      teamName: data.teamName,
    };
  });

  players.sort(
    (a, b) =>
      b.player.stats.extended.precisionKills -
      a.player.stats.extended.precisionKills
  );

  let precisionLeaders = players.slice(0, 3);
  precisionLeaders = precisionLeaders.map((data) => {
    return {
      player: data.player.player,
      stat: data.player.stats.extended.precisionKills,
      teamName: data.teamName,
    };
  });

  players.sort(
    (a, b) =>
      b.player.stats.extended.totalMedals - a.player.stats.extended.totalMedals
  );

  let medalsLeaders = players.slice(0, 3);
  medalsLeaders = medalsLeaders.map((data) => {
    return {
      player: data.player.player,
      stat: data.player.stats.extended.totalMedals,
      teamName: data.teamName,
    };
  });

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
        <LeaderList title="Precision Kills" leaderData={precisionLeaders} />
        <LeaderList title="Deaths" leaderData={deathsLeaders} />
      </div>
      <div style={leaderRowStyle}>
        <LeaderList title="Score" leaderData={scoreLeaders} />
        <LeaderList title="Medals" leaderData={medalsLeaders} />
        <LeaderList title="Super Kills" leaderData={superLeaders} />
      </div>
    </div>
  );
};

export default ActivityLeaderBoard;
