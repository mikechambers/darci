import { calculatePercent, calculateAverage } from "../../../core/utils/index";
import PlayerWeaponsDetailList from "./PlayerWeaponsDetailList";

export const WEAPONS_DETAIL_GAME = "WEAPONS_DETAIL_GAME";
export const WEAPONS_DETAIL_PLAYER = "WEAPONS_DETAIL_PLAYER";

const PlayerWeaponsDetailView = (props) => {
  let weapons = props.weapons ? props.weapons : [];
  let type = props.type ? props.type : WEAPONS_DETAIL_GAME;

  let [typeLabel, typeAbr] =
    type === WEAPONS_DETAIL_GAME ? ["Games", "g"] : ["Players", "p"];

  let description = "Weapons you have used ordered by kills.";

  weapons.sort((a, b) => {
    return b.kills - a.kills;
  });

  let data = [];
  for (const w of weapons) {
    let precision = calculatePercent(w.precision, w.kills).toFixed(2);
    let items = [
      {
        label: typeLabel,
        value: w.count,
      },
      {
        label: "Kills",
        value: w.kills,
      },
      {
        label: `Kills/${typeAbr}`,
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

  let sortLabels = [
    typeLabel.toLocaleLowerCase(),
    "kills",
    `kills/${typeAbr}`,
    "precision",
  ];

  return (
    <PlayerWeaponsDetailList
      weapons={data}
      title="weapons"
      description={description}
      sortLabels={sortLabels}
    />
  );
};

export default PlayerWeaponsDetailView;
