const Database = require('better-sqlite3');

class ManifestInterface {

    #db;

    #manifest;
    #generatedDate;
    #version;
    #cacheAgeLimit = 1000 * 60 * 60;

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
    }

    #initManifest() {

    }

    hasUpdatedManifest(version) {
        return version === this.#version;
    }

    getManifest() {
        //is there a cached version?
        //if no generate it
        //if yes, check if its out of date
        //if its out of date, check manifest_info
        //to see if there is an updated version
        //if there is, reload db, and generate new manifest (do we need to reload?)
        //return manifest
    }

    #generateManifest() {

    }
}

module.exports = ManifestInterface;