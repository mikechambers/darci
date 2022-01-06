export const MANIFEST_UPDATED = "MANIFEST_UPDATED";
export const PLAYER_SUMMARY_VIEW_STATE_UPDATED = "PLAYER_SUMMARY_VIEW_STATE_UPDATED";


class Action {
    type;
    payload;

    constructor(type, payload) {
        this.type = type;
        this.payload = payload;
    }

}

export default Action;
