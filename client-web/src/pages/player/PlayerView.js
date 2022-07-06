import { useParams } from "react-router-dom";
import ActivityList from "./components/ActivityList";
import ActivitySummary from "./components/ActivitySummary";
import PlayerExperience from "./components/PlayerExperience";
import WeaponsView from "./components/WeaponsView";
import MetaView from "./components/MetaView";
import MedalsView from "./components/MedalsView";
import PlayerHeader from "./components/PlayerHeader";
import {
  useFetchPlayerActivities,
  useFetchPlayerProfile,
} from "../../hooks/remote";
import { Mode, Moment } from "shared";
import ErrorView from "../../components/ErrorView";

const { useQuery } = require("../../hooks/browser");

const PlayerView = () => {
  let params = useParams();

  let mode = Mode.fromString(params.mode);
  let moment = Moment.fromString(params.moment);

  let [profile, isProfileLoading, profileLoadError] = useFetchPlayerProfile(
    true,
    params.memberId,
    params.platformId
  );

  let [activityStats, isActivitiesLoading, activitiesLoadError] =
    useFetchPlayerActivities(true, params.memberId, mode, moment);

  let query = useQuery();
  let weaponCount = query.get("weaponcount") ? query.get("weaponcount") : 5;
  let medalCount = query.get("medalcount") ? query.get("medalcount") : 5;
  let metaCount = query.get("metacount") ? query.get("metacount") : 5;

  /*
    if (profileLoadError) {
        return <div>An error occured (profileLoadError) <br />{profileLoadError.toString()}<br />{profileLoadError.stack}</div>
    }
    */

  if (activitiesLoadError) {
    return (
      <div>
        An error occured (activitiesLoadError) <br />
        {activitiesLoadError.toString()}
        <br />
        {activitiesLoadError.stack}
      </div>
    );
  }

  let summary;
  let weapons;
  let medals;
  let meta;
  let playerName = "";
  let playerNameCode = "";
  let modeDescription = "";
  let momentDescription = "";
  let charactersSelection = "";

  if (activityStats) {
    summary = activityStats.summary;
    weapons = summary.weapons;
    medals = summary.medals;
    meta = activityStats.meta;
    playerName = activityStats.player.bungieDisplayName;
    playerNameCode = `#${activityStats.player.bungieDisplayNameCode}`;
    charactersSelection = activityStats.query.classSelection;
    modeDescription = activityStats.query.mode;
    momentDescription = `${activityStats.query.startMoment} (${activityStats.query.startDate})`;
  }

  return (
    <div>
      <div class="player_view_header">
        <span>{playerName}</span>
        <span>{playerNameCode}</span> &nbsp;&gt;&nbsp;
        <span>{charactersSelection}</span>&nbsp;&gt;&nbsp;
        <span>{modeDescription}</span>&nbsp;&gt;&nbsp;
        <span>{momentDescription}</span>
      </div>
      <h2>SUMMARY</h2>
      <ActivitySummary summary={summary} isLoading={isActivitiesLoading} />

      <div
        style={{
          display: "flex",
          alignItems: "start",
          justifyContent: "start",
        }}
      >
        <MedalsView medals={medals} maxCount={medalCount} />
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "start",
          justifyContent: "start",
        }}
      >
        <div>
          <h2>WEAPONS</h2>
          <WeaponsView weapons={weapons} maxCount={weaponCount} />
        </div>

        <div>
          <h2>META</h2>
          <MetaView meta={meta} maxCount={metaCount} />
        </div>
      </div>

      <ActivityList
        activityStats={activityStats}
        isLoading={isActivitiesLoading}
      />
      <ErrorView error={[activitiesLoadError, profileLoadError]} />
    </div>
  );
};

export default PlayerView;
