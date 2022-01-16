const { CharacterClass } = require("shared");

export const parseWeaponsFromServer = (weapons, manifest) => {
    let out = [];
    for (const w of weapons) {
        let item = manifest.getWeaponDefinition(w.id);
        w.item = item;
        out.push(w);
    }
    return out;
}

export const parseMedalsFromServer = (medals, manifest) => {
    let out = [];
    for (const m of medals) {
        let info = manifest.getMedalDefinition(m.id);
        m.info = info;
        out.push(m);
    }
    return out;
}

export const parseCharacterFromServer = (data, manifest) => {

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
}

const hasFullBungieName = function () {
    return this.bungieDisplayName && this.bungieDisplayNameCode;
}

const getShortName = function () {
    return (this.bungieDisplayName) ? this.bungieDisplayName : this.displayName;
}

export const parsePlayerFromServer = (data, manifest) => {

    let chars = [];
    for (const c of data.characters) {
        chars.push(parseCharacterFromServer(c, manifest));
    }

    let out = {
        memberId: data.memberId,
        bungieDisplayName: data.bungieDisplayName,
        bungieDisplayNameCode: data.bungieDisplayNameCode,
        displayName: data.displayName,
        platformId: data.platformId,

        characters: chars,
        character: chars[0],

        getShortName: getShortName,
        hasFullBungieName: hasFullBungieName,
    };

    return out;
}