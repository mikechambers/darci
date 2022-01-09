import { AppContext } from "../app";
import ActivityStats from "./activity_stats"

import { useState, useContext, useEffect } from "react";
import Manifest from "../manifest";
import { Mode, Moment } from "shared";
import PlayerProfile from "./player_profile";

import { DATA_REFRESH_INTERVAL, MANIFEST_CHECK_INTERVAL } from "../consts";

import { fetchApi, fetchDestinyApi } from "./load";

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

        let lastCheckTimeStamp = storage.getItem(STORAGE_MANIFEST_LAST_CHECK_KEY);

        let now = (new Date()).getTime();

        //if we checked (without an error) within the last N amount of time
        //then abort check
        if (lastCheckTimeStamp) {
            if (now - lastCheckTimeStamp < MANIFEST_CHECK_INTERVAL) {
                return;
            }
        }

        let rawStoredData = storage.getItem(STORAGE_MANIFEST_DATA_KEY);
        let storedData;

        let version = "check";
        if (rawStoredData) {

            try {
                storedData = JSON.parse(rawStoredData);
                version = encodeURIComponent(storedData.version);
            } catch (err) {
                let e = new Error("Error parsing locally stored manifest JSON.", { cause: err });
                let s = reducer(output, "error", e);
                s = reducer(s, "isLoading", false);
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
                error = new Error("Error fetching manifest data from server.",
                    { cause: err }
                );
            }

            let manifest;
            if (error) {
                //if error occured and we have stored data, then use the stored data
                if (storedData) {
                    manifest = new Manifest(storedData);
                    console.log("Error loading manifest data. Used stored manifest",
                        error
                    );
                    error = null;
                }
            } else {
                if (data.updated) {
                    storage.setItem(STORAGE_MANIFEST_DATA_KEY, JSON.stringify(data));
                    manifest = new Manifest(data);
                } else {
                    manifest = new Manifest(storedData);
                }

                storage.setItem(STORAGE_MANIFEST_LAST_CHECK_KEY, now);
            }

            s = reducer(s, "manifest", manifest);
            s = reducer(s, "error", error);

            setOutput(s);
        }

        f();
    }, []);

    return [output.manifest, output.isLoading, output.error];
};

export const useFetchPlayerActivities = (refresh, memberId, mode = Mode.ALL_PVP, moment = Moment.WEEK) => {

    const [output, setOutput] = useState({
        activityStats: [],
        isLoading: true,
        error: undefined,
    });

    const { global, dispatchGlobal } = useContext(AppContext);
    const manifest = global.manifest;

    useEffect(() => {

        if (!manifest) {
            return;
        }

        let interval;
        const f = async () => {

            let s = reducer(output, "isLoading", false);
            try {
                const data = await fetchApi(`/api/player/${memberId}/all/${mode.toString()}/${moment.toString()}/`);
                const as = new ActivityStats(data, manifest);
                s = reducer(s, "activityStats", as);
            } catch (err) {
                s = reducer(s, "error", err);
            }

            setOutput(s);

            if (refresh) {
                return initTimeout(f);
            }
        };

        f();
    }, []);

    return [output.activityStats, output.isLoading, output.error];
}

export const useFetchPlayers = () => {

    //return is [players, isLoading, error]
    const [output, setOutput] = useState(
        { players: [], error: undefined, isLoading: true }
    );

    useEffect(() => {

        async function f() {

            let s = reducer(output, "isLoading", false);
            try {
                const data = await fetchApi('/api/players/');
                s = reducer(s, "players", data.players);
            } catch (err) {
                s = reducer(s, "error", err);
            }

            setOutput(s);
        };

        f();
    }, []);

    return [output.players, output.isLoading, output.error];
}

export const useFetchPlayerProfile = (refresh, memberId, platformId) => {

    const [output, setOutput] = useState({
        profile: null,
        isLoading: true,
        error: null,
    });

    const { global, dispatchGlobal } = useContext(AppContext);
    const manifest = global.manifest;

    useEffect(() => {

        const f = async () => {
            let s = reducer(output, "isLoading", false);
            try {
                const data = await fetchDestinyApi(
                    `https://www.bungie.net/Platform/Destiny2/${platformId}/Profile/${memberId}/?components=100,200,202`);

                let profile = PlayerProfile(data, manifest);
                s = reducer(s, "profile", profile);

            } catch (err) {
                s = reducer(s, "error", err);
            }

            setOutput(s);

            if (refresh) {
                return initTimeout(f);
            }
        };

        f();

    }, []);

    return [output.profile, output.isLoading, output.error];
}

const initTimeout = (f) => {

    const id = setTimeout(() => {
        f();
    }, DATA_REFRESH_INTERVAL);

    return () => {
        console.log("clearTimeout", id);
        clearInterval(id);
    };

    console.log("setTimeout", id);

}

const reducer = (initial, type, payload) => {
    let out = { ...initial };
    out[type] = payload;
    return out;
}