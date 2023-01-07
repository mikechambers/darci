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

import React from "react";

import { useParams } from "react-router-dom";
import { useFetchActivity } from "../../hooks/remote";

import PageSectionView from "../../components/PageSectionView";
import ScreenNavigationView from "../../components/ScreenNavigationView";
import ActivitySummaryView from "./components/ActivitySummaryView";
import ActivityLeadersView from "./components/ActivityLeadersView";
import ActivityGoldMedalsView from "./components/ActivityGoldMedalsView";
import ActivityWeaponView from "./components/ActivityWeaponsView";
import ActivityTeamDetailsView from "./components/ActivityTeamDetailsView";
import ActivityPlayerEffectivenessView from "./components/ActivityPlayerEffectivenessView";
import LoadingAnimationView from "../../components/LoadingAnimationView";
import { ActivityNotFoundError } from "../../core/errors";
import ErrorContainerView from "../../components/ErrorContainerView";
import { calculateEfficiency, calculateKillsDeathsRatio } from "shared";

const pageContainerStyle = {
    minWidth: "720px",
};

const ActivityView = (props) => {
    const params = useParams();

    const activityId = params.activityId ? params.activityId : props.activityId;
    //TODO error if no activity id

    const [activity, isLoading, error] = useFetchActivity(activityId);

    if (isLoading) {
        return <LoadingAnimationView message="Loading Activity data." />;
    }

    if (error) {
        if (error instanceof ActivityNotFoundError) {
            return <div>Activity Not Found : {activityId}</div>;
        }

        return <ErrorContainerView errors={[error]} />;
    }

    const pageLinks = [
        {
            value: "Leaderboard",
            id: "leaders",
        },
        {
            value: "Medals",
            id: "medals",
        },
        {
            value: "Analysis",
            id: "analysis",
        },
        {
            value: "Weapons",
            id: "weapons",
        },
        {
            value: "Players",
            id: "players",
        },
        {
            value: "Links",
            id: "links",
        },
    ];

    const details = activity.details;
    const teams = activity.teams;

    let topStats = {
        score: 0,
        kills: 0,
        assists: 0,
        deaths: 0,
        opponentsDefeated: 0,
        kd: 0.0,
        efficiency: 0.0,
    };

    //todo: need to test this with rumble
    let players = [];
    for (const t of teams) {
        for (const p of t.players) {
            players.push({
                player: p,
                teamName: t.name,
            });

            if (p.stats.score > topStats.score) {
                topStats.score = p.stats.score;
            }

            if (p.stats.kills > topStats.kills) {
                topStats.kills = p.stats.kills;
            }

            if (p.stats.assists > topStats.assists) {
                topStats.assists = p.stats.assists;
            }

            if (p.stats.opponentsDefeated > topStats.opponentsDefeated) {
                topStats.opponentsDefeated = p.stats.opponentsDefeated;
            }

            if (p.stats.deaths > topStats.deaths) {
                topStats.deaths = p.stats.deaths;
            }

            const kd = calculateKillsDeathsRatio(p.stats.kills, p.stats.deaths);
            if (kd > topStats.kd) {
                topStats.kd = kd;
            }

            const efficiency = calculateEfficiency(
                p.stats.kills,
                p.stats.deaths,
                p.stats.assists
            );
            if (efficiency > topStats.efficiency) {
                topStats.efficiency = efficiency;
            }
        }
    }

    return (
        <div style={pageContainerStyle} id="page_nav">
            <div className="page_content">
                <ScreenNavigationView links={pageLinks} />
                <ActivitySummaryView details={details} teams={teams} />

                <div>
                    <PageSectionView
                        id="leaders"
                        title="Leaderboard"
                        description="Top players in activity"
                    />
                    <ActivityLeadersView players={players} />
                </div>

                <div>
                    <PageSectionView
                        id="medals"
                        title="Gold Medals"
                        description="Gold medals"
                    />
                    <ActivityGoldMedalsView players={players} />
                </div>

                <div>
                    <PageSectionView
                        id="analysis"
                        title="Analysis"
                        description="Plot chart showing player effectiveness (kills and deaths relative to efficiency)"
                    />
                    <ActivityPlayerEffectivenessView teams={teams} />
                </div>

                <div>
                    <PageSectionView
                        id="weapons"
                        title="Weapons"
                        description="Weapons"
                    />
                    <ActivityWeaponView teams={teams} />
                </div>

                {teams.map((team, index) => {
                    let id = "";
                    if (!index) {
                        id = "players";
                    }

                    return (
                        <div key={team.name} id={id}>
                            <PageSectionView
                                id={team.name}
                                title={`${team.name} Team`}
                                description={`${team.name} Team details`}
                            />
                            <ActivityTeamDetailsView
                                team={team}
                                topStats={topStats}
                            />
                        </div>
                    );
                })}

                <div>
                    <PageSectionView
                        id="links"
                        title="Links"
                        description="Links to game details on other sites."
                    />

                    <ul>
                        <li>
                            <a
                                href={`https://destinytracker.com/destiny-2/pgcr/${activityId}`}
                            >
                                View Game on Destiny Tracker
                            </a>
                        </li>
                        <li>
                            <a
                                href={`https://www.bungie.net/en/PGCR/${activityId}`}
                            >
                                View game at Bungie
                            </a>
                        </li>
                        <li>
                            <a
                                href={`https://crucible.report/pgcr/${activityId}`}
                            >
                                View Game on Trials Report
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default ActivityView;
