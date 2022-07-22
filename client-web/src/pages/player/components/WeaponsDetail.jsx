import { calculatePercent, calculateAverage } from "../../../utils/index";
import WeaponList from "./WeaponList";

const WeaponsDetail = (props) => {
  let weapons = props.weapons ? props.weapons : [];

  let description = "Weapons you have used ordered by kills.";

  weapons.sort((a, b) => {
    return b.kills - a.kills;
  });

  let data = [];
  for (const w of weapons) {
    let items = [
      {
        label: "Games",
        value: w.activityCount,
      },
      {
        label: "Kills",
        value: w.kills,
      },
      {
        label: "Kills/g",
        value: calculateAverage(w.kills, w.activityCount).toFixed(2),
      },
      {
        label: "Precision",
        value: calculatePercent(w.precisionKills, w.kills).toFixed(2) + "%",
      },
    ];

    data.push({
      title: w.item.name,
      subtitle: w.item.itemSubType.toString(),
      icon: w.item.icon,
      items: items,
    });
  }

  return (
    <WeaponList weapons={data} title="weapons" description={description} />
  );
};

export default WeaponsDetail;
