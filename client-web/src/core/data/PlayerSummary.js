import Manifest from "./Manifest";
import Player from "./Player";

const {
  parseMedalsFromServer,
  parseWeaponsFromServer,
} = require("../utils/data");

class PlayerSummary {
  summary;
  meta;
  player;
  query;
  maps;

  constructor(options = {}) {
    this.summary = options.summary;
    this.meta = options.meta;
    this.player = options.player;
    this.query = options.query;
    this.maps = options.maps;
  }

  static fromApi(data, manifest) {
    let summary = data.summary;
    let query = data.query;

    summary.weaponKills = summary.weapons.reduce(
      (previous, current) => previous + current.kills,
      0
    );

    let player = Player.fromApi(data.player, manifest);

    let meta = data.meta;
    let maps = data.maps;

    //this is in case we cant load a manifest for some reason
    if (!manifest) {
      manifest = new Manifest();
    }

    summary.weapons = parseWeaponsFromServer(summary.weapons, manifest);
    summary.medals = parseMedalsFromServer(summary.medals, manifest);
    meta = parseWeaponsFromServer(meta, manifest);

    for (const m of maps) {
      let map = manifest.getActivityDefinition(m.referenceId);
      m.map = map;
    }

    return new PlayerSummary({ meta, summary, player, query, maps });
  }
}

export default PlayerSummary;
