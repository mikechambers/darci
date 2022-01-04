const Mode = require('./mode');
const EnumBase = require('./enum_base');


//todo: this doesnt really handle draws correctly right now
class Standing extends EnumBase {
    static VICTORY = new Standing("Victory", 0);
    static DEFEAT = new Standing("Deafeat", 1);
    static UNKNOWN = new Standing("Unknown", 2325);

    constructor(type, id, label = undefined) {
        super(type, id, label);
    }

    static fromId(id) {
        let out = super._fromString(Standing, id);

        if (out != undefined) {
            return out;
        }

        return this.UNKNOWN;
    }

    static fromIdAndMode(id, mode) {

        //0 is always victory
        if (id == Standing.VICTORY.id) {
            return Standing.VICTORY;
        }

        //in rumble, 0,1,2 is victory.
        //note, this will return wrong results for
        //private rumble, (only 0 will be victory)
        //due to api bug.
        //https://github.com/Bungie-net/api/issues/1386
        return (mode == Mode.RUMBLE & id > 2) ?
            Standing.DEFEAT
            :
            Standing.VICTORY;
    }

    static fromString(type) {

        let out = super._fromString(Standing, type);

        if (out != undefined) {
            return out;
        }

        return this.UNKNOWN;
    }

}


module.exports = Standing;