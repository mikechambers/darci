import { AppContext } from "../app";
import ActivityStats from "./activity_stats"

import { useState, useContext, useEffect } from "react";

export const DATA_REFRESH_INTERVAL = 60 * 1000; //1  minute

export const useFetchPlayerActivities = (memberId) => {
    const [activityStats, setActivityStats] = useState(null);
    const { global, dispatchGlobal } = useContext(AppContext);
    const manifest = global.manifest;

    useEffect(() => {

        const load = async () => {
            console.log("useFetchPlayerActivities : loading data");

            let response;
            let data;
            try {
                response = await fetch(`/api/player/${memberId}/all/all_pvp/weekly/`);
                data = await response.json()
            } catch (e) {
                console.log(e);
                return;
            }

            const activityStats = new ActivityStats(data.activities, manifest);
            setActivityStats(activityStats);
        };

        load();
    }, [memberId]);

    return activityStats;
}

export const useFetchPlayers = () => {

    const [players, setPlayers] = useState([]);
    useEffect(() => {

        async function featchData() {
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

        featchData();
    }, []);

    return players;
}