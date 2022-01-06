

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

        if (!d) {
            return out;
        }

        return d;

    }
}

export default Manifest;

