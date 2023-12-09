/* MIT License
 *
 * Copyright (c) 2023 Mike Chambers
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

class Moment extends EnumBase {
    static WEEK_IN_MS = 604800000;
    static DAY_IN_MS = 86400000;

    static UNKNOWN = new Moment("Unknown");
    static NOW = new Moment("Now");
    static DAILY = new Moment("Daily", "Daily Reset");
    //static NEXT_DAILY = new Moment("NextDaily");
    static WEEKEND = new Moment("Weekend", "Friday Reset");
    //static NEXT_WEEKEND = new Moment("NextWeekend");
    static WEEKLY = new Moment("Weekly", "Weekly Reset");
    //static NEXT_WEEKLY = new Moment("NextWeekly");
    static DAY = new Moment("Day", "Last Day");
    //static NEXT_DAY = new Moment("NextDay");
    static WEEK = new Moment("Week", "Last Week");
    //static NEXT_WEEK = new Moment("NextWeek");
    static MONTH = new Moment("Month", "Last Month");
    //static NEXT_MONTH = new Moment("NextMonth");
    static ALL_TIME = new Moment("AllTime", "All Time");
    //static CUSTOM = new Moment("Custom");

    static LAUNCH = new Moment("Launch", "Destiny 2 Launch");

    static RED_WAR = new Moment("RedWar", "Red War");
    static CURSE_OF_OSIRIS = new Moment("CurseOfOsiris", "Curse of Osiris");
    static WARMIND = new Moment("Warmind");
    static SEASON_OF_THE_OUTLAW = new Moment(
        "SeasonOfTheOutlaw",
        "Season of the Outlaw"
    );
    static SEASON_OF_THE_FORGE = new Moment(
        "SeasonOfTheForge",
        "Season of the Forge"
    );
    static SEASON_OF_THE_DRIFTER = new Moment(
        "SeasonOfTheDrifter",
        "Season of the Drifter"
    );
    static SEASON_OF_OPULENCE = new Moment(
        "SeasonOfOpulence",
        "Season of Opulence"
    );
    static SEASON_OF_THE_UNDYING = new Moment(
        "SeasonOfTheUndying",
        "Season of the Undying"
    );
    static SEASON_OF_DAWN = new Moment("SeasonOfDawn", "Season of the Dawn");
    static SEASON_OF_THE_WORTHY = new Moment(
        "SeasonOfTheWorthy",
        "Season of the Worthy"
    );
    static SEASON_OF_ARRIVALS = new Moment(
        "SeasonOfArrivals",
        "Season of Arrivals"
    );
    static SEASON_OF_THE_HUNT = new Moment(
        "SeasonOfTheHunt",
        "Season of the Hunt"
    );
    static SEASON_OF_THE_CHOSEN = new Moment(
        "SeasonOfTheChosen",
        "Season of the Chosen"
    );
    static SEASON_OF_THE_SPLICER = new Moment(
        "SeasonOfTheSplicer",
        "Season of the Splicer"
    );
    static SEASON_OF_THE_LOST = new Moment(
        "SeasonOfTheLost",
        "Season of the Lost"
    );

    static SEASON_OF_THE_RISEN = new Moment(
        "SeasonOfTheRisen",
        "Season of the Risen"
    );
    static WITCH_QUEEN = new Moment("WitchQueen", "The Witch Queen");

    static SEASON_OF_THE_HAUNTED = new Moment(
        "SeasonOfTheHaunted",
        "Season of the Haunted"
    );

    static SEASON_OF_PLUNDER = new Moment(
        "SeasonOfPlunder",
        "Season of Plunder"
    );

    static SEASON_OF_THE_SERAPH = new Moment(
        "SeasonOfTheSeraph",
        "Season of The Seraph"
    );

    static LIGHTFALL = new Moment("Lightfall", "Lightfall");

    static SEASON_OF_DEFIANCE = new Moment(
        "SeasonOfDefiance",
        "Season of Defiance"
    );

    static SEASON_OF_THE_DEEP = new Moment(
        "SeasonOfTheDeep",
        "Season of the Deep"
    );

    static SEASON_OF_THE_WITCH = new Moment(
        "SeasonOfTheWitch",
        "Season of the Witch"
    );

    static SEASON_OF_THE_WISH = new Moment(
        "SeasonOfTheWish",
        "Season of the Wish"
    );

    constructor(type, label = undefined) {
        super(type, undefined, label);
    }

    getDate() {
        if (this === Moment.NOW) {
            return new Date();
        }

        if (this === Moment.DAILY) {
            return Moment.getLastDailyReset();
        }

        if (this === Moment.WEEKEND) {
            return Moment.getLastFridayReset();
        }

        if (this === Moment.WEEKLY) {
            return Moment.getLastWeeklyReset();
        }

        if (this === Moment.DAY) {
            return Moment.subtractDaysFromDate(new Date(), 1);
        }

        if (this === Moment.WEEK) {
            return Moment.subtractDaysFromDate(new Date(), 7);
        }

        if (this === Moment.MONTH) {
            return Moment.subtractMonthsFromDate(new Date(), 1);
        }

        if (this === Moment.ALL_TIME || this === Moment.LAUNCH) {
            return Moment.getDestiny2LaunchDate();
        }

        if (this === Moment.CURSE_OF_OSIRIS) {
            return new Date(Date.UTC(2017, 11, 5, 17, 0, 0));
        }

        if (this === Moment.WARMIND) {
            return new Date(Date.UTC(2018, 4, 8, 17, 0, 0));
        }

        if (this === Moment.SEASON_OF_THE_OUTLAW) {
            return new Date(Date.UTC(2018, 8, 4, 17, 0, 0));
        }

        if (this === Moment.SEASON_OF_THE_FORGE) {
            return new Date(Date.UTC(2018, 11, 4, 17, 0, 0));
        }

        if (this === Moment.SEASON_OF_THE_DRIFTER) {
            return new Date(Date.UTC(2019, 2, 5, 17, 0, 0));
        }

        if (this === Moment.SEASON_OF_OPULENCE) {
            return new Date(Date.UTC(2019, 5, 4, 17, 0, 0));
        }

        if (this === Moment.SEASON_OF_THE_UNDYING) {
            return new Date(Date.UTC(2019, 9, 1, 17, 0, 0));
        }

        if (this === Moment.SEASON_OF_DAWN) {
            return new Date(Date.UTC(2019, 11, 10, 17, 0, 0));
        }

        if (this === Moment.SEASON_OF_THE_WORTHY) {
            return new Date(Date.UTC(2020, 2, 10, 17, 0, 0));
        }

        if (this === Moment.SEASON_OF_ARRIVALS) {
            return new Date(Date.UTC(2020, 5, 9, 17, 0, 0));
        }

        if (this === Moment.SEASON_OF_THE_HUNT) {
            return new Date(Date.UTC(2020, 10, 10, 17, 0, 0));
        }

        if (this === Moment.SEASON_OF_THE_CHOSEN) {
            return new Date(Date.UTC(2021, 1, 9, 17, 0, 0));
        }

        if (this === Moment.SEASON_OF_THE_SPLICER) {
            return new Date(Date.UTC(2021, 4, 11, 17, 0, 0));
        }

        if (this === Moment.SEASON_OF_THE_LOST) {
            return new Date(Date.UTC(2021, 7, 24, 17, 0, 0));
        }

        if (this === Moment.SEASON_OF_THE_RISEN) {
            return new Date(Date.UTC(2022, 1, 22, 17, 0, 0));
        }

        if (this === Moment.WITCH_QUEEN) {
            return new Date(Date.UTC(2022, 1, 22, 17, 0, 0));
        }

        if (this === Moment.SEASON_OF_THE_HAUNTED) {
            return new Date(Date.UTC(2022, 4, 24, 17, 0, 0));
        }

        if (this === Moment.SEASON_OF_PLUNDER) {
            return new Date(Date.UTC(2022, 7, 23, 17, 0, 0));
        }

        if (this === Moment.SEASON_OF_THE_SERAPH) {
            return new Date(Date.UTC(2022, 11, 6, 17, 0, 0));
        }

        if (this === Moment.LIGHTFALL || this == Moment.SEASON_OF_DEFIANCE) {
            return new Date(Date.UTC(2023, 1, 28, 17, 0, 0));
        }

        if (this == Moment.SEASON_OF_THE_DEEP) {
            return new Date(Date.UTC(2023, 4, 22, 17, 0, 0));
        }

        if (this == Moment.SEASON_OF_THE_WITCH) {
            return new Date(Date.UTC(2023, 7, 22, 17, 0, 0));
        }

        if (this == Moment.SEASON_OF_THE_WISH) {
            return new Date(Date.UTC(2023, 10, 28, 17, 0, 0));
        }

        return undefined;
    }

    static subtractDaysFromDate(moment, days) {
        let out = new Date();
        out.setTime(moment.getTime());
        out.setDate(out.getDate() - days);
        return out;
    }

    static subtractMonthsFromDate(moment, months) {
        let out = new Date();
        out.setTime(moment.getTime());
        out.setMonth(out.getMonth() - months);
        return out;
    }

    static getLastDailyReset() {
        let pastReset = new Date(Date.UTC(2020, 10, 10, 17, 0, 0));
        return Moment.findPreviousMoment(pastReset, Moment.DAY_IN_MS);
    }

    static getLastWeeklyReset() {
        let pastReset = new Date(Date.UTC(2020, 10, 10, 17, 0, 0));
        return Moment.findPreviousMoment(pastReset, Moment.WEEK_IN_MS);
    }

    static getLastFridayReset() {
        let pastReset = new Date(Date.UTC(2020, 11, 4, 17, 0, 0));
        return Moment.findPreviousMoment(pastReset, Moment.WEEK_IN_MS);
    }

    static getDestiny2LaunchDate() {
        return new Date(Date.UTC(2017, 8, 6, 17, 0, 0));
    }

    static findPreviousMoment(moment, interval_ms) {
        let now = new Date();
        let now_ts = now.getTime();

        let out_ms = now_ts - ((now_ts - moment.getTime()) % interval_ms);

        now.setTime(out_ms);
        return now;
    }

    static fromType(type) {
        let out = super._fromType(Moment, type);

        if (out !== undefined) {
            return out;
        }

        return Moment.UNKNOWN;
    }
}

module.exports = Moment;
