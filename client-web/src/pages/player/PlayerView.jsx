import { useParams } from "react-router-dom";
import ActivitiesDetail from "./components/ActivitiesDetail";
import WeaponsDetail from "./components/WeaponsDetail";
import WeaponMetaDetail from "./components/WeaponMetaDetail";
import MedalHighlights from "./components/MedalHighlights";
import MapsDetail from "./components/MapsDetail";
import PlayerActivitiesHeader from "./components/PlayerActivitiesHeader";
import {
  useFetchPlayerActivities,
  useFetchPlayerProfile,
} from "../../hooks/remote";
import { CharacterClassSelection, Mode, Moment } from "shared";
import ErrorView from "../../components/ErrorView";

import TimePlayed from "./components/TimePlayed";

import StatDetails from "./components/StatDetails";
import StatHighlights from "./components/StatHighlights";
import PlayerOverviewBackgroundImage from "./images/player_overview_background.png";

const { useQuery } = require("../../hooks/browser");

const playerOverviewStyle = {
  padding: "var(--content-padding)",
  height: "500px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-around",

  backgroundImage: `url(${PlayerOverviewBackgroundImage})`,
  backgroundRepeat: "repeat",
};

const weaponsStyle = {
  paddingTop: "24px",
  display: "flex",
};

const playerHeaderStyle = {
  padding: "var(--content-padding)",
  height: "200px",
  display: "flex",
  alignItems: "center",
};

const PlayerView = () => {
  let params = useParams();

  let mode = Mode.fromString(params.mode);
  let moment = Moment.fromString(params.moment);
  let classSelection = CharacterClassSelection.fromString(params.classType);

  let [profile, isProfileLoading, profileLoadError] = useFetchPlayerProfile(
    true,
    params.memberId,
    params.platformId
  );

  let [activityStats, isActivitiesLoading, activitiesLoadError] =
    useFetchPlayerActivities(
      true,
      params.memberId,
      mode,
      moment,
      classSelection
    );

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
  let maps = activityStats.maps;

  mode = Mode.fromString(activityStats.query.mode);
  moment = Moment.fromString(activityStats.query.startMoment);
  classSelection = CharacterClassSelection.fromString(
    activityStats.query.classSelection
  );

  return (
    <div id="player_overview_view">
      <div id="player_overview_header" style={playerHeaderStyle}>
        <PlayerActivitiesHeader
          player={activityStats.player}
          classSelection={classSelection}
          mode={mode}
          moment={moment}
        />
      </div>

      <div style={playerOverviewStyle}>
        <StatHighlights summary={summary} />
        <StatDetails summary={summary} />
        <MedalHighlights medals={medals} max={medalCount} />
        <TimePlayed seconds={summary.timePlayedSeconds} />
      </div>

      <div style={weaponsStyle}>
        <WeaponsDetail weapons={weapons} max={weaponCount} />
        <WeaponMetaDetail weapons={meta} max={weaponCount} />
      </div>

      <div>
        <h2>Maps</h2>
        <MapsDetail maps={maps} />
      </div>

      <div>
        <h2>Games</h2>
        <ActivitiesDetail
          activities={activityStats.activities}
          isLoading={isActivitiesLoading}
        />
      </div>

      <ErrorView error={[activitiesLoadError, profileLoadError]} />
    </div>
  );
};

export default PlayerView;
