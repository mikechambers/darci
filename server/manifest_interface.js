const Database = require('better-sqlite3');
const fs = require("fs");

class ManifestInterface {

    #db;

    #manifest;
    #generatedDate;
    #version;
    #cacheAgeLimit = 1000 * 60 * 60;

    #select_activity_definitions;

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
        this.#select_activity_definitions = this.#db.prepare(`
        SELECT
            *
        FROM
            DestinyActivityDefinition
        WHERE
            json like '%"isPvP":true%'`);
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

            this.#manifest = {
                version: this.#version,
                data: {
                    activityDefinition: activityDefinition,
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