import ActivityWeaponList, { WEAPON_TYPE } from "./ActivityWeaponList";

const ActivityWeaponsView = (props) => {
  let teams = props.teams;

  //aggregate weapons by team
  let map = new Map();
  for (const t of teams) {
    let weaponMap = new Map();
    for (const p of t.players) {
      for (const w of p.stats.extended.weapons) {
        let id = w.id;
        let item = weaponMap.get(id);
        if (!item) {
          item = {
            id: w.item.id,
            name: w.item.name,
            icon: w.item.icon,
            count: 1,
            kills: w.kills,
            precision: w.precision,
            itemSubType: w.item.itemSubType,
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

  let allWeapons = [];

  //combine all team players into a single list
  for (const value of map.values()) {
    allWeapons = allWeapons.concat(Array.from(value.values()));
  }

  //aggregate by weapon type
  const allWeaponTypesMap = new Map();
  for (const value of allWeapons) {
    let id = value.itemSubType.id;
    let item = allWeaponTypesMap.get(id);

    if (!item) {
      item = {
        id: id,
        name: value.itemSubType.label,
        kills: value.kills,
        count: value.count,
        precision: value.precision,
        itemSubType: value.itemSubType,
      };
    } else {
      item = {
        ...item,
        kills: value.kills + item.kills,
        count: value.count + item.count,
        precision: value.precision + item.precision,
      };
    }

    allWeaponTypesMap.set(id, item);
  }

  const elementStyle = {
    display: "flex",
    flexDirection: "row",
    columnGap: 12,
  };

  const sort = (a, b) => {
    return b.kills - a.kills;
  };

  let alphaWeapons = Array.from(map.get("Alpha").values()).sort(sort);
  let bravoWeapons = Array.from(map.get("Bravo").values()).sort(sort);
  //let allWeapons = Array.from(allWeaponsMap.values()).sort(sort);
  let allWeaponTypes = Array.from(allWeaponTypesMap.values()).sort(sort);

  return (
    <div style={elementStyle}>
      <ActivityWeaponList
        weapons={allWeaponTypes}
        title="Weapon Types"
        type={WEAPON_TYPE}
      />
      <ActivityWeaponList weapons={alphaWeapons} title="Alpha Team" />
      <ActivityWeaponList weapons={bravoWeapons} title="Bravo Team" />
    </div>
  );
};

export default ActivityWeaponsView;