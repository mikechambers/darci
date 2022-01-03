const Database = require('better-sqlite3');
const fs = require("fs");

class ManifestInterface {

    #db;

    #manifest;
    #generatedDate;
    #version;
    #cacheAgeLimit = 1000 * 60 * 60;

    #select_activity_definitions;
    #select_inventory_item_definitions;
    #select_historical_stats_definition;

    #manifestDbPath;
    #manifestInfoPath

    constructor(manifestDbPath, manifestInfoPath) {

        this.#manifestDbPath = manifestDbPath;
        this.#manifestInfoPath = manifestInfoPath;

        this.#initDb();
        this.#initManifest();
    }

    #initDb() {
        if (this.#db !== undefined) {
            //check this
            this.#db.close();
        }

        console.log(`Using Manifest db at: ${this.#manifestDbPath}`);
        this.#db = new Database(this.#manifestDbPath, { readonly: true, verbose: console.log });
        this.#initStatements();
    }

    #initStatements() {
        this.#select_inventory_item_definitions = this.#db.prepare(`
        SELECT
            *
        FROM
        DestinyInventoryItemDefinition
        WHERE
            json like '%"itemType":3,%'`
        );

        this.#select_activity_definitions = this.#db.prepare(`
            SELECT
                *
            FROM
                DestinyActivityDefinition
            WHERE
                json like '%"isPvP":true%'`
        );

        this.#select_historical_stats_definition = this.#db.prepare(`
            SELECT
                *
            FROM
                DestinyHistoricalStatsDefinition
            WHERE
                json like '%medalTierIdentifier%'
        `);




    }

    #initManifest() {
        //todo: need to test async on start up if file is missing
        fs.readFile(this.#manifestInfoPath, 'utf8', (err, data) => {
            if (err) {
                throw err;
            }

            let obj = JSON.parse(data);
            let version = obj.url;


            if (version === undefined) {
                throw new Error("Manifest Info file invalid format. url is undefined.");
            }

            this.#version = version;

            let rows = this.#select_activity_definitions.all();

            let activityDefinition = {};
            for (let row of rows) {
                let d = JSON.parse(row.json);

                const id = idToHash(row.id);

                let out = {
                    name: d.displayProperties.name,
                    image: d.pgcrImage,
                };

                activityDefinition[id] = out;
            }

            rows = this.#select_inventory_item_definitions.all();

            let inventoryItemDefinition = {};
            for (let row of rows) {
                let d = JSON.parse(row.json);
                const id = idToHash(row.id);

                let out = {
                    //description: d.displayProperties.description,
                    name: d.displayProperties.name,
                    itemType: d.itemType,
                    itemSubType: d.itemSubType,
                }

                inventoryItemDefinition[id] = out;
            }

            rows = this.#select_historical_stats_definition.all();

            let historicalStatsDefinition = {};
            for (let row of rows) {
                let d = JSON.parse(row.json);
                let key = row.key;

                //filter out gambit medals
                if (key.toLowerCase().startsWith("medals_pvecomp")) {
                    continue;
                }

                let out = {
                    name: d.statName,
                    description: d.statDescription,
                    iconImage: d.iconImage,
                };

                historicalStatsDefinition[key] = out;
            }

            this.#manifest = {
                version: this.#version,
                data: {
                    activityDefinition: activityDefinition,
                    inventoryItemDefinition: inventoryItemDefinition,
                    historicalStatsDefinition: historicalStatsDefinition,
                }
            };

            this.#db.close();
        });
    }

    hasUpdatedManifest(version) {
        return version !== this.#version;
    }

    getManifest() {
        return this.#manifest;
    }
}

const idToHash = function (id) {
    return id >>> 32;
}

module.exports = ManifestInterface;