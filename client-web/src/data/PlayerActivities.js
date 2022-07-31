import { Mode } from "shared";
import { calculateStats } from "../utils/activity";
import { parseMedalsFromServer, parseWeaponsFromServer } from "../utils/data";
import Player from "./Player";

class PlayerActivities {
  activities = [];
  player;

  constructor(options = {}) {
    this.activities = options.activities;
    this.player = options.player;
  }

  static fromApi(data, manifest) {
    let activities = data.activities.map((a) => {
      let out = {};

      out.player = Player.fromApi(a.player, manifest);

      out.activity = a.activity;
      out.activity.map = manifest.getActivityDefinition(a.activity.referenceId);
      let modeInfo = manifest.getActivityDefinition(
        a.activity.directorActivityHash
      );

      out.activity.modeInfo = modeInfo;
      out.activity.mode = Mode.fromId(a.activity.mode);

      out.stats = calculateStats(a.stats, out.activity.mode);

      out.stats.extended.medals = parseMedalsFromServer(
        a.stats.extended.medals,
        manifest
      );

      out.stats.extended.weapons = parseWeaponsFromServer(
        a.stats.extended.weapons,
        manifest
      );

      return out;
    });

    const player = Player.fromApi(data.player);

    return new PlayerActivities({ activities, player });
  }
}

export default PlayerActivities;
