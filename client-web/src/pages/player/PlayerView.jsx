import { useParams } from "react-router-dom";
import ActivitiesDetail from "./components/ActivitiesDetail";
import WeaponsDetail from "./components/WeaponsDetail";
import WeaponMetaDetail from "./components/WeaponMetaDetail";
import MedalHighlights from "./components/MedalHighlights";
import MapsDetail from "./components/MapsDetail";
import PlayerActivitiesOverview from "./components/PlayerViewOverview";
import {
  useFetchPlayerActivities,
  useFetchPlayerProfile,
} from "../../hooks/remote";
import { CharacterClassSelection, Mode, Moment } from "shared";
import ErrorView from "../../components/ErrorView";
import StatHighlight from "./components/StatHighlight";
import StatDetail from "./components/StatDetail";
import TimePlayed from "./components/TimePlayed";
import GamesDetail from "./components/GamesDetail";
import KillsStatDetail from "./components/KillsStatDetail";
import { calculatePercent, calculateAverage } from "../../utils";
import PlayerViewConfig from "./components/PlayerViewConfig";
import ExperienceContainer from "./components/ExperienceContainer";
import PlayerProfile from "../../data/PlayerProfile";

const { useQuery } = require("../../hooks/browser");

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
  let player = activityStats.player;

  mode = Mode.fromString(activityStats.query.mode);
  moment = Moment.fromString(activityStats.query.startMoment);
  classSelection = CharacterClassSelection.fromString(activityStats.query.classSelection);

  return (
    <div>
      <PlayerViewConfig mode={mode} moment={moment} classSelection={classSelection} player={player}/>
      <PlayerActivitiesOverview
        playerName={activityStats.player.bungieDisplayName}
        playerNameCode={activityStats.player.bungieDisplayNameCode}
        classSelection={classSelection}
        modeName={mode.toString()}
        momentName={moment.toString()}
        momentDate={new Date(activityStats.query.startDate)}
      />

      <TimePlayed seconds={summary.timePlayedSeconds} />

      <div>&nbsp;</div>
      <div className="stat_highlight_container">
        <StatHighlight
          label="win%"
          value={`${calculatePercent(
            summary.wins,
            summary.activityCount
          ).toFixed()}%`}
        />
        <StatHighlight label="KD" value={summary.killsDeathsRatio.toFixed(2)} />
        <StatHighlight label="EFF" value={summary.efficiency.toFixed(2)} />
      </div>

      <h2>Overview</h2>

      <div className="stat_detail_container">
        <GamesDetail
          wins={summary.wins}
          losses={summary.losses}
          mercies={summary.mercies}
          activity_count={summary.activityCount}
        />

        <StatDetail
          avg={calculateAverage(summary.kills, summary.activityCount).toFixed(
            2
          )}
          total={summary.kills}
          high={summary.highestKills}
          title="kills"
        />

        <KillsStatDetail
          total={summary.kills}
          weapons={summary.weaponKills}
          supers={summary.superKills}
          melees={summary.meleeKills}
        />

        <StatDetail
          avg={calculateAverage(summary.assists, summary.activityCount).toFixed(
            2
          )}
          total={summary.assists}
          high={summary.highestAssists}
          title="assists"
        />

        <StatDetail
          avg={calculateAverage(
            summary.opponentsDefeated,
            summary.activityCount
          ).toFixed(2)}
          total={summary.opponentsDefeated}
          high={summary.highestOpponentsDefeated}
          title="defeats"
        />

        <StatDetail
          avg={calculateAverage(summary.deaths, summary.activityCount).toFixed(
            2
          )}
          total={summary.deaths}
          high={summary.highestDeaths}
          title="deaths"
        />
      </div>
      <ExperienceContainer profile={profile}/>

      <div>&nbsp;</div>

      <div
        style={{
          display: "flex",
          alignItems: "start",
          justifyContent: "start",
        }}
      >
        <MedalHighlights medals={medals} max={medalCount} />
      </div>

      <div>
        <h2>Weapons</h2>
        <WeaponsDetail weapons={weapons} max={weaponCount} />
      </div>

      <div>
        <h2>Meta</h2>
        <WeaponMetaDetail meta={meta} max={metaCount} />
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
