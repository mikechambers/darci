import { MANIFEST_UPDATED, PLAYER_SUMMARY_VIEW_STATE_UPDATED } from "./action";
import { playerSummaryViewInitialState } from "../routes/player_summary_view"
export const initialState = {
    manifest: null,
    playerSummaryViewState: playerSummaryViewInitialState,
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
        case PLAYER_SUMMARY_VIEW_STATE_UPDATED:
            out = {
                ...state,
                playerSummaryViewState: action.payload,
            };
            break;

    }

    return out;
};

export default reducer;