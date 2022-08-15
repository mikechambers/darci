import { useNavigate, useParams } from "react-router-dom";
import PlayerActivityList from "./components/PlayerActivityList";
import PlayerWeaponsDetailView from "./components/PlayerWeaponsDetailView";
import PlayerMapSummaryList from "./components/PlayerMapSummaryList";
import PlayerActivitiesHeader from "./components/PlayerActivitiesHeader";

import {
  useFetchPlayerActivities,
  useFetchPlayerSummary,
} from "../../hooks/remote";

import { CharacterClassSelection, Mode, Moment } from "shared";
import PlayerMedalsDetailList from "./components/PlayerMedalsDetailList";
import PlayerSelectView from "../../components/PlayerSelectView";
import React, { useEffect, useState } from "react";
import RefreshStatusView from "../../components/RefreshStatusView";
import { PLAYER_VIEW_REFRESH_INTERVAL } from "../../core/consts";
import PlayerPerformanceSummaryView from "./components/PlayerPerformanceSummaryView";
import PageSectionView from "../../components/PageSectionView";
import ScreenNavigationView from "../../components/ScreenNavigationView";
import LoadingAnimationView from "../../components/LoadingAnimationView";
const { useQuery } = require("../../hooks/browser");

const invalidParametersStyle = {
  padding: "var(--padding-page-container)",
  display: "flex",
  width: "100%",
  height: "100%",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  rowGap: 8,
};

const gappedStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "30px",
};

const pageContainerStyle = {
  minWidth: "720px",
};

const itemDetailsStyle = {
  display: "flex",
  flexWrap: "wrap",
  gap: "30px",
};

const pageLinks = [
  {
    value: "Overview",
    id: "overview",
  },
  {
    value: "Weapons",
    id: "weapons",
  },
  {
    value: "Meta Weapons",
    id: "meta",
  },
  {
    value: "medals",
    id: "medals",
  },
  {
    value: "maps",
    id: "maps",
  },
  {
    value: "games",
    id: "games",
  },
];

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
      PLAYER_VIEW_REFRESH_INTERVAL,
      params.memberId,
      mode,
      moment,
      classSelection,
      hash
    );

  let [playerActivities, isPlayerActivitiesLoading, playerActivitiesLoadError] =
    useFetchPlayerActivities(
      PLAYER_VIEW_REFRESH_INTERVAL,
      params.memberId,
      mode,
      moment,
      classSelection,
      hash
    );

  const [lastUpdate, setLastUpdate] = useState();
  useEffect(() => {
    //console.log("updated", new Date());
    setLastUpdate(new Date());
  }, [playerSummary]);

  let navigate = useNavigate();
  if (!params.memberId || !params.mode || !params.moment || !params.classType) {
    const onPlayerConfigUpdate = (url) => {
      navigate(url);
    };

    return (
      <div style={invalidParametersStyle}>
        <div className="page_title">Invalid Parameters</div>
        <div>Please select Player parameters:</div>
        <div>
          <PlayerSelectView onUpdate={onPlayerConfigUpdate} />
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

  if (isPlayerActivitiesLoading && isPlayerSummaryLoading) {
    return <LoadingAnimationView message="Loading Player data." />;
  }

  let summary = playerSummary.summary;
  let weapons = summary.weapons;
  let medals = summary.medals;
  let meta = playerSummary.meta;
  let maps = playerSummary.maps;
  let player = playerSummary.player;

  let activities = playerActivities ? playerActivities.activities : [];

  mode = Mode.fromString(playerSummary.query.mode);
  moment = Moment.fromString(playerSummary.query.startMoment);
  classSelection = CharacterClassSelection.fromString(
    playerSummary.query.classSelection
  );

  return (
    <div id="page_nav" className="page_containter" style={pageContainerStyle}>
      <div style={gappedStyle}>
        <ScreenNavigationView links={pageLinks} />
        <RefreshStatusView
          lastUpdate={lastUpdate}
          refreshInterval={PLAYER_VIEW_REFRESH_INTERVAL}
          align="left"
        />

        <div id="overview">
          <PlayerActivitiesHeader
            player={player}
            classSelection={classSelection}
            mode={mode}
            moment={moment}
          />
        </div>

        <PlayerPerformanceSummaryView summary={summary} medals={medals} />

        <div style={itemDetailsStyle}>
          <div>
            {" "}
            <PageSectionView
              id="weapons"
              title="Weapons"
              description="Your weapon stats"
            />
            <PlayerWeaponsDetailView weapons={weapons} />
          </div>
          <div>
            <PageSectionView
              id="meta"
              title="Meta Weapons"
              description="Weapon meta from your matches excluding you and your fireteam members"
            />
            <PlayerWeaponsDetailView weapons={meta} />
          </div>
          <div>
            <PageSectionView
              id="medals"
              title="Medals"
              description="Medals earned in matches"
            />
            <PlayerMedalsDetailList
              medals={medals}
              activityCount={summary.activityCount}
            />
          </div>
        </div>
        <div>
          <PageSectionView
            id="maps"
            description="Stats broken down by map"
            title="Maps"
          />
          <PlayerMapSummaryList maps={maps} />
        </div>
        <PageSectionView
          description="Most recent matches"
          id="games"
          title="Games"
        />
        <PlayerActivityList activities={activities} summary={summary} />
      </div>
    </div>
  );
};

export default PlayerView;
