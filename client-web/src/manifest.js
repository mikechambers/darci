const STORAGE_MANIFEST_DATA_KEY = "STORAGE_MANIFEST_DATA_KEY";

class Manifest {

    #manifestData;

    async init() {

        const storage = window.localStorage;
        let manifestData = storage.getItem(STORAGE_MANIFEST_DATA_KEY);

        let version = "update";
        if (manifestData != undefined) {
            version = manifestData.version;
            return;
        }

        let response;
        let data;
        let updated = false;
        try {
            response = await fetch(`/manifest/${version}/`);
            data = await response.json();
            updated = data.updated;
            manifestData = data;
        } catch (e) {
            //note: if we cant load data, we just return undefined for everything
            console.log(e);
        }

        if (updated) {
            storage.setItem(STORAGE_MANIFEST_DATA_KEY, JSON.stringify(manifestData));
        }

        this.#manifestData = data;
    }

    getActivityDefinition(id) {

        let out = {
            name: "Unknown",
            image: undefined,
        };

        if (!this.#manifestData) {
            return out;
        }

        let d = this.#manifestData.data.activityDefinition[id];

        if (!d) {
            return out;
        }

        return d;

    }
}

export default Manifest;

