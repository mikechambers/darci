

class Manifest {

    #manifestData;

    constructor(manifestData) {
        this.#manifestData = manifestData;
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
}

export default Manifest;

