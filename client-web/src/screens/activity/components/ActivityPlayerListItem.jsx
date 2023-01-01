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

import React from "react";

import ActivityPlayerListItemHeader from "./ActivityPlayerListItemHeader";
import PlayerActivityDetailListItem from "../../../components/PlayerActivityDetailListItem";

const ActivityPlayerListItem = (props) => {
    const player = props.player;
    const stats = props.stats;
    const teamColor = props.teamColor;
    const topStats = props.topStats;

    const links = {
        trialsReport: {
            url: `https://destinytrialsreport.com/report/${player.platformId}/${player.memberId}`,
            description: "View Player on Trials Report",
        },
        destinyTracker: {
            url: `https://destinytracker.com/destiny-2/profile/bungie/${player.memberId}/overview`,
            description: "View Player on Destiny Tracker",
        },
    };

    return (
        <PlayerActivityDetailListItem
            links={links}
            player={player}
            stats={stats}
        >
            <ActivityPlayerListItemHeader
                player={player}
                stats={stats}
                teamColor={teamColor}
                topStats={topStats}
            />
        </PlayerActivityDetailListItem>
    );
};

export default ActivityPlayerListItem;
