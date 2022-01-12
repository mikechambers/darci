import Manifest from "./Manifest";

const { CompletionReason, Mode, Standing } = require("shared");

const {
    calculateEfficiency, calculateKillsDeathsRatio, calculateKillsDeathsAssists } = require("../utils");

class ActivityStats {

    #activities = [];
    #summary;
    #manifest;
    constructor(data, manifest) {
        this.#activities = data.activities;
        this.#summary = data.summary;

        //this is in case we cant load a manifest for some reason
        if (!manifest) {
            manifest = new Manifest();
        }

        this.#manifest = manifest;
        this.#update();
    }

    #update() {

        for (const a of this.#activities) {

            let map = this.#manifest.getActivityDefinition(a.activity.referenceId);
            a.activity.map = map;

            let modeInfo = this.#manifest.getActivityDefinition(a.activity.directorActivityHash);
            a.activity.modeInfo = modeInfo;

            let mode = Mode.fromId(a.activity.mode);
            a.activity.mode = mode;

            let standing = Standing.fromIdAndMode(a.stats.standing, mode);
            a.stats.standing = standing;

            let completionReason = CompletionReason.fromId(a.stats.completionReason);
            a.stats.completionReason = completionReason;
        }

        /*
        this.#summary.efficiency = calculateEfficiency(
            this.#summary.kills, this.#summary.deaths, this.#summary.assists);
        this.#summary.killsDeathsRatio = calculateKillsDeathsRatio(this.#summary.kills, this.#summary.deaths);
        this.#summary.killsDeathsAssists = calculateKillsDeathsAssists(
            this.#summary.kills, this.#summary.deaths, this.#summary.assists);
            */

    }

    get totalActivities() {
        return this.#activities ? this.#activities.length() : 0;
    }

    get activities() {
        return this.#activities;
    }

    get summary() {
        return this.#summary;
    }
}

export default ActivityStats;