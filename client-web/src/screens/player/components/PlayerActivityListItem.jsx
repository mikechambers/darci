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

import { useNavigate } from "react-router-dom";
import { Standing } from "shared";

import PlayerActivityDetailListItem from "../../../components/PlayerActivityDetailListItem";

import DetailListIndicatorView from "../../activity/components/DetailListIndicatorView";
import PlayerActivityDetailListItemHeader from "../../../components/PlayerActivityDetailListItemHeader";

import PlayerMapInfoView from "../../activity/components/PlayerMapInfoView";

const PlayerActivityListItem = (props) => {
    let activity = props.activity;
    let summary = props.summary;
    let topStats = props.topStats;

    let navigate = useNavigate();

    let gm = new Map();
    for (let m of activity.stats.extended.medals) {
        if (m.info.isGold) {
            gm.set(m.id, m);
        }
    }

    let indicatorData = {};
    if (activity.stats.standing === Standing.VICTORY) {
        indicatorData.color = "var(--color-win)";
        indicatorData.description = "Victory!";
    } else {
        indicatorData.color = "var(--color-loss)";
        indicatorData.description = "Loss!";
    }

    const links = {
        trialsReport: {
            url: `https://crucible.report/pgcr/${activity.activity.activityId}`,
            description: "View Game on Crucible Report",
        },
        bungie: {
            url: `https://www.bungie.net/en/PGCR/${activity.activity.activityId}?character=${activity.player.character.id}`,
            description: "View Game at Bungie.net",
        },
        destinyTracker: {
            url: `https://destinytracker.com/destiny-2/pgcr/${activity.activity.activityId}`,
            description: "View Game on Destiny Tracker",
        },
    };

    return (
        <PlayerActivityDetailListItem
            player={activity.player}
            stats={activity.stats}
            links={links}
        >
            <PlayerActivityDetailListItemHeader
                stats={activity.stats}
                topStats={topStats}
                onClick={() => {
                    navigate(`/activity/${activity.activity.activityId}`);
                }}
            >
                <DetailListIndicatorView
                    color={indicatorData.color}
                    description={indicatorData.description}
                />
                <PlayerMapInfoView activity={activity} />
            </PlayerActivityDetailListItemHeader>
        </PlayerActivityDetailListItem>
    );
};

export default PlayerActivityListItem;
