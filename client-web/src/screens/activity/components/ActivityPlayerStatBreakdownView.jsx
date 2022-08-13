import { calculateRatio } from "shared";
import { calculatePercent } from "../../../core/utils";
import Stat, { ALIGN_RIGHT } from "../../../components/StatView";

const rootStyle = {
  maxWidth: 100,
  display: "flex",
  flexDirection: "column",
  rowGap: 4,
};

const ActivityPlayerStatBreakdownView = (props) => {
  const stats = props.stats;

  const weaponKills = stats.extended.weapons.reduce((prev, cur) => {
    return prev + cur.kills;
  }, 0);

  const grenadeKills = stats.extended.grenadeKills;
  const superKills = stats.extended.superKills;
  const meleeKills = stats.extended.meleeKills;

  const totalKills = weaponKills + grenadeKills + superKills + meleeKills;

  const rowStyle = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  };

  return (
    <div style={rootStyle}>
      <div className="subsection_header underline">Breakdown</div>
      <div style={rowStyle}>
        <Stat label="weapon" value={weaponKills} title="Weapon final blows" />

        <Stat
          label="total"
          title="Percent of all final blows from weapons"
          value={`${Math.round(calculatePercent(weaponKills, totalKills))}%`}
        />
      </div>
      <div style={rowStyle}>
        <Stat label="melee" value={meleeKills} title="Melee kills" />

        <Stat
          label="total"
          align={ALIGN_RIGHT}
          title="Percent of all final blows from melees"
          value={`${Math.round(calculatePercent(meleeKills, totalKills))}%`}
        />
      </div>
      <div style={rowStyle}>
        <Stat label="grenade" value={grenadeKills} title="Grenade kills" />

        <Stat
          label="total"
          align={ALIGN_RIGHT}
          title="Percent of all final blows from grenades"
          value={`${Math.round(calculatePercent(grenadeKills, totalKills))}%`}
        />
      </div>
      <div style={rowStyle}>
        <Stat label="super" value={superKills} title="Super kills" />

        <Stat
          label="total"
          align={ALIGN_RIGHT}
          title="Percent of all final blows from supers"
          value={`${Math.round(calculatePercent(superKills, totalKills))}%`}
        />
      </div>
      <div>
        <Stat
          label="K / A"
          title="Kills to assists ratio"
          value={`${calculateRatio(totalKills, stats.assists).toFixed(2)}`}
        />
      </div>
    </div>
  );
};

export default ActivityPlayerStatBreakdownView;