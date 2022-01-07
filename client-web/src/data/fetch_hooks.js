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
        console.log("version", version);

        const f = async () => {
            let response;
            let rawData;
            let remoteData;
            let updated = false;
            try {
                response = await fetch(`/manifest/${version}/`);
                rawData = await response.text();

                remoteData = JSON.parse(rawData);
                updated = remoteData.updated;
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
                out = new Manifest(remoteData);

                console.log("new manifest data found");
                storage.setItem(STORAGE_MANIFEST_DATA_KEY, rawData);

            } else if (storedData) {
                console.log("using stored manifest data");
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
                console.log(e);
                return;
            }

            const activityStats = new ActivityStats(data.activities, manifest);
            setActivityStats(activityStats);
        };

        load();
    }, [memberId, manifest]);

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
                console.log(e);
                return;
            }

            setPlayers(data.players);
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
            console.log(args.headers);
            try {
                response = await fetch(
                    `https://www.bungie.net/Platform/Destiny2/${platformId}/Profile/${memberId}/?components=100,200,202`,
                    args
                );
                data = await response.json()
            } catch (e) {
                console.log(e);
                return;
            }

            //TODO: need to check it wasnt an error returned.

            let p = new PlayerProfile(data.Response, manifest);
            setProfile(p);
        };

        fetchData();
    }, []);

    return profile;
}