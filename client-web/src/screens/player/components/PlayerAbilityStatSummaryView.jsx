import { calculatePercent } from "../../../core/utils";

import StatCollectionView from "../../../components/StatCollectionView";

const PlayerAbilityStatSummaryView = (props) => {
  let total = props.total;
  let weapons = props.weapons;
  let melees = props.melees;
  let supers = props.supers;
  let grenades = props.grenades;

  let values = [
    {
      value: calculatePercent(weapons, total).toFixed() + "%",
      label: "weapon",
    },
    {
      value: calculatePercent(melees, total).toFixed() + "%",
      label: "melee",
    },
    {
      value: calculatePercent(grenades, total).toFixed() + "%",
      label: "grenade",
    },
    {
      value: calculatePercent(supers, total).toFixed() + "%",
      label: "super",
    },
  ];

  return <StatCollectionView title="Kills Breakdown" values={values} />;
};

export default PlayerAbilityStatSummaryView;
