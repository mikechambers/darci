import { useParams } from "react-router-dom";
import { useState, useEffect, useContext, useReducer, useRef } from 'react';
import ActivityStats from "../data/activity_stats";
import ActivityList from "../components/activity_list"
import ActivitySummary from "../components/activity_summary";
import PlayerExperience from "../components/player_experience";
import PlayerHeader from "../components/player_header";
import { useFetchPlayerActivities, DATA_REFRESH_INTERVAL } from "../data/fetch_hooks";
import { useInterval } from "../utils";
import { Mode, Moment } from "shared";

const PlayerSummaryView = () => {
    const [_, forceUpdate] = useReducer((x) => x + 1, 0);

    let params = useParams();

    let mode = Mode.fromString(params.mode);
    let moment = Moment.fromString(params.moment);


    let activityStats = useFetchPlayerActivities(params.memberId, mode, moment);

    //forces the component to reload every N seconds, so we can reload data
    useInterval(() => {
        if (activityStats) {
            forceUpdate(_);
        }
    }, DATA_REFRESH_INTERVAL);

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