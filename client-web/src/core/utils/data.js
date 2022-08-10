export const parseWeaponsFromServer = (weapons, manifest) => {
  let out = [];
  for (const w of weapons) {
    let item = manifest.getWeaponDefinition(w.id);
    w.item = item;
    out.push(w);
  }
  return out;
};

export const parseMedalsFromServer = (medals, manifest) => {
  let out = [];
  for (const m of medals) {
    let info = manifest.getMedalDefinition(m.id);
    m.info = info;
    out.push(m);
  }
  return out;
};
