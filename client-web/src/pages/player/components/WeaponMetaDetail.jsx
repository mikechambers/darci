import { calculatePercent, calculateAverage } from "../../../utils/index";
import WeaponList from "./WeaponList";

const WeaponsDetail = (props) => {
  let weapons = props.weapons ? props.weapons : [];
  let maxCount = props.max ? props.max : 5;

  let description = `Top weapons in your games ordered by number of players using the weapon.

You and your fireteam's weapons are not included.`;

  weapons.sort((a, b) => {
    return b.kills - a.kills;
  });

  let data = [];
  for (const w of weapons) {
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
    <WeaponList
      weapons={data}
      title="Weapon Meta"
      maxCount={maxCount}
      description={description}
    />
  );
};

export default WeaponsDetail;
