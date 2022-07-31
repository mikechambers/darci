import { useNavigate, useParams } from "react-router-dom";
import ActivityList from "./components/ActivityList";
import WeaponsDetail from "./components/WeaponsDetail";
import WeaponMetaDetail from "./components/WeaponMetaDetail";
import MedalHighlights from "./components/MedalHighlights";
import MapsDetail from "./components/MapsDetail";
import PlayerActivitiesHeader from "./components/PlayerActivitiesHeader";

import {
  useFetchPlayerActivities,
  useFetchPlayerSummary,
} from "../../hooks/remote";

import { CharacterClassSelection, Mode, Moment } from "shared";

import TimePlayed from "./components/TimePlayed";

import StatDetails from "./components/StatDetails";
import StatHighlights from "./components/StatHighlights";
import PlayerOverviewBackgroundImage from "./images/player_overview_background.png";
import MedalsDetail from "./components/MedalsDetail";
import PlayerViewConfig from "../../components/PlayerViewConfig";
const { useQuery } = require("../../hooks/browser");

const playerOverviewStyle = {
  padding: "var(--content-padding)",
  height: "460px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-around",

  backgroundImage: `url(${PlayerOverviewBackgroundImage})`,
  backgroundRepeat: "repeat",
};

const weaponsStyle = {
  paddingTop: "24px",
  display: "flex",
  flexWrap: "wrap",
  rowGap: "var( --list-item-gap)",
};

const playerHeaderStyle = {
  padding: "var(--content-padding)",
  height: "180px",
  display: "flex",
  alignItems: "center",
};

const invalidParametersStyle = {
  padding: "var(--content-padding)",
  display: "flex",
  width: "100%",
  height: "100%",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
};

const PlayerView = () => {
  let params = useParams();
  let query = useQuery();

  let mode = Mode.fromString(params.mode);
  let moment = Moment.fromString(params.moment);
  let classSelection = CharacterClassSelection.fromString(params.classType);
  let hash = query.get("fr");

  /*
  let [profile, isProfileLoading, profileLoadError] = useFetchPlayerProfile(
    true,
    params.memberId,
    params.platformId
  );
  */
  //console.log(params.memberId, mode.label, moment.label, classSelection.label);
  let [playerSummary, isPlayerSummaryLoading, playerSummaryLoadError] =
    useFetchPlayerSummary(
      true,
      params.memberId,
      mode,
      moment,
      classSelection,
      hash
    );

  let [playerActivities, isPlayerActivitiesLoading, playerActivitiesLoadError] =
    useFetchPlayerActivities(
      true,
      params.memberId,
      mode,
      moment,
      classSelection,
      hash
    );

  let navigate = useNavigate();
  if (!params.memberId || !params.mode || !params.moment || !params.classType) {
    const onPlayerConfigUpdate = (url) => {
      navigate(url);
    };

    return (
      <div style={invalidParametersStyle}>
        <div className="page_title">Invalid Parameters</div>
        <div className="page_subtitle">Please select Player parameters:</div>
        <div>
          <PlayerViewConfig onUpdate={onPlayerConfigUpdate} />
        </div>
      </div>
    );
  }

  /*
    if (profileLoadError) {
        return <div>An error occured (profileLoadError) <br />{profileLoadError.toString()}<br />{profileLoadError.stack}</div>
    }
    */

  if (playerSummaryLoadError) {
    return (
      <div style={invalidParametersStyle}>
        <div className="page_title">Error loading Activities</div>
        <div>{playerSummaryLoadError.toString()}</div>
        <div>{playerSummaryLoadError.stack}</div>
      </div>
    );
  }

  if (!playerSummary) {
    return "";
  }

  let summary = playerSummary.summary;
  let weapons = summary.weapons;
  let medals = summary.medals;
  let meta = playerSummary.meta;
  let maps = playerSummary.maps;
  let player = playerSummary.player;

  let activities = playerActivities ? playerActivities.activities : [];
  let isActivitiesLoading = false;

  mode = Mode.fromString(playerSummary.query.mode);
  moment = Moment.fromString(playerSummary.query.startMoment);
  classSelection = CharacterClassSelection.fromString(
    playerSummary.query.classSelection
  );

  const gappedStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "30px",
    background:
      "linear-gradient(180deg, var(--background-color) 0%, rgba(54,54,54,1) 100%)",
  };

  return (
    <div>
      <div id="player_overview_header" style={playerHeaderStyle}>
        <PlayerActivitiesHeader
          player={player}
          classSelection={classSelection}
          mode={mode}
          moment={moment}
        />
      </div>

      <div style={gappedStyle}>
        <div style={playerOverviewStyle}>
          <StatHighlights summary={summary} />
          <StatDetails summary={summary} />
          <MedalHighlights medals={medals} />
          <TimePlayed seconds={summary.timePlayedSeconds} />
        </div>

        <div style={weaponsStyle}>
          <WeaponsDetail weapons={weapons} />
          <WeaponMetaDetail weapons={meta} />
          <MedalsDetail medals={medals} activityCount={summary.activityCount} />
        </div>

        <div>
          <MapsDetail maps={maps} />
        </div>

        <div>
          <ActivityList
            activities={activities}
            summary={summary}
            isLoading={isActivitiesLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default PlayerView;
