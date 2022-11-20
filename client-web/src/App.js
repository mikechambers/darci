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

import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";

import { useFetchManifest, useFetchPlayers } from "./hooks/remote";

import {
    GlobalContext,
    useGlobalContext,
    GlobalAction,
    MANIFEST_UPDATED,
    PLAYERS_UPDATED,
    WEAPONS_UPDATED,
} from "./contexts/GlobalContext";
import MainNavView from "./components/MainNavView";
const { useQuery } = require("./hooks/browser");

const App = (props) => {
    let query = useQuery();

    let clearStorage = query.get("clearstorage") !== null;

    useEffect(() => {
        if (clearStorage === true) {
            console.log("Clearing local storage.");
            window.localStorage.clear();
        }
    }, [clearStorage]);

    const [global, dispatchGlobal] = useGlobalContext();
    //const manifest = global.manifest;
    //const players = global.players;

    const [manifest, isLoading, error] = useFetchManifest();
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
        if (!players) {
            return;
        }

        dispatchGlobal(new GlobalAction(PLAYERS_UPDATED, players));
    }, [players]);

    let initializingContent;
    if (error) {
        initializingContent = <div>Error loading manifest</div>;
    } else if (isLoading) {
        initializingContent = <div>Initializing Manifest</div>;
    }

    const style = {
        display: "flex",
        flexDirection: "column",
        width: "var(--page-max-width)",
    };

    const currentViewStyle = {
        flexGrow: "2",
        //height: "100vh",
    };

    return (
        <GlobalContext.Provider value={{ global, dispatchGlobal }}>
            <React.Fragment>
                {initializingContent ? (
                    initializingContent
                ) : (
                    <div style={style}>
                        <MainNavView />

                        <div style={currentViewStyle}>
                            <Outlet />
                        </div>
                        <div>&nbsp;</div>
                    </div>
                )}
            </React.Fragment>
        </GlobalContext.Provider>
    );
};

export default App;
