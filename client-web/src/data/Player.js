import { parsePlayer } from "../utils/activity";

export default class Player {

    memberId;
    bungieDisplayName;
    bungieDisplayNameCode;
    displayName;
    platformId;
    character;

    constructor(data, manifest) {

        let p = parsePlayer(data);
        this.memberId = p.memberId;
        this.bungieDisplayName = p.bungieDisplayName;
        this.bungieDisplayNameCode = p.bungieDisplayNameCode;
        this.displayName = p.displayName;
        this.platformId = p.platformId;

        this.character = p.character;

        //todo:need to put in correct format, and generate emblem

        //this.characterId = data.characterId;
    }

    get has_full_bungie_name() {
        return this.bungieDisplayName && this.bungieDisplayNameCode;
    }

    get short_name() {
        return (this.bungieDisplayName) ? this.bungieDisplayName : this.displayName;
    }
}