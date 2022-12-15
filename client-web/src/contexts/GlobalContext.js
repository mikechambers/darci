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

import React, { useEffect, useReducer } from "react";
import { useFetchManifest, useFetchPlayers } from "../hooks/remote";

export const GlobalContext = React.createContext();

export const MANIFEST_UPDATED = "MANIFEST_UPDATED";
export const PLAYERS_UPDATED = "PLAYERS_UPDATED";
export const WEAPONS_UPDATED = "WEAPONS_UPDATED";
export const MANIFEST_ERROR_UPDATED = "MANIFEST_ERROR_UPDATED";
export const MANIFEST_LOADING_UPDATED = "MANIFEST_LOADING_UPDATED";

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
        case WEAPONS_UPDATED: {
            out = {
                ...state,
                weapons: action.payload,
            };
            break;
        }
        case MANIFEST_ERROR_UPDATED: {
            out = {
                ...state,
                manifestError: action.payload,
            };
            break;
        }
        case MANIFEST_LOADING_UPDATED: {
            out = {
                ...state,
                manifestIsLoading: action.payload,
            };
            break;
        }
        default: {
            console.log("GlobalContext unknown action", action);
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
    const [global, dispatchGlobal] = useReducer(reducer, {
        manifest: undefined,
        players: undefined,
        weapons: undefined,
        manifestError: undefined,
        manifestIsLoading: true,
    });

    const [manifest, manifestIsLoading, manifestError] = useFetchManifest();
    const [players, isPlayersLoading, isPlayersError] =
        useFetchPlayers(manifest);

    useEffect(() => {
        if (!manifest) {
            return;
        }

        dispatchGlobal(new GlobalAction(MANIFEST_UPDATED, manifest));

        let weapons = manifest.getWeapons();
        let out = [];
        let keyIndex = 0;
        for (const [key, value] of Object.entries(weapons)) {
            out.push({
                key: keyIndex++,
                data: value,

                get value() {
                    return this.data.name;
                },
                get label() {
                    return this.data.name;
                },
            });
        }

        out.sort((a, b) => a.label.localeCompare(b.label));

        dispatchGlobal(new GlobalAction(WEAPONS_UPDATED, out));
    }, [manifest]);

    useEffect(() => {
        dispatchGlobal(new GlobalAction(MANIFEST_ERROR_UPDATED, manifestError));
    }, [manifestError]);

    useEffect(() => {
        dispatchGlobal(
            new GlobalAction(MANIFEST_LOADING_UPDATED, manifestIsLoading)
        );
    }, [manifestIsLoading]);

    useEffect(() => {
        if (!players) {
            return;
        }

        dispatchGlobal(new GlobalAction(PLAYERS_UPDATED, players));
    }, [players]);

    return [global, dispatchGlobal];
};
