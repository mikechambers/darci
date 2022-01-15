export default class Player {

    memberId;
    bungieDisplayName;
    bungieDisplayNameCode;
    displayName;
    platformId;
    characterId;

    constructor(data) {
        this.memberId = data.memberId;
        this.bungieDisplayName = data.bungieDisplayName;
        this.bungieDisplayNameCode = data.bungieDisplayNameCode;
        this.displayName = data.displayName;
        this.platformId = data.platformId;
        this.characterId = data.characterId;
    }

    get has_full_bungie_name() {
        return this.bungieDisplayName && this.bungieDisplayNameCode;
    }

    get short_name() {
        return (this.bungieDisplayName) ? this.bungieDisplayName : this.displayName;
    }
}