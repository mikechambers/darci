import { CharacterClass } from "shared";

class Character {
  id;
  classType;
  lightLevel;
  emblem;

  constructor(options = {}) {
    this.id = options.id;
    this.classType = options.classType;
    this.lightLevel = options.lightLevel;
    this.emblem = options.emblem;
  }

  static fromApi(data, manifest) {
    let emblemId = data.emblem.id;
    let emblem = {
      id: emblemId,
    };

    if (manifest) {
      emblem = manifest.getEmblemDefinition(emblemId);
    }

    let character = new Character({
      id: data.characterId,
      classType: CharacterClass.fromId(data.classType),
      lightLevel: data.lightLevel,
      emblem: emblem,
    });

    return character;
  }
}

export default Character;
