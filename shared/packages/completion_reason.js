const EnumBase = require('./enum_base');

class CompletionReason extends EnumBase {
    static OBJECTIVE_COMPLETE = new CompletionReason("ObjectiveComplete", 0, "Objective Complete");
    static TIMER_FINISHED = new CompletionReason("TimeFinished", 1, "Timer Finished");
    static FAILED = new CompletionReason("Failed", 2);
    static NO_OPPONENTS = new CompletionReason("NoOpponents", 3, "No Opponents");
    static MERCY = new CompletionReason("Mercy", 3);
    static UNKNOWN = new CompletionReason("Unknown", 255);

    constructor(type, id, label = undefined) {
        super(type, id, label);
    }

    static fromId(id) {
        let out = super._fromString(CompletionReason, id);

        if (out != undefined) {
            return out;
        }

        return this.UNKNOWN;
    }

    static fromString(type) {

        let out = super._fromString(CompletionReason, type);

        if (out != undefined) {
            return out;
        }

        return this.UNKNOWN;
    }
}

module.exports = CompletionReason;