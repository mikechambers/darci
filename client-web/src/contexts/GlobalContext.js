import React, { useReducer } from "react";
export const GlobalContext = React.createContext();

export const MANIFEST_UPDATED = "MANIFEST_UPDATED";
export const PLAYERS_UPDATED = "PLAYERS_UPDATED";

export const initialState = {
  manifest: null,
  players: null,
};

const reducer = function (state, action) {
  let out = state;
  switch (action.type) {
    case MANIFEST_UPDATED: {
      out = {
        ...state,
        manifest: action.payload,
      };
      break;
    }
    case PLAYERS_UPDATED: {
      out = {
        ...state,
        players: action.payload,
      };
      break;
    }
    default: {
    }
  }

  return out;
};

export class GlobalAction {
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
};
