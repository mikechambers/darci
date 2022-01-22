import { useParams } from "react-router-dom";
import ActivityList from "./components/ActivityList"
import ActivitySummary from "./components/ActivitySummary";
import PlayerExperience from "./components/PlayerExperience";
import WeaponsView from "./components/WeaponsView";
import MedalsView from "./components/MedalsView";
import PlayerHeader from "./components/PlayerHeader";
import { useFetchPlayerActivities, useFetchPlayerProfile } from "../../hooks/remote";
import { Mode, Moment } from "shared";
import ErrorView from "../../components/ErrorView";
const { useQuery } = require("../../hooks/browser");

const PlayerView = () => {

    let params = useParams();

    let mode = Mode.fromString(params.mode);
    let moment = Moment.fromString(params.moment);

    let [profile, isProfileLoading, profileLoadError] = useFetchPlayerProfile(true, params.memberId, params.platformId);

    let [activityStats, isActivitiesLoading, activitiesLoadError] = useFetchPlayerActivities(true, params.memberId, mode, moment);

    let query = useQuery();
    let weaponCount = (query.get("weaponcount")) ? query.get("weaponcount") : 5;
    let medalCount = (query.get("medalcount")) ? query.get("medalcount") : 5;


    /*
    if (profileLoadError) {
        return <div>An error occured (profileLoadError) <br />{profileLoadError.toString()}<br />{profileLoadError.stack}</div>
    }
    */

    if (activitiesLoadError) {
        return <div>An error occured (activitiesLoadError) <br />{activitiesLoadError.toString()}<br />{activitiesLoadError.stack}</div>
    }

    let summary;
    let weapons;
    let medals;

    if (activityStats) {
        summary = activityStats.summary;
        weapons = summary.weapons;
        medals = summary.medals;
    }

    return (
        <div style={{ padding: "1rem 0" }}>
            <h2>Player</h2>
            <PlayerHeader />
            <PlayerExperience />
            <div style={{ display: "flex", alignItems: "baseline", justifyContent: "start",

            }}>
            <WeaponsView weapons={weapons} maxCount={weaponCount} />
            <MedalsView medals={medals} maxCount={medalCount} />
            </div>
            <ActivitySummary summary={summary} isLoading={isActivitiesLoading} />
            <ActivityList activityStats={activityStats} isLoading={isActivitiesLoading} />
            <ErrorView error={[activitiesLoadError, profileLoadError]} />
        </div>
    );

};

export default PlayerView;