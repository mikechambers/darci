const EnumBase = require('./EnumBase');

class CharacterClass extends EnumBase {
    static TITAN = new CharacterClass("Titan", 0);
    static HUNTER = new CharacterClass("Hunter", 1);
    static WARLOCK = new CharacterClass("Warlock", 2);
    static UNKNOWN = new CharacterClass("Unknown", -1);

    constructor(type, id, label = undefined) {
        super(type, id, label);
    }

    static fromId(id) {
        let out = super._fromId(CharacterClass, id);

        if (out != undefined) {
            return out;
        }

        return CharacterClass.UNKNOWN;
    }

    static fromString(type) {

        let out = super._fromString(CharacterClass, type);

        if (out != undefined) {
            return out;
        }

        return CharacterClass.UNKNOWN;
    }

}

module.exports = CharacterClass;
