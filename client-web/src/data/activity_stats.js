const { CompletionReason, Mode, Standing } = require("shared");
//const Standing = require("shared/packages/standing");
const {
    calculateEfficiency, calculateKillsDeathsRatio, calculateKillsDeathsAssists } = require("../utils");

class ActivityStats {

    assists = 0;
    kills = 0;
    deaths = 0;
    opponentsDefeated = 0;
    efficiency = 0;
    killsDeathsRatio = 0;
    killsDeathsAssists = 0;
    timePlayedSeconds = 0;

    wins = 0;
    losses = 0;
    draws = 0;

    mercies = 0;

    highestKills = 0;
    highestAssists = 0;
    highestDeaths = 0;
    highestOpponentsDefeated = 0;
    highestEfficiency = 0;
    highestKillsDeathsRatio = 0;
    highestKillsDeathsAssists = 0;

    precisionKills = 0;
    abilityKills = 0;
    grenadeKills = 0;
    meleeKills = 0;
    superKills = 0;

    #activities = [];
    constructor(activities) {
        this.#activities = activities;
        this.#update();
    }

    #update() {

        for (let activity of this.#activities) {

            let a = activity.stats;

            this.assists += a.assists;
            this.kills += a.kills;
            this.deaths += a.deaths;
            this.opponentsDefeated += a.opponentsDefeated;

            //note, we can update data with Enums, and manifest info


            let mode = Mode.fromId(activity.mode);
            let standing = Standing.fromIdAndMode(a.standing, mode);
            switch (standing) {
                case Standing.VICTORY:
                    this.wins++;
                    break;
                case Standing.DEFEAT:
                    this.losses++;
                    break;
                case Standing.UNKNOWN:
                    this.draws++
                    break;
            }

            a.mode = mode;
            a.standing = standing;

            let completionReason = CompletionReason.fromId(a.completionReason);

            if (completionReason == CompletionReason.MERCY) {
                this.mercies++;
            }

            a.completionReason = completionReason;
        }

        this.efficiency = calculateEfficiency(
            this.kills, this.deaths, this.assists);
        this.killsDeathsRatio = calculateKillsDeathsRatio(this.kills, this.deaths);
        this.killsDeathsAssists = calculateKillsDeathsAssists(
            this.kills, this.deaths, this.assists);

    }

    get totalActivities() {
        return this.#activities ? this.#activities.length() : 0;
    }

    get activities() {
        return this.#activities;
    }
}

export default ActivityStats;