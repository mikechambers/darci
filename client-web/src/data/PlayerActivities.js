import Manifest from "./Manifest";

const { Mode } = require("shared");
const { parsePlayerFromServer, parseMedalsFromServer, parseWeaponsFromServer } = require("../utils/data");
const { calculateStats, parseWeapons } = require("../utils/activity");

const {
    calculateEfficiency, calculateKillsDeathsRatio, calculateKillsDeathsAssists } = require("shared");


class PlayerActivities {

    #activities = [];
    #summary;
    #manifest;
    #player;
    constructor(data, manifest) {
        this.#activities = data.activities;
        this.#summary = data.summary;
        //this.#player = new Player(data.player);
        this.#player = parsePlayerFromServer(data.player, manifest);

        //this is in case we cant load a manifest for some reason
        if (!manifest) {
            manifest = new Manifest();
        }

        this.#manifest = manifest;
        this.#update();
    }

    #update() {

        for (const a of this.#activities) {

            //a.player = new Player(a.player);
            a.player = parsePlayerFromServer(a.player, this.#manifest);

            let map = this.#manifest.getActivityDefinition(a.activity.referenceId);
            a.activity.map = map;

            let modeInfo = this.#manifest.getActivityDefinition(a.activity.directorActivityHash);
            a.activity.modeInfo = modeInfo;

            let mode = Mode.fromId(a.activity.mode);
            a.activity.mode = mode;

            a.stats = calculateStats(a.stats, mode);

        }

        let kills = this.#summary.kills;
        let assists = this.#summary.assists;
        let deaths = this.#summary.deaths;

        this.#summary.opponentsDefeated = kills + assists;

        this.#summary.efficiency = calculateEfficiency(kills, deaths, assists);
        this.#summary.killsDeathsRatio = calculateKillsDeathsRatio(kills, deaths);
        this.#summary.killsDeathsAssists = calculateKillsDeathsAssists(
            kills, deaths, assists,
        );

        this.#summary.weapons = parseWeaponsFromServer(this.#summary.weapons, this.#manifest);
        this.#summary.medals = parseMedalsFromServer(this.#summary.medals, this.#manifest);

        console.log(this.#summary);
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

    get player() {
        return this.#player;
    }
}

export default PlayerActivities;