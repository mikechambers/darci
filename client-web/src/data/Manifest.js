const { ItemSubType } = require("shared");

const API_RESOURCE_BASE_URL = "https://www.bungie.net";
class Manifest {
  #manifestData;

  #trialsPassageIds = [];

  constructor(manifestData) {
    this.#manifestData = manifestData;

    for (const [key, value] of Object.entries(
      this.#manifestData.data.trialsPassageItemDefinitions
    )) {
      if (value.id) {
        this.#trialsPassageIds.push(value.id);
      }
    }
  }

  getWeaponDefinition(id) {
    let out = {
      name: "Unknown",
      itemType: undefined,
      itemSubType: ItemSubType.UNKNOWN,
      id: id,
      icon: "https://www.bungie.net/common/destiny2_content/icons/528d5264b28c155e1bba26afb427aba0.png",
      screenshot: undefined,
    };

    if (!this.#manifestData.data.weaponItemDefinition) {
      return out;
    }

    let d = this.#manifestData.data.weaponItemDefinition[id];

    if (!d) {
      return out;
    }

    Object.assign(out, d);

    out = {
      ...out,
      ...d,
    };

    out.itemSubType = ItemSubType.fromId(d.itemSubType);
    out.icon = createResourceUrl(d.icon);
    out.screenshot = createResourceUrl(d.screenshot);

    return out;
  }

  getActivityDefinition(id) {
    let out = {
      name: "Unknown",
      image: undefined,
      directActivityModeHash: undefined,
      id: id,
    };

    if (!this.#manifestData.data.activityDefinition) {
      return out;
    }

    let d = this.#manifestData.data.activityDefinition[id];

    if (!d) {
      return out;
    }

    Object.assign(out, d);
    out.image = createResourceUrl(d.image);

    return out;
  }

  getTrialsPassageDefinition(id) {
    let out = {
      name: "Unknown",
      description: undefined,
      icon: undefined,
      id: id,
    };

    if (!this.#manifestData.data.trialsPassageItemDefinitions) {
      return out;
    }

    let d = this.#manifestData.data.trialsPassageItemDefinitions[id];

    Object.assign(out, d);
    out.icon = createResourceUrl(d.icon);

    return !d ? out : d;
  }

  get trialsPassageIds() {
    return this.#trialsPassageIds;
  }

  getEmblemDefinition(id) {
    let out = {
      id: id,
      name: "Unknown",
      icon: undefined,
      secondaryIcon: undefined,
      secondaryOverlay: undefined,
      secondarySpecial: undefined,
    };

    if (!this.#manifestData.data.emblemDefinitions) {
      return out;
    }

    let e = this.#manifestData.data.emblemDefinitions[id];

    if (!e) {
      return out;
    }

    Object.assign(out, e);
    out.icon = createResourceUrl(e.icon);
    out.secondaryIcon = createResourceUrl(e.secondaryIcon);
    out.secondaryOverlay = createResourceUrl(e.secondaryOverlay);
    out.secondarySpecial = createResourceUrl(e.secondarySpecial);

    return out;
  }

  getModeInfo(id) {
    let out = {
      name: "Unknown",
      description: undefined,
      icon: undefined,
      image: undefined,
      id: id,
    };

    let a = this.getActivityDefinition(id);
    if (!a) {
      console.log(
        `Manifest.getModeInfo : Could not find activity definition [${id}]`
      );
      return out;
    }

    if (!this.#manifestData.data.activityModeDefinitions) {
      return out;
    }

    let m = this.#manifestData.data.activityModeDefinitions[a.activityModeHash];
    if (!m) {
      console.log(
        `Manifest.getModeInfo : Could not find activity mode definition [${a.activityModeHash}]`
      );
      return out;
    }

    Object.assign(out, m);
    out.icon = createResourceUrl(m.icon);
    out.image = createResourceUrl(m.image);

    return out;
  }

  getMedalDefinition(id) {
    let out = {
      name: "Unknown",
      description: undefined,
      icon: undefined,
      isGold: false,
      id: id,
    };

    if (!this.#manifestData.data.medalDefinitions) {
      return out;
    }

    let m = this.#manifestData.data.medalDefinitions[id];

    if (!m) {
      return out;
    }

    Object.assign(out, m);
    out.icon = createResourceUrl(m.icon);

    return out;
  }
}

const createResourceUrl = (path) => {
  if (!path) {
    return undefined;
  }

  return `${API_RESOURCE_BASE_URL}${path}`;
};

export default Manifest;
