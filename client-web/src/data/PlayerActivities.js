import Manifest from "./Manifest";

const { Mode } = require("shared");
const {
  parsePlayerFromServer,
  parseMedalsFromServer,
  parseWeaponsFromServer,
} = require("../utils/data");
const { calculateStats } = require("../utils/activity");

class PlayerActivities {
  #activities = [];
  #summary;
  #meta;
  #manifest;
  #player;
  #query;
  #maps;

  constructor(data, manifest) {
    this.#activities = data.activities;
    this.#summary = data.summary;
    this.#query = data.query;

    this.#summary.weaponKills = this.#summary.weapons.reduce(
      (previous, current) => previous + current.kills,
      0
    );

    //this.#player = new Player(data.player);
    this.#player = parsePlayerFromServer(data.player, manifest);

    this.#meta = data.meta;
    this.#maps = data.maps;

    //this is in case we cant load a manifest for some reason
    if (!manifest) {
      manifest = new Manifest();
    }

    this.#manifest = manifest;
    this.#update();
  }

  #update() {
    for (const a of this.#activities) {
      //a.player = new Player(a.player);
      a.player = parsePlayerFromServer(a.player, this.#manifest);

      let map = this.#manifest.getActivityDefinition(a.activity.referenceId);
      a.activity.map = map;

      let modeInfo = this.#manifest.getActivityDefinition(
        a.activity.directorActivityHash
      );
      a.activity.modeInfo = modeInfo;

      let mode = Mode.fromId(a.activity.mode);
      a.activity.mode = mode;

      a.stats = calculateStats(a.stats, mode);

      a.stats.extended.medals = parseMedalsFromServer(
        a.stats.extended.medals,
        this.#manifest
      );

      a.stats.extended.weapons = parseWeaponsFromServer(
        a.stats.extended.weapons,
        this.#manifest
      );
    }

    this.#summary.weapons = parseWeaponsFromServer(
      this.#summary.weapons,
      this.#manifest
    );

    this.#summary.medals = parseMedalsFromServer(
      this.#summary.medals,
      this.#manifest
    );

    this.#meta = parseWeaponsFromServer(this.#meta, this.#manifest);

    for (const m of this.#maps) {
      let map = this.#manifest.getActivityDefinition(m.referenceId);
      m.map = map;
    }
  }

  get totalActivities() {
    return this.#activities ? this.#activities.length() : 0;
  }

  get activities() {
    return this.#activities;
  }

  get summary() {
    return this.#summary;
  }

  get player() {
    return this.#player;
  }

  get meta() {
    return this.#meta;
  }

  get query() {
    return this.#query;
  }

  get maps() {
    return this.#maps;
  }
}

export default PlayerActivities;
