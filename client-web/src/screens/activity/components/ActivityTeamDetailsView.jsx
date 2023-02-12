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

import ActivityPlayerList from "./ActivityPlayerList";
import ActivityTeamSummaryView from "./ActivityTeamSummaryView";

const siteIconStyle = {
    verticalAlign: "middle",
};

const ActivityTeamDetailsView = (props) => {
    const team = props.team;
    const topStats = props.topStats;

    const onClick = (e) => {
        e.preventDefault();
        for (const p of props.team.players) {
            const url = `https://destinytrialsreport.com/report/${p.player.platformId}/${p.player.memberId}`;
            window.open(url, `_blank_${p.player.memberId}`);
        }
    };

    return (
        <div>
            <ActivityTeamSummaryView team={team} />
            <ActivityPlayerList players={team.players} topStats={topStats} />

            <img
                className="link"
                src="https://trials.report/assets/svg/icon.svg"
                width={12}
                alt="Open all players in Trials Report in new tabs (must disable popup blocker)"
                title="Open all players in Trials Report in new tabs (must disable popup blocker)"
                style={siteIconStyle}
                onClick={onClick}
            />
        </div>
    );
};

export default ActivityTeamDetailsView;
