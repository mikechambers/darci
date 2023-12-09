const Moment = require("./Moment");
const EnumBase = require("./EnumBase");

class Season extends EnumBase {
    #startMoment;
    #endMoment;

    static RED_WAR = new Season(
        Moment.RED_WAR.type,
        Moment.RED_WAR.label,
        Moment.RED_WAR,
        Moment.CURSE_OF_OSIRIS
    );
    static CURSE_OF_OSIRIS = new Season(
        Moment.CURSE_OF_OSIRIS.type,
        Moment.CURSE_OF_OSIRIS.label,
        Moment.CURSE_OF_OSIRIS,
        Moment.WARMIND
    );

    static WARMIND = new Season(
        Moment.WARMIND.type,
        Moment.WARMIND.label,
        Moment.WARMIND,
        Moment.SEASON_OF_THE_OUTLAW
    );

    static SEASON_OF_THE_OUTLAW = new Season(
        Moment.SEASON_OF_THE_OUTLAW.type,
        Moment.SEASON_OF_THE_OUTLAW.label,
        Moment.SEASON_OF_THE_OUTLAW,
        Moment.SEASON_OF_THE_FORGE
    );

    static SEASON_OF_THE_FORGE = new Season(
        Moment.SEASON_OF_THE_FORGE.type,
        Moment.SEASON_OF_THE_FORGE.label,
        Moment.SEASON_OF_THE_FORGE,
        Moment.SEASON_OF_THE_DRIFTER
    );

    static SEASON_OF_THE_DRIFTER = new Season(
        Moment.SEASON_OF_THE_DRIFTER.type,
        Moment.SEASON_OF_THE_DRIFTER.label,
        Moment.SEASON_OF_THE_DRIFTER,
        Moment.SEASON_OF_OPULENCE
    );

    static SEASON_OF_OPULENCE = new Season(
        Moment.SEASON_OF_OPULENCE.type,
        Moment.SEASON_OF_OPULENCE.label,
        Moment.SEASON_OF_OPULENCE,
        Moment.SEASON_OF_THE_UNDYING
    );

    static SEASON_OF_THE_UNDYING = new Season(
        Moment.SEASON_OF_THE_UNDYING.type,
        Moment.SEASON_OF_THE_UNDYING.label,
        Moment.SEASON_OF_THE_UNDYING,
        Moment.SEASON_OF_DAWN
    );

    static SEASON_OF_DAWN = new Season(
        Moment.SEASON_OF_DAWN.type,
        Moment.SEASON_OF_DAWN.label,
        Moment.SEASON_OF_DAWN,
        Moment.SEASON_OF_THE_WORTHY
    );

    static SEASON_OF_THE_WORTHY = new Season(
        Moment.SEASON_OF_THE_WORTHY.type,
        Moment.SEASON_OF_THE_WORTHY.label,
        Moment.SEASON_OF_THE_WORTHY,
        Moment.SEASON_OF_ARRIVALS
    );

    static SEASON_OF_ARRIVALS = new Season(
        Moment.SEASON_OF_ARRIVALS.type,
        Moment.SEASON_OF_ARRIVALS.label,
        Moment.SEASON_OF_ARRIVALS,
        Moment.SEASON_OF_THE_HUNT
    );

    static SEASON_OF_THE_HUNT = new Season(
        Moment.SEASON_OF_THE_HUNT.type,
        Moment.SEASON_OF_THE_HUNT.label,
        Moment.SEASON_OF_THE_HUNT,
        Moment.SEASON_OF_THE_CHOSEN
    );

    static SEASON_OF_THE_CHOSEN = new Season(
        Moment.SEASON_OF_THE_CHOSEN.type,
        Moment.SEASON_OF_THE_CHOSEN.label,
        Moment.SEASON_OF_THE_CHOSEN,
        Moment.SEASON_OF_THE_SPLICER
    );

    static SEASON_OF_THE_SPLICER = new Season(
        Moment.SEASON_OF_THE_SPLICER.type,
        Moment.SEASON_OF_THE_SPLICER.label,
        Moment.SEASON_OF_THE_SPLICER,
        Moment.SEASON_OF_THE_LOST
    );

    static SEASON_OF_THE_LOST = new Season(
        Moment.SEASON_OF_THE_LOST.type,
        Moment.SEASON_OF_THE_LOST.label,
        Moment.SEASON_OF_THE_LOST,
        Moment.SEASON_OF_THE_RISEN
    );

    static SEASON_OF_THE_RISEN = new Season(
        Moment.SEASON_OF_THE_RISEN.type,
        Moment.SEASON_OF_THE_RISEN.label,
        Moment.SEASON_OF_THE_RISEN,
        Moment.SEASON_OF_THE_HAUNTED
    );

    static SEASON_OF_THE_HAUNTED = new Season(
        Moment.SEASON_OF_THE_HAUNTED.type,
        Moment.SEASON_OF_THE_HAUNTED.label,
        Moment.SEASON_OF_THE_HAUNTED,
        Moment.SEASON_OF_PLUNDER
    );

    static SEASON_OF_PLUNDER = new Season(
        Moment.SEASON_OF_PLUNDER.type,
        Moment.SEASON_OF_PLUNDER.label,
        Moment.SEASON_OF_PLUNDER,
        Moment.SEASON_OF_THE_SERAPH
    );

    static SEASON_OF_THE_SERAPH = new Season(
        Moment.SEASON_OF_THE_SERAPH.type,
        Moment.SEASON_OF_THE_SERAPH.label,
        Moment.SEASON_OF_THE_SERAPH,
        Moment.SEASON_OF_DEFIANCE
    );

    static SEASON_OF_DEFIANCE = new Season(
        Moment.SEASON_OF_DEFIANCE.type,
        Moment.SEASON_OF_DEFIANCE.label,
        Moment.SEASON_OF_DEFIANCE,
        Moment.SEASON_OF_THE_DEEP
    );

    static SEASON_OF_THE_DEEP = new Season(
        Moment.SEASON_OF_THE_DEEP.type,
        Moment.SEASON_OF_THE_DEEP.label,
        Moment.SEASON_OF_THE_DEEP,
        Moment.SEASON_OF_THE_WITCH
    );

    static SEASON_OF_THE_WITCH = new Season(
        Moment.SEASON_OF_THE_WITCH.type,
        Moment.SEASON_OF_THE_WITCH.label,
        Moment.SEASON_OF_THE_WITCH,
        Moment.SEASON_OF_THE_WISH
    );

    static SEASON_OF_THE_WISH = new Season(
        Moment.SEASON_OF_THE_WISH.type,
        Moment.SEASON_OF_THE_WISH.label,
        Moment.SEASON_OF_THE_WISH,
        Moment.NOW
    );

    static UNKNOWN = new Season("unknown", "Unknown");

    constructor(type, label, startMoment, endMoment) {
        super(type, undefined, label);

        this.#startMoment = startMoment;
        this.#endMoment = endMoment;
    }

    static fromType(type) {
        let out = super._fromType(Season, type);

        if (out !== undefined) {
            return out;
        }

        return Season.UNKNOWN;
    }

    get startMoment() {
        return this.#startMoment;
    }

    get endMoment() {
        return this.#endMoment;
    }
}

module.exports = Season;
