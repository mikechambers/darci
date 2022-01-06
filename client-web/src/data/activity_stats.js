import Manifest from "../manifest";

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
    #manifest;
    constructor(activities, manifest) {
        this.#activities = activities;

        //this is in case we cant load a manifest for some reason
        if (!manifest) {
            manifest = new Manifest();
        }

        this.#manifest = manifest;
        this.#update();
    }

    #update() {

        for (let activity of this.#activities) {


            //let mapName = manifest.getActivityDefinition(activity.referenceId).name;
            activity.mapName = this.#manifest.getActivityDefinition(activity.referenceId).name;

            this.assists += activity.stats.assists;
            this.kills += activity.stats.kills;
            this.deaths += activity.stats.deaths;
            this.opponentsDefeated += activity.stats.opponentsDefeated;

            //note, we can update data with Enums, and manifest info


            let mode = Mode.fromId(activity.mode);
            let standing = Standing.fromIdAndMode(activity.stats.standing, mode);
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

            activity.stats.mode = mode;
            activity.stats.standing = standing;

            let completionReason = CompletionReason.fromId(activity.stats.completionReason);

            if (completionReason == CompletionReason.MERCY) {
                this.mercies++;
            }

            activity.stats.completionReason = completionReason;
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