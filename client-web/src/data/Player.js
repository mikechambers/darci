import { CharacterClass } from "shared";

class Player {
  memberId;
  bungieDisplayNameCode;
  platformId;
  characters;
  character;

  constructor(options = {}) {
    this.memberId = options.memberId;
    this.bungieDisplayName = options.bungieDisplayName;
    this.bungieDisplayNameCode = options.bungieDisplayNameCode;
    this.platformId = options.platformId;
    this.characters = options.characters;
    this.character = options.character;
  }

  getFullName() {
    return `${this.bungieDisplayName}#${this.bungieDisplayNameCode}`;
  }

  static fromApi(data, manifest) {
    let chars = [];
    for (const c of data.characters) {
      chars.push(parseCharacterFromServer(c, manifest));
    }

    let out = new Player({
      memberId: data.memberId,
      bungieDisplayName: data.bungieDisplayName,
      bungieDisplayNameCode: data.bungieDisplayNameCode,
      platformId: data.platformId,
      characters: chars,
      character: chars[0],
    });

    return out;
  }

  static fromJson(json) {
    if (!json) {
      return;
    }

    let options = JSON.parse(json);

    let out = new Player({
      memberId: options.memberId,
      bungieDisplayName: options.bungieDisplayName,
      bungieDisplayNameCode: options.bungieDisplayNameCode,
      platformId: options.platformId,
      characters: options,
    });

    return out;
  }

  toJson() {
    let out = {
      memberId: this.memberId,
      bungieDisplayName: this.bungieDisplayName,
      bungieDisplayNameCode: this.bungieDisplayNameCode,
      platformId: this.platformId,
    };

    let json = JSON.stringify(out);
    console.log(json);

    return json;
  }

  toString() {
    return this.getFullName();
  }
}

export default Player;

const parseCharacterFromServer = (data, manifest) => {
  let emblem = {
    id: data.emblemHash,
  };

  if (manifest) {
    emblem = manifest.getEmblemDefinition(data.emblemHash);
  }

  let character = {
    characterId: data.characterId,
    classType: CharacterClass.fromId(data.classType),
    lightLevel: data.lightLevel,
    emblem: emblem,
  };

  return character;
};
