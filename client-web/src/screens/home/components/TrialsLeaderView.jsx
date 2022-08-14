import LeaderList from "../../../components/LeaderList";

const rootStyle = {
  display: "grid",
  gridTemplateColumns: "min-content min-content min-content",
  gap: 36,
  flexWrap: "wrap",
};

const TrialsLeaderView = (props) => {
  let metrics = props.metrics ? props.metrics : [];

  metrics = metrics.sort(
    (a, b) => b.metrics.trials.flawlessWeekly - a.metrics.trials.flawlessWeekly
  );
  metrics = metrics.filter((a) => a.metrics.trials.flawlessWeekly > 0);

  let weeklyFlawless = metrics.map((a) => {
    return {
      player: a.player,
      stat: a.metrics.trials.flawlessWeekly,
    };
  });

  let seasonFlawless = metrics.map((a) => {
    return {
      player: a.player,
      stat: a.metrics.trials.flawlessSeason,
    };
  });

  let liftimeFlawless = metrics.map((a) => {
    return {
      player: a.player,
      stat: a.metrics.trials.flawlessLifetime,
    };
  });

  let weeklyTrialsWins = metrics.map((a) => {
    return {
      player: a.player,
      stat: a.metrics.trials.winsWeekly,
    };
  });

  let seasonTrialsWins = metrics.map((a) => {
    return {
      player: a.player,
      stat: a.metrics.trials.winsSeason,
    };
  });

  let lifetimeTrialsWins = metrics.map((a) => {
    return {
      player: a.player,
      stat: a.metrics.trials.winsLifetime,
    };
  });

  let weeklyTrialsKills = metrics.map((a) => {
    return {
      player: a.player,
      stat: a.metrics.trials.killsWeekly,
    };
  });

  let seasonTrialsKills = metrics.map((a) => {
    return {
      player: a.player,
      stat: a.metrics.trials.killsSeason,
    };
  });

  let lifetimeTrialsKills = metrics.map((a) => {
    return {
      player: a.player,
      stat: a.metrics.trials.killsLifetime,
    };
  });

  return (
    <div style={rootStyle}>
      <LeaderList
        title="Weekly Flawlesses"
        leaderData={weeklyFlawless}
        showTeams={false}
      />

      <LeaderList
        title="Weekly Wins"
        leaderData={weeklyTrialsWins}
        showTeams={false}
      />

      <LeaderList
        title="Weekly Kills"
        leaderData={weeklyTrialsKills}
        showTeams={false}
      />

      <LeaderList
        title="Season Flawlesses"
        leaderData={seasonFlawless}
        showTeams={false}
      />
      <LeaderList
        title="Season Wins"
        leaderData={seasonTrialsWins}
        showTeams={false}
      />

      <LeaderList
        title="Season Kills"
        leaderData={seasonTrialsKills}
        showTeams={false}
      />
      <LeaderList
        title="Life Time Flawlesses"
        leaderData={liftimeFlawless}
        showTeams={false}
      />

      <LeaderList
        title="Life Time Wins"
        leaderData={lifetimeTrialsWins}
        showTeams={false}
      />

      <LeaderList
        title="Life Time Kills"
        leaderData={lifetimeTrialsKills}
        showTeams={false}
      />
    </div>
  );
};

export default TrialsLeaderView;
