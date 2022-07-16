import { calculatePercent } from "../../../utils";

import StatDetailBase from "./StatDetailBase";

const KillsStatDetail = (props) => {
  let total = props.total;
  let weapons = props.weapons;
  let melees = props.melees;
  let supers = props.supers;

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
      value: calculatePercent(supers, total).toFixed() + "%",
      label: "super",
    },
  ];

  return <StatDetailBase title="Kills Breakdown" values={values} />;
};

export default KillsStatDetail;
