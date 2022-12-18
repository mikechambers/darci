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

class OrderBy extends EnumBase {
    static PERIOD = new OrderBy("Period", "period", "Period");
    static PERIOD_REVERSE = new OrderBy(
        "PeriodReverse",
        "periodReverse",
        "Period Reverse"
    );
    static KILLS = new OrderBy("Kills", "kills", "Kills");
    static ASSISTS = new OrderBy("Assists", "assists", "Assists");
    static SCORE = new OrderBy("Score", "score", "Score");
    static OPPONENTS_DEFEATED = new OrderBy(
        "Opponents Defeated",
        "opponentsDefeated",
        "Opponents Defeated"
    );
    static DEATHS = new OrderBy("Deaths", "deaths", "Deaths");

    static PRECISION_KILLS = new OrderBy(
        "Precision Kills",
        "precisionKills",
        "Precision Kills"
    );
    static GRENADE_KILLS = new OrderBy(
        "Grenade Kills",
        "grenadeKills",
        "Grenade Kills"
    );
    static MELEE_KILLS = new OrderBy(
        "Melee Kills",
        "meleeKills",
        "Melee Kills"
    );
    static SUPER_KILLS = new OrderBy(
        "Super Kills",
        "superKills",
        "Super Kills"
    );
    static MEDALS_EARNED = new OrderBy(
        "Medals Earned",
        "medalsEarned",
        "Medals Earned"
    );

    static UNKNOWN = new OrderBy("Unknown", "unknown", "Unknown");

    constructor(type, id, label = undefined) {
        super(type, id, label);
    }

    static fromId(id) {
        let out = super._fromId(OrderBy, id);

        if (out !== undefined) {
            return out;
        }

        return OrderBy.UNKNOWN;
    }

    static fromType(type) {
        let out = super._fromType(OrderBy, type);

        if (out !== undefined) {
            return out;
        }

        return OrderBy.UNKNOWN;
    }
}

module.exports = OrderBy;
