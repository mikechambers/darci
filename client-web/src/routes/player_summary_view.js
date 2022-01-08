import { useParams } from "react-router-dom";
import { useReducer } from 'react';
import ActivityList from "../components/activity_list"
import ActivitySummary from "../components/activity_summary";
import PlayerExperience from "../components/player_experience";
import PlayerHeader from "../components/player_header";
import { useFetchPlayerActivities, useFetchPlayerProfile } from "../data/hooks";
import { useInterval } from "../utils";
import { Mode, Moment } from "shared";
import { DATA_REFRESH_INTERVAL } from '../consts';

const PlayerSummaryView = () => {
    const [_, forceUpdate] = useReducer((x) => x + 1, 0);

    let params = useParams();

    let mode = Mode.fromString(params.mode);
    let moment = Moment.fromString(params.moment);

    let profile = useFetchPlayerProfile(params.memberId, params.platformId);

    let [activityStats, isLoading, error] = useFetchPlayerActivities(params.memberId, mode, moment);

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
            <ActivitySummary activityStats={activityStats} isLoading={isLoading} />
            <ActivityList activityStats={activityStats} isLoading={isLoading} />
        </main>
    );

};

export default PlayerSummaryView;