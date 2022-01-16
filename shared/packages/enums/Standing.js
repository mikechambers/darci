const Mode = require('./Mode');
const EnumBase = require('./EnumBase');


//todo: this doesnt really handle draws correctly right now
class Standing extends EnumBase {
    static VICTORY = new Standing("Victory", 0);
    static DEFEAT = new Standing("Deafeat", 1);
    static UNKNOWN = new Standing("Unknown", 2325);

    constructor(type, id, label = undefined) {
        super(type, id, label);
    }

    static fromId(id) {
        let out = super._fromId(Standing, id);

        if (out != undefined) {
            return out;
        }

        return Standing.UNKNOWN;
    }

    static fromIdAndMode(id, mode) {

        //in rumble, 0,1,2 is victory.
        //note, this will return wrong results for
        //private rumble, (only 0 will be victory)
        //due to api bug.
        //https://github.com/Bungie-net/api/issues/1386
        if (mode == Mode.RUMBLE) {
            if (id > 2) {
                return Standing.DEFEAT;
            } else {
                return Standing.VICTORY;
            }
        }

        return Standing.fromId(id);
    }

    static fromString(type) {

        let out = super._fromString(Standing, type);

        if (out != undefined) {
            return out;
        }

        return Standing.UNKNOWN;
    }

}


module.exports = Standing;