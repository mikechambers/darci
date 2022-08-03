import Character from "./Character";

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
      chars.push(Character.fromApi(c, manifest));
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

    return json;
  }

  toString() {
    return this.getFullName();
  }
}

export default Player;
