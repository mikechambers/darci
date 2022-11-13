/* MIT License
 *
 * Copyright (c) 2022 Mike Chambers
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

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
