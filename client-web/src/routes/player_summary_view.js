import { useParams } from "react-router-dom";
import { useState, useEffect, useContext, useReducer, useRef } from 'react';
import ActivityStats from "../data/activity_stats";
import ActivityList from "../components/activity_list"
import ActivitySummary from "../components/activity_summary";
import PlayerExperience from "../components/player_experience";
import PlayerHeader from "../components/player_header";
import { AppContext } from "../app";
import Action, { PLAYER_SUMMARY_VIEW_STATE_UPDATED } from "../app_state/action";

const PLAYER_STATS_UPDATED = "PLAYER_STATS_UPDATED";
const MEMBER_ID_UPDATED = "MEMBER_ID_UPDATED";

export const playerSummaryViewInitialState = {
    memberId: null,
    activityStats: null,
};



const reducer = (state, action) => {

    let out = state;
    switch (action.type) {
        case PLAYER_STATS_UPDATED:
            out = {
                ...state,
                activityStats: action.payload,
            };
            break;
        case MEMBER_ID_UPDATED:
            out = {
                ...state,
                activityStats: null,
                memberId: action.payload,
            };
            break;
    }

    return out;

}

function useFetchPlayerActivities(memberId) {
    const [activityStats, setActivityStats] = useState(null);
    const { global, dispatchGlobal } = useContext(AppContext);
    const manifest = global.manifest;

    useEffect(() => {

        const load = async () => {
            let response;
            let data;
            try {
                console.log("fetch");
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
    }, [memberId, forceFlag]);


    return activityStats;
}

function useInterval(callback, interval) {
    console.log("use interval");
    useEffect(() => {
        if (!interval) {
            return;
        }

        const intervalId = setInterval(() => {
            console.log("interval tick");
            callback();
        }, interval);

        return () => {
            console.log("clear interval");
            clearInterval(intervalId);
        };
    });
}



//todo: create global state for view
const PlayerSummaryView = () => {

    console.log("PlayerSummaryView");
    const [_, forceUpdate] = useReducer((x) => x + 1, 0);

    let params = useParams();
    let activityStats = useFetchPlayerActivities(params.memberId);

    //forces the component to reload every N seconds, so we can reload data
    useInterval(() => {
        if (activityStats) {
            forceUpdate(_);
        }
    }, 60 * 1000);

    return (
        <main style={{ padding: "1rem 0" }}>
            <h2>Player</h2>
            <PlayerHeader />
            <PlayerExperience />
            <ActivitySummary activityStats={activityStats} />
            <ActivityList activityStats={activityStats} />
        </main>
    );

};

export default PlayerSummaryView;