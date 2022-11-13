/* MIT License
 *
 * Copyright (c) 2022 Mike Chambers
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

const EnumBase = require("./EnumBase");

class CompletionReason extends EnumBase {
    static OBJECTIVE_COMPLETE = new CompletionReason(
        "ObjectiveComplete",
        0,
        "Objective Complete"
    );
    static TIMER_FINISHED = new CompletionReason(
        "TimeFinished",
        1,
        "Timer Finished"
    );
    static FAILED = new CompletionReason("Failed", 2);
    static NO_OPPONENTS = new CompletionReason(
        "NoOpponents",
        3,
        "No Opponents"
    );
    static MERCY = new CompletionReason("Mercy", 4);
    static UNKNOWN = new CompletionReason("Unknown", 255);

    constructor(type, id, label = undefined) {
        super(type, id, label);
    }

    static fromId(id) {
        let out = super._fromId(CompletionReason, id);

        if (out != undefined) {
            return out;
        }

        return CompletionReason.UNKNOWN;
    }

    static fromType(type) {
        let out = super._fromType(CompletionReason, type);

        if (out != undefined) {
            return out;
        }

        return CompletionReason.UNKNOWN;
    }
}

module.exports = CompletionReason;
