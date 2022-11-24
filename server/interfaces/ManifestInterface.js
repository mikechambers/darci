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

const Database = require("better-sqlite3");
const fs = require("fs");
const { createResourceUrl } = require("shared/packages/utils");

const MANIFEST_CHECK_INTERVAL_MS_MIN = 1000 * 60 * 60; //1 min
class ManifestInterface {
    #db;

    #manifest;
    #version;

    #manifestCheckIntervalMs;
    #manifestCheckIntervalId;

    #select_activity_definitions;
    #select_weapon_item_definitions;
    #select_medal_definitions;
    #select_trials_inventory_item_definitions;
    #select_activity_mode_definitions;
    #select_emblem_definitions;
    #select_medal_record_definition;
    #select_collectible_definition;

    #manifestDbPath;
    #manifestInfoPath;

    constructor(
        manifestDbPath,
        manifestInfoPath,
        manifestCheckIntervalMs = 1000 * 60 * 60
    ) {
        this.#manifestDbPath = manifestDbPath;
        this.#manifestInfoPath = manifestInfoPath;

        if (manifestCheckIntervalMs < MANIFEST_CHECK_INTERVAL_MS_MIN) {
            console.log(
                `ManifestInterface : Warning manifestCheckIntervalMs is below minimum (${MANIFEST_CHECK_INTERVAL_MS_MIN}). Ignoring.`
            );
        } else {
            this.#manifestCheckIntervalMs = manifestCheckIntervalMs;
        }
    }

    async init(version = undefined) {
        this.#initDb();
        this.#initStatements();

        if (version === undefined) {
            this.#version = await this.#getSystemManifestVersion();
        } else {
            this.#version = version;
        }

        console.log(`Using manifest version : ${this.#version}`);

        this.#initManifest();

        if (this.#db !== undefined) {
            this.#db.close();
            this.#db == undefined;
        }

        if (this.#manifestCheckIntervalId != undefined) {
            clearInterval(this.#manifestCheckIntervalId);
        }

        if (this.#manifestCheckIntervalMs >= MANIFEST_CHECK_INTERVAL_MS_MIN) {
            this.#manifestCheckIntervalId = setInterval(async () => {
                let v = await this.#getSystemManifestVersion();
                if (this.hasUpdatedManifest(v)) {
                    console.log("New manifest version found. Updating.");
                    this.init(v);
                }
            }, this.#manifestCheckIntervalMs);
        }
    }

    #initDb() {
        if (this.#db !== undefined) {
            //check this
            this.#db.close();
        }

        console.log(`Using Manifest db at: ${this.#manifestDbPath}`);
        this.#db = new Database(this.#manifestDbPath, { readonly: true });
    }

    #initStatements() {
        this.#select_weapon_item_definitions = this.#db.prepare(`
        SELECT
            *
        FROM
        DestinyInventoryItemDefinition
        WHERE
            json like '%"itemType":3,%'`);

        this.#select_trials_inventory_item_definitions = this.#db.prepare(`
        SELECT
            *
        FROM
        DestinyInventoryItemDefinition
        WHERE
            json like '%"itemTypeDisplayName":"Trials Passage"%'`);

        this.#select_activity_definitions = this.#db.prepare(`
            SELECT
                *
            FROM
                DestinyActivityDefinition
            WHERE
                json like '%"placeHash":4088006058%'`);

        this.#select_medal_definitions = this.#db.prepare(`
            SELECT
                *
            FROM
                DestinyHistoricalStatsDefinition
            WHERE
                json like '%medalTierIdentifier%'
        `);

        this.#select_activity_mode_definitions = this.#db.prepare(`
        SELECT
            *
        FROM
        DestinyActivityModeDefinition
        WHERE
            json like '%"activityModeCategory":2%'
    `);

        this.#select_emblem_definitions = this.#db.prepare(`
        SELECT
            *
        FROM
            DestinyInventoryItemDefinition
        WHERE
            json like '%"itemType":14,%'`);

        this.#select_medal_record_definition = this.#db.prepare(`
        SELECT
        *
        FROM
            DestinyRecordDefinition
        WHERE
            json like @medalNameSearch
            `);

        this.#select_collectible_definition = this.#db.prepare(`
        SELECT
            *
        FROM
            DestinyCollectibleDefinition
        `);
    }

    async #getSystemManifestVersion() {
        //todo: this is a sync call. should look at making this async again
        let data = await fs.promises.readFile(this.#manifestInfoPath, "utf8");

        let obj = JSON.parse(data);
        let version = obj.url;

        if (version === undefined) {
            throw new Error(
                "Manifest Info file invalid format. url is undefined."
            );
        }

        return version;
    }

    #initManifest() {
        let rows = this.#select_activity_definitions.all();

        let activityDefinition = {};
        for (let row of rows) {
            let d = JSON.parse(row.json);

            const id = idToHash(row.id);

            let out = {
                name: d.displayProperties.name,
                image: createResourceUrl(d.pgcrImage),
                description: d.displayProperties.description,
                activityModeHash: d.directActivityModeHash,
            };

            activityDefinition[id] = out;
        }

        let collectibles = this.#select_collectible_definition.all();

        let indexMap = new Map();
        for (const row of collectibles) {
            const d = JSON.parse(row.json);

            indexMap.set(d.itemHash, d.displayProperties.icon);
        }

        rows = this.#select_weapon_item_definitions.all();

        let weaponItemDefinition = {};
        for (let row of rows) {
            const d = JSON.parse(row.json);
            const id = idToHash(row.id);

            let out = {
                //description: d.displayProperties.description,
                name: d.displayProperties.name,
                icon: createResourceUrl(d.displayProperties.icon),
                collectibleIcon: createResourceUrl(indexMap.get(id)),
                screenshot: d.screenshot,
                itemType: d.itemType,
                itemSubType: d.itemSubType,
                ammunitionType: d.equippingBlock.ammoType,
                id: id,
            };

            weaponItemDefinition[id] = out;
        }

        rows = this.#select_trials_inventory_item_definitions.all();

        let trialsPassageItemDefinitions = {};
        for (let row of rows) {
            let d = JSON.parse(row.json);
            const id = idToHash(row.id);

            let out = {
                name: d.displayProperties.name,
                description: d.displayProperties.description,
                icon: createResourceUrl(d.displayProperties.icon),
                id: id,
            };

            trialsPassageItemDefinitions[id] = out;
        }

        rows = this.#select_medal_definitions.all();

        let medalDefinitions = {};
        for (let row of rows) {
            let d = JSON.parse(row.json);
            let key = row.key;

            //filter out gambit medals
            if (key.toLowerCase().startsWith("medals_pvecomp")) {
                continue;
            }

            //IB Medals dont have a description, so we have
            //to get it from their record definition searching by name.
            let search = `%"name":"${d.statName}"%`;
            const record = this.#select_medal_record_definition.get({
                medalNameSearch: search,
            });

            let description = d.statDescription;
            if (record) {
                //There are a couple of medals which have the same name as other
                //records, and there is no way to differentiate between the two.
                //So we have to hard code the descriptions for those.
                switch (d.statName) {
                    case "Lights Out": {
                        description = "Rapidly defeat 4 opposing Guardians.";
                        break;
                    }
                    case "Not on My Watch": {
                        description =
                            "Land a final blow on an opponent who has damaged an ally.";
                        break;
                    }
                    case "From the Jaws of Defeat": {
                        description =
                            "Win a match after having trailed by a significant margin.";
                        break;
                    }
                    case "Thunderstruck": {
                        description =
                            "efeat an opponent with Landfall while casting Stormtrance.";
                        break;
                    }
                    case "Regent": {
                        description =
                            "Defeat two opponents with a sword without switching weapons.";
                        break;
                    }
                    case "Pyrotechnics": {
                        description =
                            "Countdown: Set a charge that successfully detonates.";
                        break;
                    }
                    case "Usurper": {
                        description =
                            "Shut down an opponent's streak of 20 or more.";
                        break;
                    }
                    case "From the Front": {
                        description =
                            "Win an Iron Banner match in which your team never trailed.";
                        break;
                    }
                    default: {
                        let r = JSON.parse(record.json);
                        if (r.displayProperties) {
                            description = r.displayProperties.description;
                        }
                    }
                }
            }

            let out = {
                name: d.statName,
                description: description,
                icon: createResourceUrl(d.iconImage),
                isGold: false,
                id: key,
            };

            if (
                out.id === "Medals_pvp_medal_streak_extra_absurd_b" ||
                out.id === "medalStreak7x" ||
                out.id === "medalMatchUndefeated" ||
                out.id === "medalMultiEntireTeam" ||
                out.id === "medalStreakAbsurd" ||
                out.id === "Medals_pvp_medal_streak_no_damage" ||
                out.id === "medalControlPowerPlayWipe" ||
                out.id === "medalCountdownPerfect" ||
                out.id === "medalMayhemKillStreak" ||
                out.id === "Medals_pvp_medal_lockdown_3a" ||
                out.id === "medalRumbleBetterThanAllCombined" ||
                out.id === "medalShowdownUndefeated" ||
                out.id === "medalSupremacyPerfectSecureRate" ||
                out.id === "medalSurvivalTeamUndefeated" ||
                //iron banner
                out.id === "Medals_pvp_medal_ib_streak_lg" ||
                out.id === "Medals_pvp_medal_ib_control_3b" ||
                out.id === "Medals_pvp_medal_ib_multi_entire_team" ||
                out.id === "Medals_pvp_medal_ib_multi_7x" ||
                out.id === "Medals_pvp_medal_ib_match_undefeated" ||
                out.id === "Medals_pvp_medal_ib_streak_shutdown_large" ||
                out.id === "Medals_pvp_medal_ib_streak_huge" ||
                out.id === "Medals_pvp_medal_ib_streak_no_damage"
            ) {
                out.isGold = true;
            }

            medalDefinitions[key] = out;
        }

        rows = this.#select_activity_mode_definitions.all();

        let activityModeDefinitions = {};
        for (let row of rows) {
            let d = JSON.parse(row.json);
            const id = idToHash(row.id);

            let out = {
                name: d.displayProperties.name,
                description: d.displayProperties.description,
                icon: createResourceUrl(d.displayProperties.icon),
                image: createResourceUrl(d.pgcrImage),
            };

            activityModeDefinitions[id] = out;
        }

        rows = this.#select_emblem_definitions.all();

        let emblemDefinitions = {};
        for (let row of rows) {
            let d = JSON.parse(row.json);
            const id = idToHash(row.id);

            let out = {
                name: d.displayProperties.name,
                icon: createResourceUrl(d.displayProperties.icon),
                secondaryIcon: createResourceUrl(d.secondaryIcon),
                secondaryOverlay: createResourceUrl(d.secondaryOverlay),
                secondarySpecial: createResourceUrl(d.secondarySpecial),
            };

            emblemDefinitions[id] = out;
        }

        this.#manifest = {
            version: this.#version,
            data: {
                activityDefinition: activityDefinition,
                weaponItemDefinition: weaponItemDefinition,
                medalDefinitions: medalDefinitions,
                trialsPassageItemDefinitions: trialsPassageItemDefinitions,
                activityModeDefinitions: activityModeDefinitions,
                emblemDefinitions: emblemDefinitions,
            },
        };
    }

    hasUpdatedManifest(version) {
        return version !== this.#version;
    }

    get manifest() {
        return this.#manifest;
    }
}

const idToHash = function (id) {
    //return id >>> 0;
    return id >>> 32;
};

module.exports = ManifestInterface;
