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
};

const WeeklyLeaderView = (props) => {
    const metrics = props.metrics ? props.metrics : [];

    const defeatsWeekly = filterLeaderMetrics(
        metrics,
        "crucible",
        "defeatsWeekly"
    );

    const winStreakWeekly = filterLeaderMetrics(
        metrics,
        "crucible",
        "winStreakWeekly"
    );

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

    return (
        <div style={rootStyle}>
            <LeaderList
                title="Crucible Defeats"
                leaderData={defeatsWeekly}
                showTeams={false}
            />

            <LeaderList
                title="Crucible Win Streak"
                leaderData={winStreakWeekly}
                showTeams={false}
            />
            <div></div>

            <LeaderList
                title="Trials Flawlesses"
                leaderData={weeklyFlawless}
                showTeams={false}
            />

            <LeaderList
                title="Trials Wins"
                leaderData={weeklyTrialsWins}
                showTeams={false}
            />

            <LeaderList
                title="Trials Kills"
                leaderData={weeklyTrialsKills}
                showTeams={false}
            />
        </div>
    );
};

export default WeeklyLeaderView;
