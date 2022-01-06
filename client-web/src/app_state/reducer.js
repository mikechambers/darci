import { MANIFEST_UPDATED, PLAYER_SUMMARY_VIEW_STATE_UPDATED } from "./action";
export const initialState = {
    manifest: null,
};

const reducer = function (state, action) {

    let out = state;
    switch (action.type) {
        case MANIFEST_UPDATED:
            out = {
                ...state,
                manifest: action.payload,
            };
            break;
    }

    return out;
};

export default reducer;