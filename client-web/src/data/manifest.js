

class Manifest {

    #manifestData;

    #trialsPassageIds = [];

    constructor(manifestData) {
        this.#manifestData = manifestData;

        for (const [key, value] of Object.entries(this.#manifestData.data.trialsPassageItemDefinitions)) {
            if (value.id) {
                this.#trialsPassageIds.push(value.id);
            }
        }
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

        return (!d) ? out : d;
    }

    getTrialsPassageDefinition(id) {
        let out = {
            name: "Unknown",
            description: undefined,
            icon: undefined,
            id: id,
        }

        if (!this.#manifestData) {
            return out;
        }

        let d = this.#manifestData.data.trialsPassageItemDefinitions[id];

        return (!d) ? out : d;
    }

    get trialsPassageIds() {
        return this.#trialsPassageIds;
    }
}

export default Manifest;

