export const MANIFEST_UPDATED = "MANIFEST_UPDATED";
export const PLAYER_ACTIVITIES_LOADED = "PLAYER_ACTIVITIES_LOADED";

class Action {
    type;
    payload;

    constructor(type, payload) {
        this.type = type;
        this.payload = payload;
    }

}

export default Action;
