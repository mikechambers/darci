import { useParams } from "react-router-dom";
import ActivityList from "./components/ActivityList";
import ActivitySummary from "./components/ActivitySummary";
import WeaponsView from "./components/WeaponsView";
import MetaView from "./components/MetaView";
import MedalsView from "./components/MedalsView";
import PlayerActivitiesHeader from "./components/PlayerActivitiesHeader";
import {
  useFetchPlayerActivities,
  useFetchPlayerProfile,
} from "../../hooks/remote";
import { Mode, Moment } from "shared";
import ErrorView from "../../components/ErrorView";
import HeadlineStat from "./components/HeadlineStat";
import StatDetail from "./components/StatDetail";
import { calculatePercent } from "../../utils";

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

  if (!activityStats) {
    return "";
  }

  let summary = activityStats.summary;
  let weapons = summary.weapons;
  let medals = summary.medals;
  let meta = activityStats.meta;

  mode = Mode.fromString(activityStats.query.mode);
  moment = Moment.fromString(activityStats.query.startMoment);

  return (
    <div>
      <PlayerActivitiesHeader
        playerName={activityStats.player.bungieDisplayName}
        playerNameCode={activityStats.player.bungieDisplayNameCode}
        classSelection={activityStats.query.classSelection}
        modeName={mode.toString()}
        momentName={moment.toString()}
        momentDate={activityStats.query.startDate}
      />
      <h2>SUMMARY</h2>

      <div className="headline_stat_container">
        <HeadlineStat
          label="win%"
          value={`${calculatePercent(
            summary.wins,
            summary.activityCount
          ).toFixed()}%`}
        />
        <HeadlineStat label="KD" value={summary.killsDeathsRatio.toFixed(2)} />
        <HeadlineStat label="EFF" value={summary.efficiency.toFixed(2)} />
      </div>
      <StatDetail />

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
