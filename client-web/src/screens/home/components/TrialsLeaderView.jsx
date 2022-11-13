/* MIT License
 *
 * Copyright (c) 2022 Mike Chambers
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

import LeaderList from "../../../components/LeaderList";
import { filterLeaderMetrics } from "../../../core/utils/components";

const rootStyle = {
    display: "grid",
    gridTemplateColumns: "min-content min-content min-content",
    gap: "var(--leader-view-grid-gap)",
    flexWrap: "wrap",
};

const TrialsLeaderView = (props) => {
    let metrics = props.metrics ? props.metrics : [];

    const weeklyFlawless = filterLeaderMetrics(
        metrics,
        "trials",
        "flawlessWeekly"
    );

    const weeklyTrialsWins = filterLeaderMetrics(
        metrics,
        "trials",
        "winsWeekly"
    );

    const weeklyTrialsKills = filterLeaderMetrics(
        metrics,
        "trials",
        "defeatsWeekly"
    );

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

    const liftimeFlawless = filterLeaderMetrics(
        metrics,
        "trials",
        "flawlessLifetime"
    );

    const lifetimeTrialsWins = filterLeaderMetrics(
        metrics,
        "trials",
        "winsLifetime"
    );

    const lifetimeTrialsKills = filterLeaderMetrics(
        metrics,
        "trials",
        "defeatsLifetime"
    );

    return (
        <div style={rootStyle}>
            <LeaderList
                title="Weekly Flawlesses"
                leaderData={weeklyFlawless}
                showTeams={false}
            />

            <LeaderList
                title="Weekly Wins"
                leaderData={weeklyTrialsWins}
                showTeams={false}
            />

            <LeaderList
                title="Weekly Kills"
                leaderData={weeklyTrialsKills}
                showTeams={false}
            />

            <LeaderList
                title="Season Flawlesses"
                leaderData={seasonFlawless}
                showTeams={false}
            />
            <LeaderList
                title="Season Wins"
                leaderData={seasonTrialsWins}
                showTeams={false}
            />

            <LeaderList
                title="Season Kills"
                leaderData={seasonTrialsKills}
                showTeams={false}
            />
            <LeaderList
                title="Life Time Flawlesses"
                leaderData={liftimeFlawless}
                showTeams={false}
            />

            <LeaderList
                title="Life Time Wins"
                leaderData={lifetimeTrialsWins}
                showTeams={false}
            />

            <LeaderList
                title="Life Time Kills"
                leaderData={lifetimeTrialsKills}
                showTeams={false}
            />
        </div>
    );
};

export default TrialsLeaderView;
