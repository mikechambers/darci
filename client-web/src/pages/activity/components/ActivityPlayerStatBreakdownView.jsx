import { calculatePercent } from "../../../utils";
import Stat from "../../player/components/Stat";

const ActivityPlayerStatBreakdownView = (props) => {
  const stats = props.stats;

  const weaponKills = stats.extended.weapons.reduce((prev, cur) => {
    return prev + cur;
  }, 0);

  const grenadeKills = stats.extended.grenadeKills;
  const superKills = stats.extended.superKills;
  const meleeKills = stats.extended.meleeKills;

  const totalKills = weaponKills + grenadeKills + superKills + meleeKills;

  return (
    <div>
      <div className="subsection_header">Breakdown</div>
    </div>
  );
};

export default ActivityPlayerStatBreakdownView;
