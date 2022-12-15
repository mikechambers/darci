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

import { GlobalContext } from "../contexts/GlobalContext";
import PlayerSummary from "../core/data/PlayerSummary";
import PlayerProfile from "../core/data/PlayerProfile";
import Activity from "../core/data/Activity";

import { useState, useContext, useEffect } from "react";
import Manifest from "../core/data/Manifest";

import { MANIFEST_CHECK_INTERVAL } from "../core/consts";
import { fetchApi, fetchDestinyApi } from "../core/utils/remote";

import Player from "../core/data/Player";
import PlayerActivities from "../core/data/PlayerActivities";
import PlayerMetrics from "../core/data/PlayerMetrics";
import { ActivityNotFoundError, DestinyApiDisabledError } from "../core/errors";
import { OrderBy } from "shared";
import { reducer } from "../core/utils/data";
import { Buffer } from "buffer";

const STORAGE_MANIFEST_DATA_KEY = "STORAGE_MANIFEST_DATA_KEY";
const STORAGE_MANIFEST_LAST_CHECK_KEY = "STORAGE_MANIFEST_LAST_CHECK_KEY";

export const useFetchManifest = () => {
    const [output, setOutput] = useState({
        manifest: null,
        isLoading: true,
        error: null,
    });

    useEffect(() => {
        const storage = window.localStorage;

        let lastCheckTimeStamp = storage.getItem(
            STORAGE_MANIFEST_LAST_CHECK_KEY
        );

        let now = new Date().getTime();

        let rawStoredData = storage.getItem(STORAGE_MANIFEST_DATA_KEY);
        let storedData;

        let version = "check";
        if (rawStoredData) {
            try {
                storedData = JSON.parse(rawStoredData);

                //version = btoa(storedData.version);
                version = Buffer.from(storedData.version, "base64").toString(
                    "utf8"
                );
            } catch (err) {
                let e = new Error(
                    "Error parsing locally stored manifest JSON.",
                    {
                        cause: err,
                    }
                );
                let s = reducer(output, "error", e);
                s = reducer(s, "isLoading", false);
                setOutput(s);
                return;
            }
        }

        //if we checked (without an error) within the last N amount of time
        //then use existing manifest data
        if (storedData && lastCheckTimeStamp) {
            if (now - lastCheckTimeStamp < MANIFEST_CHECK_INTERVAL) {
                let s = reducer(output, "manifest", new Manifest(storedData));
                s = reducer(s, "isLoading", false);
                setOutput(s);
                return;
            }
        }

        const f = async () => {
            let s = reducer(output, "isLoading", false);
            let data;
            let error;
            try {
                data = await fetchApi(`/manifest/${version}/`);
            } catch (err) {
                error = new Error("Error fetching manifest data from server.", {
                    cause: err,
                });
            }

            let manifest;
            if (error) {
                //if error occured and we have stored data, then use the stored data
                if (storedData) {
                    manifest = new Manifest(storedData);

                    //wrap error in an object so it is collapsed in console in browser
                    console.log(
                        "Error loading manifest data. Using stored manifest",
                        { error }
                    );

                    error = null;
                }
            } else {
                if (data.updated) {
                    storage.setItem(
                        STORAGE_MANIFEST_DATA_KEY,
                        JSON.stringify(data)
                    );
                    manifest = new Manifest(data);
                } else {
                    manifest = new Manifest(storedData);
                }

                storage.setItem(STORAGE_MANIFEST_LAST_CHECK_KEY, now);
            }

            s = reducer(s, "manifest", manifest);
            s = reducer(s, "error", error);

            setOutput(s);
        };

        f();
    }, []);

    return [output.manifest, output.isLoading, output.error];
};

export const useFetchActivity = (activityId) => {
    const [output, setOutput] = useState({
        activity: undefined,
        isLoading: true,
        error: undefined,
    });

    const { global, dispatchGlobal } = useContext(GlobalContext);
    const manifest = global.manifest;

    useEffect(() => {
        if (!manifest) {
            return;
        }

        const f = async () => {
            let s = reducer(output, "isLoading", false);
            try {
                const data = await fetchApi(`/api/activity/${activityId}/`);

                if (!data.query.found) {
                    throw new ActivityNotFoundError();
                }

                const a = new Activity(data, manifest);

                s = reducer(s, "activity", a);
            } catch (err) {
                s = reducer(s, "error", err);
            }

            setOutput(s);
        };

        f();
    }, [activityId]);

    return [output.activity, output.isLoading, output.error];
};

export const useFetchLatestActivityIdForMember = (
    refreshInterval,
    memberId,
    hash = undefined
) => {
    const [output, setOutput] = useState({
        activityData: undefined,
        isLoading: true,
        error: undefined,
    });

    useEffect(() => {
        if (!memberId) {
            return;
        }

        let timeoutId;
        const f = async () => {
            let s = reducer(output, "isLoading", false);
            try {
                const data = await fetchApi(`/api/player/latest/${memberId}/`);

                let activityId = data.activityId;

                if (!activityId) {
                    throw new ActivityNotFoundError();
                }

                s = reducer(s, "activityData", { activityId });
            } catch (err) {
                s = reducer(s, "error", err);
            }

            setOutput(s);

            timeoutId = startTimeout(f, refreshInterval);
        };

        f();

        return () => {
            cleanUpTimeout(timeoutId);
        };
    }, [memberId, hash]);

    return [output.activityData, output.isLoading, output.error];
};

export const useFetchPlayerActivities = (args) => {
    let refreshInterval = args.refreshInterval;
    let memberId = args.memberId;
    let mode = args.mode;
    let startMoment = args.startMoment;
    let endMoment = args.endMoment;
    let characterClass = args.characterClass;
    let hash = args.hash;
    let orderBy = args.orderBy;

    const [output, setOutput] = useState({
        playerActivities: undefined,
        isLoading: true,
        error: undefined,
    });

    const { global, dispatchGlobal } = useContext(GlobalContext);
    const manifest = global.manifest;

    useEffect(() => {
        if (
            !manifest ||
            !memberId ||
            !mode ||
            !startMoment ||
            !characterClass
        ) {
            return;
        }

        let timeoutId;
        const f = async () => {
            let s = reducer(output, "isLoading", false);

            let ob =
                orderBy && orderBy !== OrderBy.UNKNOWN
                    ? `?orderby=${orderBy.id}`
                    : "";
            try {
                const data = await fetchApi(
                    `/api/player/activities/${memberId}/${characterClass.type}/${mode.type}/${startMoment.type}/${endMoment.type}/${ob}`
                );

                const as = PlayerActivities.fromApi(data, manifest);
                s = reducer(s, "activityStats", as);

                //clear any previous errors
                s = reducer(s, "error", undefined);
            } catch (err) {
                s = reducer(s, "error", err);
            }

            setOutput(s);

            timeoutId = startTimeout(f, refreshInterval);
        };

        f();

        return () => {
            cleanUpTimeout(timeoutId);
        };
    }, [
        characterClass,
        manifest,
        memberId,
        mode,
        startMoment,
        endMoment,
        refreshInterval,
        hash,
        orderBy,
    ]);

    return [output.activityStats, output.isLoading, output.error];
};

export const useFetchPlayerSummary = (args) => {
    let refreshInterval = args.refreshInterval;
    let memberId = args.memberId;
    let mode = args.mode;
    let startMoment = args.startMoment;
    let endMoment = args.endMoment;
    let characterClass = args.characterClass;
    let hash = args.hash;

    const [output, setOutput] = useState({
        activityStats: undefined,
        isLoading: true,
        error: undefined,
    });

    const { global, dispatchGlobal } = useContext(GlobalContext);
    const manifest = global.manifest;

    useEffect(() => {
        if (
            !manifest ||
            !memberId ||
            !mode ||
            !startMoment ||
            !characterClass
        ) {
            return;
        }

        let timeoutId;
        const f = async () => {
            let s = reducer(output, "isLoading", false);
            try {
                const data = await fetchApi(
                    `/api/player/${memberId}/${characterClass.type}/${mode.type}/${startMoment.type}/${endMoment.type}/`
                );

                const as = PlayerSummary.fromApi(data, manifest);
                s = reducer(s, "activityStats", as);

                //clear any previous errors
                s = reducer(s, "error", undefined);
            } catch (err) {
                s = reducer(s, "error", err);
            }

            setOutput(s);

            timeoutId = startTimeout(f, refreshInterval);
        };

        f();

        return () => {
            cleanUpTimeout(timeoutId);
        };
    }, [
        characterClass,
        manifest,
        memberId,
        mode,
        startMoment,
        refreshInterval,
        hash,
    ]);

    return [output.activityStats, output.isLoading, output.error];
};

export const useFetchPlayers = (manifest) => {
    //return is [players, isLoading, error]
    const [output, setOutput] = useState({
        players: null,
        error: undefined,
        isLoading: true,
    });

    useEffect(() => {
        if (!manifest) {
            return;
        }

        async function f() {
            let s = reducer(output, "isLoading", false);
            try {
                const data = await fetchApi("/api/players/");

                let players = [];
                for (const p of data.players) {
                    players.push(Player.fromApi(p, manifest));
                }

                s = reducer(s, "players", players);

                //clear any previous errors
                s = reducer(s, "error", undefined);
            } catch (err) {
                s = reducer(s, "error", err);
            }

            setOutput(s);
        }

        f();
    }, [manifest]);

    return [output.players, output.isLoading, output.error];
};

export const useFetchPlayerMetrics = (
    refreshInterval,
    memberId,
    platformId
) => {
    const [output, setOutput] = useState({
        metrics: null,
        isLoading: true,
        error: null,
    });

    const { global, dispatchGlobal } = useContext(GlobalContext);
    const manifest = global.manifest;

    useEffect(() => {
        if (!memberId || !platformId) {
            return;
        }
        const f = async () => {
            let s = reducer(output, "isLoading", false);
            try {
                const data = await fetchDestinyApi(
                    `https://www.bungie.net/Platform/Destiny2/${platformId}/Profile/${memberId}/?components=1100`
                );

                let metrics = PlayerMetrics.fromApi(data);
                s = reducer(s, "metrics", metrics);

                //clear any previous errors
                s = reducer(s, "error", undefined);
            } catch (err) {
                s = reducer(s, "error", err);
            }

            setOutput(s);
            timeoutId = startTimeout(f, refreshInterval);
        };

        f();

        let timeoutId;
        return () => {
            cleanUpTimeout(timeoutId);
        };
    }, []);

    return [output.metrics, output.isLoading, output.error];
};

export const useFetchPlayersMetrics = (players) => {
    const [output, setOutput] = useState({
        data: undefined,
        isLoading: undefined,
        errors: undefined,
    });

    useEffect(() => {
        if (!players || !players.length) {
            return;
        }

        const f = async () => {
            let s = reducer(output, "isLoading", false);

            let urls = players.map(async (p) => {
                let m = p;
                return fetchDestinyApi(
                    `https://www.bungie.net/Platform/Destiny2/${m.platformId}/Profile/${m.memberId}/?components=1100`
                ).catch((e) => {
                    /*
                    console.log(
                        `Error loading profile data for ${m.getFullName()} SKIPPING`,
                        e.message
                    );
                    */

                    return e;
                });
            });

            //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled
            //may want all settled, then if any error out we can just ignore them, as opposed
            //to not getting any data back
            Promise.all(urls)
                .then((values) => {
                    let out = [];

                    let errors = [];
                    for (let i = 0; i < values.length; i++) {
                        let value = values[i];

                        if (value instanceof Error) {
                            errors.push(value);
                            continue;
                        }

                        let metrics;
                        try {
                            metrics = PlayerMetrics.fromApi(value);
                        } catch (e) {
                            //this happens because sometimes some players will have no data
                            //not sure why
                            console.log(
                                "Error parsing metrics data. Skipping."
                            );
                            continue;
                        }

                        out.push({
                            player: players[i],
                            metrics: metrics,
                        });
                    }

                    //check if all calls results in errors
                    if (errors.length === values.length) {
                        //if so, throw the first error (assume they are all the same)
                        if (errors.length) {
                            //throw errors[0];
                        }
                    }

                    s = reducer(
                        s,
                        "errors",
                        errors.length ? errors : undefined
                    );

                    s = reducer(s, "data", out);
                })
                .catch((error) => {
                    s = reducer(s, "errors", [error]);
                })
                .finally(() => {
                    setOutput(s);
                });
        };
        f();

        //Promise.all();
    }, [players]);

    return [output.data, output.isLoading, output.errors];
};

export const useFetchPlayerProfile = (
    refreshInterval,
    memberId,
    platformId
) => {
    const [output, setOutput] = useState({
        profile: null,
        isLoading: true,
        error: null,
    });

    const { global, dispatchGlobal } = useContext(GlobalContext);
    const manifest = global.manifest;

    useEffect(() => {
        if (!memberId || !platformId) {
            return;
        }
        const f = async () => {
            let s = reducer(output, "isLoading", false);
            try {
                const data = await fetchDestinyApi(
                    `https://www.bungie.net/Platform/Destiny2/${platformId}/Profile/${memberId}/?components=100,200,202`
                );

                let profile = new PlayerProfile(data, manifest);
                s = reducer(s, "profile", profile);
            } catch (err) {
                s = reducer(s, "error", err);
            }

            setOutput(s);
            timeoutId = startTimeout(f, refreshInterval);
        };

        f();

        let timeoutId;
        return () => {
            cleanUpTimeout(timeoutId);
        };
    }, []);

    return [output.profile, output.isLoading, output.error];
};

//note, we wrap these to make it easier to log, debug in a single place
//and also remove some boiler plate code on whether they should run (refresh)
const startTimeout = (f, interval) => {
    if (!interval) {
        return;
    }

    const id = setTimeout(f, interval);
    return id;
};

const cleanUpTimeout = (id) => {
    if (id) {
        clearTimeout(id);
    }
};
