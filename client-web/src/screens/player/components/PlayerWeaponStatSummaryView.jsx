import { calculatePercent } from "../../../core/utils";

import StatCollectionView from "../../../components/StatCollectionView";

const PlayerWeaponStatSummaryView = (props) => {
  let total = props.total;
  let primary = props.primary;
  let secondary = props.secondary;
  let heavy = props.heavy;

  let values = [
    {
      value: calculatePercent(primary, total).toFixed() + "%",
      label: "primary",
    },
    {
      value: calculatePercent(secondary, total).toFixed() + "%",
      label: "secondary",
    },
    {
      value: calculatePercent(heavy, total).toFixed() + "%",
      label: "heavy",
    },
  ];

  return <StatCollectionView title="Weapon Kills" values={values} />;
};

export default PlayerWeaponStatSummaryView;
