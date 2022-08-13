import { calculateEfficiency, calculateKillsDeathsRatio } from "shared";
import Stat, { LARGE_STYLE } from "../../../components/StatView";

import { ReactComponent as AlphaTeamIcon } from "../../../components/images/alpha_team_logo.svg";
import { ReactComponent as BravoTeamIcon } from "../../../components/images/bravo_team_logo.svg";
import StatCollectionView from "../../../components/StatCollectionView";

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
  columnGap: 48,
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

const ActivityTeamSummaryView = (props) => {
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

  let teamClassName;
  let teamLogo;

  if (team.name === "Alpha") {
    teamClassName = "alpha";
    teamLogo = <AlphaTeamIcon width="60" height="60" />;
  } else {
    teamClassName = "bravo";
    teamLogo = <BravoTeamIcon width="60" height="60" />;
  }

  return (
    <div style={elementStyle}>
      <div style={teamBarStyle} className={teamClassName}></div>
      <div style={statHighlightsStyle}>
        <div>{teamLogo}</div>
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
        <StatCollectionView values={killsData} title="Kills" />
        <StatCollectionView values={assistsData} title="Assists" />
        <StatCollectionView values={opponentsDefeatedData} title="Defeats" />
        <StatCollectionView values={deathsData} title="Deaths" />
        <StatCollectionView values={meleeData} title="Melees" />
        <StatCollectionView values={grenadeData} title="Grenades" />
        <StatCollectionView values={superData} title="Supers" />
      </div>
    </div>
  );
};

export default ActivityTeamSummaryView;