import { useParams } from "react-router-dom";
import ActivityList from "../components/activity_list"
import ActivitySummary from "../components/activity_summary";
import PlayerExperience from "../components/player_experience";
import PlayerHeader from "../components/player_header";
import { useFetchPlayerActivities, useFetchPlayerProfile } from "../data/hooks";
import { Mode, Moment } from "shared";
import ErrorView from "../components/error_view";


const PlayerSummaryView = () => {

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

export default PlayerSummaryView;