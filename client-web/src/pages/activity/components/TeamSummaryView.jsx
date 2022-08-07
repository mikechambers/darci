import { calculateEfficiency, calculateKillsDeathsRatio } from "shared";
import Stat, { LARGE_STYLE } from "../../player/components/Stat";

import { ReactComponent as AlphaTeamIcon } from "../../../components/images/alpha_team_logo.svg";
import StatDetailBase from "../../player/components/StatDetailBase";

const teamBarStyle = {
  height: 10,
};

const elementStyle = {
  display: "flex",
  flexDirection: "column",
  rowGap: 12,
};

const statHighlightsStyle = {
  display: "flex",
  flexDirection: "row",
  width: "min-content",
  columnGap: 36,
  justifyContent: "center",
};

const statDetailsStyle = {
  display: "flex",
  flexDirection: "row",
  columnGap: 36,
};

const dividerStyle = {
  opacity: 0.5,
};

const TeamSummaryView = (props) => {
  const team = props.team;

  let playerCount = team.players.length;
  let kills = 0;
  let assists = 0;
  let deaths = 0;
  let opponentsDefeated = 0;
  let melees = 0;
  let grenades = 0;
  let superKills = 0;
  let weaponKills = 0;
  for (const p of team.players) {
    kills += p.stats.kills;
    assists += p.stats.assists;
    deaths += p.stats.deaths;
    opponentsDefeated += p.stats.opponentsDefeated;
    melees += p.stats.extended.meleeKills;
    grenades += p.stats.extended.grenadeKills;
    superKills += p.stats.extended.superKills;

    //
  }

  let kd = calculateKillsDeathsRatio(kills, deaths).toFixed(2);
  let eff = calculateEfficiency(kills, deaths, assists).toFixed(2);

  const killsData = [
    {
      value: (kills / playerCount).toFixed(2),
      label: "avg",
    },
    {
      value: kills,
      label: "total",
    },
  ];

  const assistsData = [
    {
      value: (assists / playerCount).toFixed(2),
      label: "avg",
    },
    {
      value: assists,
      label: "total",
    },
  ];

  const deathsData = [
    {
      value: (deaths / playerCount).toFixed(2),
      label: "avg",
    },
    {
      value: deaths,
      label: "total",
    },
  ];

  const opponentsDefeatedData = [
    {
      value: (opponentsDefeated / playerCount).toFixed(2),
      label: "avg",
    },
    {
      value: opponentsDefeated,
      label: "total",
    },
  ];

  const meleeData = [
    {
      value: (melees / playerCount).toFixed(2),
      label: "avg",
    },
    {
      value: melees,
      label: "total",
    },
  ];

  const grenadeData = [
    {
      value: (grenades / playerCount).toFixed(2),
      label: "avg",
    },
    {
      value: grenades,
      label: "total",
    },
  ];

  const superData = [
    {
      value: (superKills / playerCount).toFixed(2),
      label: "avg",
    },
    {
      value: superKills,
      label: "total",
    },
  ];

  return (
    <div style={elementStyle}>
      <div style={teamBarStyle} className={team.name.toLowerCase()}></div>
      <div style={statHighlightsStyle}>
        <div>
          <AlphaTeamIcon width="60" height="60" />
        </div>
        <div>
          <Stat styleName={LARGE_STYLE} label="Score" value={team.score} />
        </div>
        <div>
          <Stat styleName={LARGE_STYLE} label="KD" value={kd} />
        </div>
        <div>
          <Stat styleName={LARGE_STYLE} label="EFF" value={eff} />
        </div>
      </div>
      <div>
        <hr style={dividerStyle} />
      </div>
      <div style={statDetailsStyle}>
        <StatDetailBase values={killsData} title="Kills" />
        <StatDetailBase values={assistsData} title="Assists" />
        <StatDetailBase values={opponentsDefeatedData} title="Defeats" />
        <StatDetailBase values={deathsData} title="Deaths" />
        <StatDetailBase values={meleeData} title="Melees" />
        <StatDetailBase values={grenadeData} title="Grenades" />
        <StatDetailBase values={superData} title="Supers" />
      </div>
    </div>
  );
};

export default TeamSummaryView;
