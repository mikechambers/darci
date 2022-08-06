import WeaponIcon from "../../../components/WeaponIcon";
import ActivityWeaponList, { WEAPON_TYPE } from "./ActivityWeaponList";

const WeaponListContainer = (props) => {
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

  //aggregate weapons by all players
  //note we could skip this step since we are not using the all players
  //data right now, but keeping it here in case we want to come back to it
  /*
  const allWeaponsMap = new Map();
  for (const value of map.values()) {
    for (const [mKey, mValue] of value) {
      let item = allWeaponsMap.get(mKey);

      if (!item) {
        item = {
          id: mValue.id,
          name: mValue.name,
          icon: mValue.icon,
          kills: mValue.kills,
          count: mValue.count,
          precision: mValue.precision,
          itemSubType: mValue.itemSubType,
        };
      } else {
        item = {
          ...item,
          kills: mValue.kills + item.kills,
          count: mValue.count + item.count,
          precision: mValue.precision + item.precision,
        };
      }

      allWeaponsMap.set(mKey, item);
    }
  }*/

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

export default WeaponListContainer;
