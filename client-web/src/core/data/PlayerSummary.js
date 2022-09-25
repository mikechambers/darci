import { AmmunitionType } from "shared";
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

    /*
    summary.weaponKills = summary.weapons.reduce(
      (previous, current) => previous + current.kills,
      0
    );
    */

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

    summary.weaponKills = 0;
    summary.specialAmmoKills = 0;
    summary.primaryAmmoKills = 0;
    summary.heavyAmmoKills = 0;
    summary.unknownAmmoKills = 0;

    for (const w of summary.weapons) {
      const kills = w.kills;
      summary.weaponKills += kills;

      switch (w.item.ammunitionType) {
        case AmmunitionType.PRIMARY: {
          summary.primaryAmmoKills += kills;
          break;
        }
        case AmmunitionType.SPECIAL: {
          summary.specialAmmoKills += kills;
          break;
        }
        case AmmunitionType.HEAVY: {
          summary.heavyAmmoKills += kills;
          break;
        }
        default: {
          summary.unknownAmmoKills += kills;
        }
      }
    }

    for (const m of maps) {
      let map = manifest.getActivityDefinition(m.referenceId);
      m.map = map;
    }

    return new PlayerSummary({ meta, summary, player, query, maps });
  }
}

export default PlayerSummary;
