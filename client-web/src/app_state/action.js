export const MANIFEST_UPDATED = "MANIFEST_UPDATED";

class Action {
    type;
    payload;

    constructor(type, payload) {
        this.type = type;
        this.payload = payload;
    }

}

export default Action;
