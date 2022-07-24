import { calculatePercent, calculateAverage } from "../../../utils/index";
import WeaponList from "./WeaponList";

const WeaponsDetail = (props) => {
  let weapons = props.weapons ? props.weapons : [];

  let description = `Top weapons in your games ordered by number of players using the weapon.

You and your fireteam's weapons are not included.`;

  weapons.sort((a, b) => {
    return b.kills - a.kills;
  });
  let data = [];
  for (const w of weapons) {
    let precision = calculatePercent(w.precisionKills, w.kills).toFixed(2);
    let items = [
      {
        label: "Players",
        value: w.count,
      },
      {
        label: "Kills",
        value: w.kills,
      },
      {
        label: "Kills/p",
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

  let sortLabels = ["players", "kills", "kills/p", "precision"];

  return (
    <WeaponList
      weapons={data}
      title="Weapon Meta"
      description={description}
      sortLabels={sortLabels}
    />
  );
};

export default WeaponsDetail;
