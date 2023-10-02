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

import LeaderList from "../../../components/LeaderList";
import { filterLeaderMetrics } from "../../../core/utils/components";

const SeasonLeaderView = (props) => {
    const metrics = props.metrics ? props.metrics : [];

    const defeatsSeason = filterLeaderMetrics(
        metrics,
        "crucible",
        "defeatsSeason"
    );

    const winStreakSeason = filterLeaderMetrics(
        metrics,
        "crucible",
        "winStreakSeason"
    );
    const kdaSeason = filterLeaderMetrics(metrics, "crucible", "kdaSeason");

    const seasonTrialsWins = filterLeaderMetrics(
        metrics,
        "trials",
        "winsSeason"
    );

    const seasonTrialsKills = filterLeaderMetrics(
        metrics,
        "trials",
        "defeatsSeason"
    );

    const seasonFlawless = filterLeaderMetrics(
        metrics,
        "trials",
        "flawlessSeason"
    );

    let ibWinsSeason = filterLeaderMetrics(metrics, "ironBanner", "winsSeason");
    let ibDefeatsSeason = filterLeaderMetrics(
        metrics,
        "ironBanner",
        "defeatsSeason"
    );
    let ibEfficiencySeason = filterLeaderMetrics(
        metrics,
        "ironBanner",
        "efficiencySeason"
    );

    return (
        <div className="leader_view_pod">
            <LeaderList
                title="Crucible Defeats"
                leaderData={defeatsSeason}
                showTeams={false}
            />

            <LeaderList title="KDA" leaderData={kdaSeason} showTeams={false} />

            <LeaderList
                title="Crucible Win Streak"
                leaderData={winStreakSeason}
                showTeams={false}
            />

            <LeaderList
                title="Trials Flawlesses"
                leaderData={seasonFlawless}
                showTeams={false}
            />
            <LeaderList
                title="Trials Wins"
                leaderData={seasonTrialsWins}
                showTeams={false}
            />

            <LeaderList
                title="Trials Kills"
                leaderData={seasonTrialsKills}
                showTeams={false}
            />

            <LeaderList
                title="Iron Banner Wins"
                leaderData={ibWinsSeason}
                showTeams={false}
            />

            <LeaderList
                title="Iron Banner Kills"
                leaderData={ibDefeatsSeason}
                showTeams={false}
            />

            <LeaderList
                title="Iron Banner Efficiency"
                leaderData={ibEfficiencySeason}
                showTeams={false}
            />
        </div>
    );
};

export default SeasonLeaderView;
