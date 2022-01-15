
const API_RESOURCE_BASE_URL = "https://www.bungie.net";
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

        //todo: setup map with mode# as index
        //add getModeInfo() method that combines description
    }

    getActivityDefinition(id) {

        let out = {
            name: "Unknown",
            image: undefined,
            directActivityModeHash: undefined,
            id: id,
        };

        if (!this.#manifestData) {
            return out;
        }

        let d = this.#manifestData.data.activityDefinition[id];

        d.image = createResourceUrl(d.image);

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
        d.icon = createResourceUrl(d.icon);

        return (!d) ? out : d;
    }

    get trialsPassageIds() {
        return this.#trialsPassageIds;
    }


    /*
                    name: d.displayProperties.name,
                icon: d.displayProperties.icon,
                secondaryIcon: d.secondaryIcon,
                secondaryOverlay: d.secondaryOverlay,
                secondarySpecial: d.secondarySpecial,
    */
    getEmblem(id) {
        let out = {
            id: id,
            name: "Unknown",
            icon: undefined,
            secondaryIcon: undefined,
            secondaryOverlay: undefined,
            secondarySpecial: undefined,
        };

        let e = this.#manifestData.emblemDefinitions[id];

        if (!e) {
            return out;
        }

        out.name = e.name;
        out.icon = createResourceUrl(e.icon);
        out.secondaryIcon = createResourceUrl(e.secondaryIcon);
        out.secondaryOverlay = createResourceUrl(e.secondaryOverlay);
        out.secondarySpecial = createResourceUrl(e.secondarySpecial);

        return out;
    }

    getModeInfo(referenceId) {
        let out = {
            name: "Unknown",
            description: undefined,
            icon: undefined,
            image: undefined,
        }

        let a = this.getActivityDefinition(referenceId);
        if (!a) {
            console.log(`Manifest.getModeInfo : Could not find activity definition [${referenceId}]`);
            return out;
        }

        let m = this.#manifestData.data.activityModeDefinitions[a.activityModeHash];
        if (!m) {
            console.log(`Manifest.getModeInfo : Could not find activity mode definition [${a.activityModeHash}]`);
            return out;
        }

        out.name = m.name;
        out.description = a.description;
        out.icon = createResourceUrl(m.icon);
        out.image = createResourceUrl(m.image);
        out.id = referenceId;

        return out;
    }
}

const createResourceUrl = (path) => {
    if (!path) {
        return undefined;
    }

    return `${API_RESOURCE_BASE_URL}${path}`;
}

export default Manifest;

