import React, { useReducer } from "react";
export const GlobalContext = React.createContext();

export const initialState = {
    manifest: null,
};

const reducer = function (state, action) {

    let out = state;
    switch (action.type) {
        case GlobalAction.MANIFEST_UPDATED:
            out = {
                ...state,
                manifest: action.payload,
            };
            break;
    }

    return out;
};

export class GlobalAction {
    static MANIFEST_UPDATED = "MANIFEST_UPDATED";
    type;
    payload;

    constructor(type, payload) {
        this.type = type;
        this.payload = payload;
    }

}

export const useGlobalContext = () => {
    const [global, dispatchGlobal] = useReducer(reducer, initialState);
    return [global, dispatchGlobal];
}

