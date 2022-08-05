import WeaponList from "../player/components/WeaponList";
import ActivityWeaponList from "./ActivityWeaponList";

const WeaponListContainer = (props) => {
  let teams = props.teams;

  let map = new Map();
  for (const t of teams) {
    let weaponMap = new Map();
    for (const p of t.players) {
      for (const w of p.stats.extended.weapons) {
        let id = w.id;
        let item = weaponMap.get(id);

        if (!item) {
          item = {
            weapon: w.item,
            count: 1,
            kills: w.kills,
            precision: w.precision,
          };
        } else {
          item.count++;
          item.kils += w.kills;
          item.precision += w.precision;
        }

        weaponMap.set(id, item);
      }
    }
    map.set(t.name, weaponMap);
  }

  const allWeaponsMap = new Map();
  for (const [key, value] of map) {
    for (const [mKey, mValue] of value) {
      let item = allWeaponsMap.get(mKey);

      if (!item) {
        item = { ...mValue };
      } else {
        item = {
          ...mValue,
          kills: mValue.kills + item.kills,
          count: mValue.count + item.count,
          precision: mValue.precision + item.precision,
        };
      }

      allWeaponsMap.set(mKey, item);
    }
  }

  const elementStyle = {
    display: "flex",
    flexDirection: "row",
    columnGap: 24,
  };

  const sort = (a, b) => {
    return b.kills - a.kills;
  };

  let alphaWeapons = Array.from(map.get("Alpha").values()).sort(sort);
  let bravoWeapons = Array.from(map.get("Bravo").values()).sort(sort);
  let allWeapons = Array.from(allWeaponsMap.values()).sort(sort);

  return (
    <div style={elementStyle}>
      <ActivityWeaponList weapons={allWeapons} title="All Players" />
      <ActivityWeaponList weapons={alphaWeapons} title="Alpha Team" />
      <ActivityWeaponList weapons={bravoWeapons} title="Bravo Team" />
    </div>
  );
};

export default WeaponListContainer;
