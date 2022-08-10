import { calculatePercent, calculateAverage } from "../../../core/utils/index";
import WeaponList from "./WeaponList";

const WeaponsDetail = (props) => {
  let weapons = props.weapons ? props.weapons : [];

  let description = "Weapons you have used ordered by kills.";

  weapons.sort((a, b) => {
    return b.kills - a.kills;
  });

  let data = [];
  for (const w of weapons) {
    let precision = calculatePercent(w.precision, w.kills).toFixed(2);
    let items = [
      {
        label: "Games",
        value: w.count,
      },
      {
        label: "Kills",
        value: w.kills,
      },
      {
        label: "Kills/g",
        value: calculateAverage(w.kills, w.count).toFixed(2),
      },
      {
        label: "Precision",
        value: precision + "%",
        data: precision,
      },
    ];

    data.push({
      id: w.id,
      title: w.item.name,
      subtitle: w.item.itemSubType.toString(),
      icon: w.item.icon,
      items: items,
    });
  }

  let sortLabels = ["games", "kills", "kills/g", "precision"];

  return (
    <WeaponList
      weapons={data}
      title="weapons"
      description={description}
      sortLabels={sortLabels}
    />
  );
};

export default WeaponsDetail;
