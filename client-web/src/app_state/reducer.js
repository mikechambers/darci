import { MANIFEST_UPDATED, PLAYER_ACTIVITIES_LOADED } from "./action";

const reducer = function (state, action) {

    let out = state;
    switch (action.type) {
        case MANIFEST_UPDATED:
            out = {
                ...state,
                manifest: action.payload,
            };
            break;
        case PLAYER_ACTIVITIES_LOADED:
            out = {
                ...state,
                playerActivityStats: action.payload,
            };
            break;

    }

    return out; //ManifestInterface
};

export default reducer;