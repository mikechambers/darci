import { calculateEfficiency, calculateKillsDeathsRatio } from "shared";
import LeaderList from "../../../components/LeaderList";

const rootStyle = {
  display: "grid",
  gridTemplateColumns: "min-content min-content min-content",
  gap: 36,
  flexWrap: "wrap",
};

const ActivityLeadersView = (props) => {
  const players = props.players;

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

  players.sort(
    (a, b) =>
      b.player.stats.extended.abilityKills -
      a.player.stats.extended.abilityKills
  );

  return (
    <div style={rootStyle}>
      {" "}
      <LeaderList
        title="Opponents Defeated"
        leaderData={opponentsDefeatedLeaders}
        showTeams={true}
      />
      <LeaderList title="KD" leaderData={killsDeathsLeaders} showTeams={true} />
      <LeaderList
        title="Efficiency"
        leaderData={efficiencyLeaders}
        showTeams={true}
      />
      <LeaderList
        title="Assists"
        leaderData={assistsLeaders}
        showTeams={true}
      />
      <LeaderList
        title="Precision Kills"
        leaderData={precisionLeaders}
        showTeams={true}
      />
      <LeaderList title="Deaths" leaderData={deathsLeaders} showTeams={true} />
      <LeaderList title="Score" leaderData={scoreLeaders} showTeams={true} />
      <LeaderList title="Medals" leaderData={medalsLeaders} showTeams={true} />
      <LeaderList
        title="Super Kills"
        leaderData={superLeaders}
        showTeams={true}
      />
    </div>
  );
};

export default ActivityLeadersView;
