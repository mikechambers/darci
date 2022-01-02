const EnumBase = require('./enum_base');

class Moment extends EnumBase {

    static WEEK_IN_MS = 604800000;
    static DAY_IN_MS = 86400000;

    static UNKNOWN = new Moment("Unknown");
    static NOW = new Moment("Now");
    static DAILY = new Moment("Daily");
    //static NEXT_DAILY = new Moment("NextDaily");
    static WEEKEND = new Moment("Weekend");
    //static NEXT_WEEKEND = new Moment("NextWeekend");
    static WEEKLY = new Moment("Weekly");
    //static NEXT_WEEKLY = new Moment("NextWeekly");
    static DAY = new Moment("Day");
    //static NEXT_DAY = new Moment("NextDay");
    static WEEK = new Moment("Week");
    //static NEXT_WEEK = new Moment("NextWeek");
    static MONTH = new Moment("Month");
    //static NEXT_MONTH = new Moment("NextMonth");
    static ALL_TIME = new Moment("AllTime");
    //static CUSTOM = new Moment("Custom");
    static LAUNCH = new Moment("Launch");
    static CURSE_OF_OSIRIS = new Moment("CurseOfOsiris");
    static WARMIND = new Moment("Warmind");
    static SEASON_OF_THE_OUTLAW = new Moment("SeasonOfTheOutlaw");
    static SEASON_OF_THE_FORGE = new Moment("SeasonOfTheForge");
    static SEASON_OF_THE_DRIFTER = new Moment("SeasonOfTheDrifter");
    static SEASON_OF_OPULENCE = new Moment("SeasonOfOpulence");
    static SEASON_OF_THE_UNDYING = new Moment("SeasonOfTheUndying");
    static SEASON_OF_DAWN = new Moment("SeasonOfDawn");
    static SEASON_OF_THE_WORTHY = new Moment("SeasonOfTheWorthy");
    static SEASON_OF_ARRIVALS = new Moment("SeasonOfArrivals");
    static SEASON_OF_THE_HUNT = new Moment("SeasonOfTheHunt");
    static SEASON_OF_THE_CHOSEN = new Moment("SeasonOfTheChosen");
    static SEASON_OF_THE_SPLICER = new Moment("SeasonOfTheSplicer");
    static SEASON_OF_THE_LOST = new Moment("SeasonOfTheLost");

    constructor(type) {
        super(type);
    }

    getDate() {
        if (this == Moment.NOW) {
            return new Date();
        }

        if (this == Moment.DAILY) {
            return Moment.getLastDailyReset();
        }

        if (this == Moment.WEEKEND) {
            return Moment.getLastFridayReset();
        }

        if (this == Moment.WEEKLY) {
            return Moment.getLastWeeklyReset();
        }

        if (this == Moment.DAY) {
            return Moment.subtractDaysFromDate(new Date(), 1);
        }

        if (this == Moment.WEEK) {
            return Moment.subtractDaysFromDate(new Date(), 7);
        }

        if (this == Moment.MONTH) {
            return Moment.subtractMonthsFromDate(new Date(), 1);
        }

        if (this == Moment.ALL_TIME || this == Moment.LAUNCH) {
            return Moment.getDestiny2LaunchDate();
        }

        if (this == Moment.CURSE_OF_OSIRIS) {
            return new Date(Date.UTC(2017, 11, 5, 17, 0, 0));
        }

        if (this == Moment.WARMIND) {
            return new Date(Date.UTC(2018, 4, 8, 17, 0, 0));
        }

        if (this == Moment.SEASON_OF_THE_OUTLAW) {
            return new Date(Date.UTC(2018, 8, 4, 17, 0, 0));
        }

        if (this == Moment.SEASON_OF_THE_FORGE) {
            return new Date(Date.UTC(2018, 11, 4, 17, 0, 0));
        }

        if (this == Moment.SEASON_OF_THE_DRIFTER) {
            return new Date(Date.UTC(2019, 2, 5, 17, 0, 0));
        }

        if (this == Moment.SEASON_OF_OPULENCE) {
            return new Date(Date.UTC(2019, 5, 4, 17, 0, 0));
        }

        if (this == Moment.SEASON_OF_THE_UNDYING) {
            return new Date(Date.UTC(2019, 9, 1, 17, 0, 0));
        }

        if (this == Moment.SEASON_OF_DAWN) {
            return new Date(Date.UTC(2019, 11, 10, 17, 0, 0));
        }

        if (this == Moment.SEASON_OF_THE_WORTHY) {
            return new Date(Date.UTC(2020, 2, 10, 17, 0, 0));
        }

        if (this == Moment.SEASON_OF_ARRIVALS) {
            return new Date(Date.UTC(2020, 5, 9, 17, 0, 0));
        }

        if (this == Moment.SEASON_OF_THE_HUNT) {
            return new Date(Date.UTC(2020, 10, 10, 17, 0, 0));
        }

        if (this == Moment.SEASON_OF_THE_CHOSEN) {
            return new Date(Date.UTC(2021, 1, 9, 17, 0, 0));
        }

        if (this == Moment.SEASON_OF_THE_SPLICER) {
            return new Date(Date.UTC(2021, 4, 11, 17, 0, 0));
        }

        if (this == Moment.SEASON_OF_THE_LOST) {
            return new Date(Date.UTC(2021, 4, 7, 24, 0, 0));
        }

        return undefined;
    }

    static subtractDaysFromDate(moment, days) {
        let out = new Date();
        out.setTime(moment.getTime());
        out.setDate(out.getDate() - days);
        return out;
    }

    static subtractMonthsFromDate(moment, days) {
        let out = new Date();
        out.setTime(moment.getTime());
        out.setDate(out.getMonth() - days);
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
        return Moment.findPreviousMoment(pastReset, Moment.WEEK_IN_MS)
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

    static fromString(type) {

        let out = super._fromString(Moment, type);

        if (out != undefined) {
            return out;
        }

        return this.UNKNOWN;
    }

}

module.exports = Moment;