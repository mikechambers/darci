const EnumBase = require('./enum_base');
const CharacterClass = require('./character_class');


class CharacterClassSelection extends EnumBase {
    static TITAN = new CharacterClassSelection("Titan", 0);
    static HUNTER = new CharacterClassSelection("Hunter", 1);
    static WARLOCK = new CharacterClassSelection("Warlock", 2);
    static LAST_ACTIVE = new CharacterClassSelection("Last Active", 3);
    static ALL = new CharacterClassSelection("All", 4);
    static UNKNOWN = new CharacterClassSelection("Unknown", -1);

    static LAST_ACTIVE_PARAM = "lastactive";

    constructor(type, id, label = undefined) {
        super(type, id, label);
    }

    getCharacterClass() {
        if (this === CharacterClassSelection.TITAN) {
            return CharacterClass.TITAN;
        }

        if (this === CharacterClassSelection.HUNTER) {
            return CharacterClass.HUNTER;
        }

        if (this === CharacterClassSelection.WARLOCK) {
            return CharacterClass.WARLOCK;
        }

        return CharacterClass.UNKNOWN;
    }

    static fromId(id) {
        let out = super._fromId(CharacterClassSelection, id);

        if (out != undefined) {
            return out;
        }

        return CharacterClassSelection.UNKNOWN;
    }

    static fromString(type) {

        if (type.toUpperCase() == this.LAST_ACTIVE_PARAM.toUpperCase()) {
            return this.LAST_ACTIVE;
        }

        let out = super._fromString(CharacterClassSelection, type);

        if (out != undefined) {
            return out;
        }

        return CharacterClassSelection.UNKNOWN;
    }

}

module.exports = CharacterClassSelection;
