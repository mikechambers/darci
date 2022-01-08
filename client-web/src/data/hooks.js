import { AppContext } from "../app";
import ActivityStats from "./activity_stats"

import { useState, useContext, useEffect } from "react";
import Manifest from "../manifest";
import { Mode, Moment } from "shared";
import { DESTINY_API_KEY } from "../consts";
import PlayerProfile from "./player_profile";

import { fetchApi } from "./load";


const STORAGE_MANIFEST_DATA_KEY = "STORAGE_MANIFEST_DATA_KEY";

export const useFetchManifest = () => {

    const [status, setStatus] = useState({
        manifest: null,
        isLoading: true,
        error: null,
    });

    useEffect(() => {

        const storage = window.localStorage;
        let rawStoredData = storage.getItem(STORAGE_MANIFEST_DATA_KEY);
        let storedData;

        let version = "check";
        if (rawStoredData) {

            try {
                storedData = JSON.parse(rawStoredData);
                version = encodeURIComponent(storedData.version);
            } catch (err) {
                let e = new Error("Error parsing locally stored manifest JSON.", { cause: err });
                let s = reducer(status, "error", e);
                s = reducer(s, "isLoading", false);
                return;
            }
        }

        const f = async () => {

            let s = reducer(status, "isLoading", false);
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
            }

            s = reducer(s, "manifest", manifest);
            s = reducer(s, "error", error);

            setStatus(s);
        }

        f();
    }, []);

    return [status.manifest, status.isLoading, status.error];
};

export const useFetchPlayerActivities = (memberId, mode = Mode.ALL_PVP, moment = Moment.WEEK) => {

    const [status, setStatus] = useState({
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

        const f = async () => {

            let s = reducer(status, "isLoading", false);
            try {
                const data = await fetchApi(`/api/player/${memberId}/all/${mode.toString()}/${moment.toString()}/`);
                const as = new ActivityStats(data, manifest);
                s = reducer(s, "activityStats", as);
            } catch (err) {
                s = reducer(s, "error", err);
            }

            setStatus(s);
        };

        f();
    }, []);

    return [status.activityStats, status.isLoading, status.error];
}

export const useFetchPlayers = () => {

    //return is [players, isLoading, error]
    const [status, setStatus] = useState(
        { players: [], error: undefined, isLoading: true }
    );

    useEffect(() => {

        async function f() {

            let s = reducer(status, "isLoading", false);
            try {
                const data = await fetchApi('/api/players/');
                s = reducer(s, "players", data.players);
            } catch (err) {
                s = reducer(s, "error", err);
            }

            setStatus(s);
        };

        f();
    }, []);

    return [status.players, status.isLoading, status.error];
}

export const useFetchPlayerProfile = (memberId, platformId) => {

    const [profile, setProfile] = useState();
    const { global, dispatchGlobal } = useContext(AppContext);
    const manifest = global.manifest;

    useEffect(() => {

        async function fetchData() {
            console.log("useFetchPlayerProfile : loading");

            let response;
            let data;
            let args = {
                headers: { 'X-API-Key': `${DESTINY_API_KEY}` }
            };

            try {
                let rnd = new Date().getTime();
                response = await fetch(
                    `https://www.bungie.net/Platform/Destiny2/${platformId}/Profile/${memberId}/?components=100,200,202&rnd=${rnd}`,
                    args
                );
                data = await response.json()
            } catch (e) {
                console.log("useFetchPlayerProfile Error", e);
                return;
            }

            /*            ​
                ErrorCode: 7  ​
                ErrorStatus: "ParameterParseFailure"
                Message: "Unable to parse your parameters.  Please correct them, and try again."
            */
            if (data.ErrorCode !== 1) {
                //TODO: Need to handle this
                console.log("Bungie API Error");
                console.log("ErrorCode : ", data.ErrorCode);
                console.log("ErrorMessage : ", data.Message);
            }

            let p = new PlayerProfile(data.Response, manifest);
            setProfile(p);
        };

        fetchData();
    }, []);

    return profile;
}

const reducer = (initial, type, payload) => {
    let out = { ...initial };
    out[type] = payload;
    return out;
}