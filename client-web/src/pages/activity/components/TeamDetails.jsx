import { calculateEfficiency, calculateKillsDeathsRatio } from "shared";
import Stat, { LARGE_STYLE } from "../../player/components/Stat";

import { ReactComponent as AlphaTeamIcon } from "../../../components/images/alpha_team_logo.svg";

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
  borderBottom: "1px solid #ffffff88",
  width: "min-content",
  columnGap: 36,
  justifyContent: "center",
};

const statDetailsStyle = {
  display: "flex",
  flexDirection: "row",
};

const TeamDetails = (props) => {
  const team = props.team;

  let kills = 0;
  let assists = 0;
  let deaths = 0;
  for (const p of team.players) {
    console.log(p);
    kills += p.stats.kills;
    assists += p.stats.assists;
    deaths += p.stats.deaths;
  }

  let kd = calculateKillsDeathsRatio(kills, deaths).toFixed(2);
  let eff = calculateEfficiency(kills, deaths, assists).toFixed(2);

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
      <div style={statDetailsStyle}>
        <div>1</div>
        <div>2</div>
        <div>3</div>
        <div>4</div>
        <div>5</div>
        <div>6</div>
      </div>
    </div>
  );
};

export default TeamDetails;
