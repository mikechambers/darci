import { AppContext } from "../app";
import ActivityStats from "./activity_stats"

import { useState, useContext, useEffect } from "react";
import Manifest from "../manifest";
import { Mode, Moment } from "shared";
import { DESTINY_API_KEY } from "../consts";
import PlayerProfile from "./player_profile";


const STORAGE_MANIFEST_DATA_KEY = "STORAGE_MANIFEST_DATA_KEY";

export const useFetchManifest = () => {

    const [manifest, setManifest] = useState(null);

    useEffect(() => {

        const storage = window.localStorage;
        let rawStoredData = storage.getItem(STORAGE_MANIFEST_DATA_KEY);
        let storedData;

        let version = "check";
        if (rawStoredData) {
            storedData = JSON.parse(rawStoredData);
            //need to json this
            version = encodeURIComponent(storedData.version);
        }

        const f = async () => {
            let response;
            let rawData;
            let remoteData;
            let updated = false;
            try {
                response = await fetch(`/manifest/${version}/`);
                rawData = await response.text();

                remoteData = JSON.parse(rawData);
                updated = remoteData.response.updated;
            } catch (e) {
                //todo: if we cant load data, we just return undefined for everything

                console.log("Error checking manifest version", e);

                if (!storedData) {
                    setManifest(new Manifest());
                    return;
                }
            }

            let out;
            if (updated) {
                out = new Manifest(remoteData.response);

                console.log("MANIFEST: new manifest data found");
                storage.setItem(STORAGE_MANIFEST_DATA_KEY, rawData);

            } else if (storedData) {
                console.log("MANIFEST: using stored manifest data");
                out = new Manifest(storedData);
            }
            setManifest(out);
        };

        f();
    }, []);

    return manifest;
};

export const useFetchPlayerActivities = (memberId, mode = Mode.ALL_PVP, moment = Moment.WEEK) => {
    const [activityStats, setActivityStats] = useState(null);
    const { global, dispatchGlobal } = useContext(AppContext);
    const manifest = global.manifest;

    useEffect(() => {

        if (!manifest) {
            return;
        }

        const load = async () => {
            console.log("useFetchPlayerActivities : loading data");

            let response;
            let data;
            try {
                response = await fetch(`/api/player/${memberId}/all/${mode.toString()}/${moment.toString()}/`);
                data = await response.json();
            } catch (e) {
                console.log("useFetchPlayerActivities Error", e);
                return;
            }

            const activityStats = new ActivityStats(data.response, manifest);
            setActivityStats(activityStats);
        };

        load();
    }, []);

    return activityStats;
}

export const useFetchPlayers = () => {

    const [players, setPlayers] = useState([]);
    useEffect(() => {

        async function fetchData() {
            let response;
            let data;
            try {
                response = await fetch('/api/players/');
                data = await response.json()
            } catch (e) {
                console.log("useFetchPlayers Error:", e);
                return;
            }

            setPlayers(data.response.players);
        };

        fetchData();
    }, []);

    return players;
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