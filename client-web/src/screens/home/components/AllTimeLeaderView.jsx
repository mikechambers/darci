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

const AllTimeLeaderView = (props) => {
    const metrics = props.metrics ? props.metrics : [];

    const defeatsLifetime = filterLeaderMetrics(
        metrics,
        "crucible",
        "defeatsLifetime"
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
        <div className="leader_view_pod">
            <LeaderList
                title="Crucible Defeats"
                leaderData={defeatsLifetime}
                showTeams={false}
            />

            <LeaderList
                title="Trials Flawlesses"
                leaderData={liftimeFlawless}
                showTeams={false}
            />

            <LeaderList
                title="Trials Wins"
                leaderData={lifetimeTrialsWins}
                showTeams={false}
            />

            <LeaderList
                title="Trials Kills"
                leaderData={lifetimeTrialsKills}
                showTeams={false}
            />
        </div>
    );
};

export default AllTimeLeaderView;
