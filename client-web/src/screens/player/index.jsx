/* MIT License
 *
 * Copyright (c) 2023 Mike Chambers
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import { useNavigate, useParams } from "react-router-dom";
import PlayerActivityList from "./components/PlayerActivityList";
import PlayerWeaponsDetailView, {
    WEAPONS_DETAIL_GAME,
} from "./components/PlayerWeaponsDetailView";
import PlayerMapSummaryList from "./components/PlayerMapSummaryList";
import PlayerActivitiesHeader from "./components/PlayerActivitiesHeader";
import TeamPerformance from "./components/TeamPerformanceView";

import {
    useFetchPlayerActivities,
    useFetchPlayerSummary,
} from "../../hooks/remote";

import { CharacterClassSelection, Mode, Moment, OrderBy, Season } from "shared";
import PlayerMedalsDetailList from "./components/PlayerMedalsDetailList";
import PlayerConfigSelectView from "../../components/PlayerConfigSelectView";
import React, { useEffect, useState } from "react";
import RefreshStatusView from "../../components/RefreshStatusView";
import {
    MOMENT_TYPE,
    SEASON_TYPE,
    PLAYER_VIEW_REFRESH_INTERVAL,
} from "../../core/consts";
import PlayerPerformanceSummaryView from "./components/PlayerPerformanceSummaryView";
import PageSectionView from "../../components/PageSectionView";
import ScreenNavigationView from "../../components/ScreenNavigationView";
import LoadingAnimationView from "../../components/LoadingAnimationView";
import PlayerMetaWeaponsDetailView from "./components/PlayerMetaWeaponsDetailView";
import ErrorContainerView from "../../components/ErrorContainerView";
import LobbyMetaView from "./components/LobbyMetaView";
import PlayerProfileView from "./components/profile/PlayerProfileView";

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

const teamPerformanceStyle = {
    width: "100%",
};

const loadLatestLinkStyle = {
    padding: "15px 0",
};

const itemDetailsStyle = {
    display: "flex",
    flexWrap: "wrap",
    gap: 30,
};

const pageLinks = [
    {
        value: "Profile",
        id: "profile",
    },
    {
        value: "Overview",
        id: "overview",
    },
    {
        value: "Players",
        id: "teamPerformance",
    },

    {
        value: "Meta",
        id: "classMeta",
    },
    {
        value: "Weapons",
        id: "weapons",
    },
    {
        value: "Meta",
        id: "meta",
    },
    {
        value: "medals",
        id: "medals",
    },

    {
        value: "games",
        id: "games",
    },
    {
        value: "maps",
        id: "maps",
    },
];

const PlayerView = () => {
    let params = useParams();
    let query = useQuery();

    const memberId = params.memberId;
    const platformId = params.platformId;

    let mode = Mode.fromType(params.mode);

    let startMoment;
    let endMoment;

    const momentType =
        params.momentType === MOMENT_TYPE ? MOMENT_TYPE : SEASON_TYPE;
    if (momentType === MOMENT_TYPE) {
        startMoment = Moment.fromType(params.startMoment);
        endMoment = params.endMoment
            ? Moment.fromType(params.endMoment)
            : Moment.NOW;
    } else {
        let s = Season.fromType(params.startMoment);
        startMoment = s.startMoment;
        endMoment = s.endMoment;
    }

    let characterClass = CharacterClassSelection.fromType(params.classType);
    let hash = query.get("fr");

    let orderBy = OrderBy.fromId(query.get("orderby"));

    let [playerSummary, isPlayerSummaryLoading, playerSummaryLoadError] =
        useFetchPlayerSummary({
            refreshInterval: PLAYER_VIEW_REFRESH_INTERVAL,
            memberId: memberId,
            mode,
            startMoment,
            endMoment,
            characterClass,
            hash,
        });

    let [
        playerActivities,
        isPlayerActivitiesLoading,
        playerActivitiesLoadError,
    ] = useFetchPlayerActivities({
        refreshInterval: PLAYER_VIEW_REFRESH_INTERVAL,
        memberId: memberId,
        mode,
        startMoment,
        endMoment,
        characterClass,
        hash,
        orderBy,
    });

    const [lastUpdate, setLastUpdate] = useState();
    useEffect(() => {
        setLastUpdate(new Date());
    }, [playerSummary]);

    let navigate = useNavigate();
    if (
        !params.memberId ||
        !params.mode ||
        !params.startMoment ||
        !params.classType
    ) {
        const onPlayerConfigUpdate = (url) => {
            navigate(url);
        };

        return (
            <div style={invalidParametersStyle}>
                <div className="page_title">Invalid Parameters</div>
                <div>Please select Player parameters:</div>
                <div>
                    <PlayerConfigSelectView onUpdate={onPlayerConfigUpdate} />
                </div>
            </div>
        );
    }

    const errors = [];

    if (playerActivitiesLoadError) {
        errors.push(playerActivitiesLoadError);
    }

    if (playerSummaryLoadError) {
        errors.push(playerSummaryLoadError);
        return <ErrorContainerView errors={errors} />;
    }

    const onLatestActivityClick = (e, memberId) => {
        e.stopPropagation();
        e.preventDefault();
        navigate(`/latest/${memberId}`);
    };

    if (isPlayerActivitiesLoading || isPlayerSummaryLoading) {
        return <LoadingAnimationView message="Loading Player data." />;
    }

    const summary = playerSummary.summary;
    const weapons = summary.weapons;
    const medals = summary.medals;
    const meta = playerSummary.meta;
    const maps = playerSummary.maps;
    const player = playerSummary.player;
    const characterClassMeta = playerSummary.characterClassMeta;
    const playerTeamPerformance = playerSummary.playerTeamPerformance;
    const opponentTeamPerformance = playerSummary.opponentTeamPerformance;

    const activities = playerActivities ? playerActivities.activities : [];

    mode = Mode.fromType(playerSummary.query.mode);
    startMoment = Moment.fromType(playerSummary.query.startMoment);
    characterClass = CharacterClassSelection.fromType(
        playerSummary.query.classSelection
    );

    return (
        <div id="page_nav" className="page_containter">
            <div className="page_content">
                <ScreenNavigationView links={pageLinks} />
                <div>
                    <PlayerActivitiesHeader
                        player={player}
                        classSelection={characterClass}
                        mode={mode}
                        startMoment={startMoment}
                        endMoment={endMoment}
                        momentType={momentType}
                    />
                </div>

                <PageSectionView
                    id="profile"
                    title="Profile"
                    description="Your weapon stats"
                />

                <PlayerProfileView
                    memberId={memberId}
                    platformId={platformId}
                />

                <PageSectionView
                    id="overview"
                    title="Overview"
                    description="Your weapon stats"
                />

                <RefreshStatusView
                    lastUpdate={lastUpdate}
                    refreshInterval={PLAYER_VIEW_REFRESH_INTERVAL}
                    align="left"
                />

                <PlayerPerformanceSummaryView
                    summary={summary}
                    medals={medals}
                />

                {/*summary.activityCount ? (
                    <React.Fragment>
                        <div style={itemDetailsStyle}>
                            <div style={teamPerformanceStyle}>
                                {" "}
                                <PageSectionView
                                    id="teamPerformance"
                                    title="Team Performance"
                                    description="Aggregate stats for your team and opposing teams (omitting your data)"
                                />
                                <TeamPerformance
                                    playerTeamPerformance={
                                        playerTeamPerformance
                                    }
                                    opponentTeamPerformance={
                                        opponentTeamPerformance
                                    }
                                />
                            </div>

                            <div>
                                {" "}
                                <PageSectionView
                                    id="classMeta"
                                    title="Player Meta"
                                    description="Player meta and stats for players in your matches excluding you and players in your fireteam"
                                />
                                <LobbyMetaView
                                    characterClassMeta={characterClassMeta}
                                />
                            </div>

                            <div>
                                {" "}
                                <PageSectionView
                                    id="weapons"
                                    title="Weapons"
                                    description="Your weapon stats"
                                />
                                <PlayerWeaponsDetailView
                                    weapons={weapons}
                                    type={WEAPONS_DETAIL_GAME}
                                />
                            </div>

                            <div>
                                <PageSectionView
                                    id="meta"
                                    title="Weapon Meta"
                                    description="Weapon meta from your matches excluding you and your fireteam members"
                                />
                                <PlayerMetaWeaponsDetailView weapons={meta} />
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
                                description="Most recent matches"
                                id="games"
                                title="Games"
                            />
                            <div
                                style={loadLatestLinkStyle}
                                title="Load a page that always displays the most recent activity details"
                            >
                                <a
                                    href="void()"
                                    onClick={(e) =>
                                        onLatestActivityClick(
                                            e,
                                            player.memberId
                                        )
                                    }
                                >
                                    Monitor Most Recent Activity
                                </a>
                            </div>

                            <PlayerActivityList
                                activities={activities}
                                summary={summary}
                            />
                        </div>

                        <div>
                            <PageSectionView
                                id="maps"
                                description="Stats broken down by map"
                                title="Maps"
                            />
                            <PlayerMapSummaryList maps={maps} />
                        </div>
                    </React.Fragment>
                ) : (
                    <div>No Activities</div>
                )*/}
            </div>

            <ErrorContainerView errors={errors} />
        </div>
    );
};

export default PlayerView;
