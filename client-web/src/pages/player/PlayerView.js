import { useParams } from "react-router-dom";
import ActivityList from "./components/ActivityList"
import ActivitySummary from "./components/ActivitySummary";
import PlayerExperience from "./components/PlayerExperience";
import PlayerHeader from "./components/PlayerHeader";
import { useFetchPlayerActivities, useFetchPlayerProfile } from "../../hooks/remote";
import { Mode, Moment } from "shared";
import ErrorView from "../../components/ErrorView";


const PlayerView = () => {

    let params = useParams();

    let mode = Mode.fromString(params.mode);
    let moment = Moment.fromString(params.moment);

    let [profile, isProfileLoading, profileLoadError] = useFetchPlayerProfile(true, params.memberId, params.platformId);

    let [activityStats, isActivitiesLoading, activitiesLoadError] = useFetchPlayerActivities(true, params.memberId, mode, moment);

    return (
        <main style={{ padding: "1rem 0" }}>
            <h2>Player</h2>
            <PlayerHeader />
            <PlayerExperience />
            <ActivitySummary activityStats={activityStats} isLoading={isActivitiesLoading} />
            <ActivityList activityStats={activityStats} isLoading={isActivitiesLoading} />
            <ErrorView error={[activitiesLoadError, profileLoadError]} />
        </main>
    );

};

export default PlayerView;