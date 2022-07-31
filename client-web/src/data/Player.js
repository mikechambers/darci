import { CharacterClass } from "shared";

class Player {
  memberId;
  bungieDisplayName;
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

  hasFullBungieName() {
    return this.bungieDisplayName && this.bungieDisplayNameCode;
  }

  getShortName() {
    return this.bungieDisplayName ? this.bungieDisplayName : this.displayName;
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
      displayName: data.displayName,
      platformId: data.platformId,
      characters: chars,
      character: chars[0],
    });

    return out;
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
