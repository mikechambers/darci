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

import ActivityPlayerMedalsView from "./ActivityPlayerMedalsView";
import ActivityPlayerStatBreakdownView from "../../../components/ActivityPlayerStatBreakdownView";
import ActivityPlayerWeaponsList from "../../../components/ActivityPlayerWeaponsList";
import DestinyTrackerButton from "../../../components/DestinyTrackerButton";
import DurationView from "../../../components/DurationView";
import TrialsReportButton from "../../../components/TrialsReportButton";
import { SMALL } from "../../../core/consts";

const ActivityPlayerListItemDrawer = (props) => {
    const rootStyle = {
        height: "min-content",
        display: "flex",
        flexDirection: "column",
        rowGap: 20,
    };

    const statsContainterStyle = {
        display: "grid",
        gridTemplateColumns: "55% 25% 20%",
        justifyItems: "center",
    };

    const infoContainerStyle = {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
    };

    const linksStyle = {
        display: "flex",
        flexDirection: "row",
        columnGap: 4,
    };

    const player = props.player;

    return (
        <div style={rootStyle} className="list_item_drawer">
            <div style={statsContainterStyle}>
                <ActivityPlayerWeaponsList
                    weapons={player.stats.extended.weapons}
                />
                <ActivityPlayerStatBreakdownView stats={player.stats} />
                <ActivityPlayerMedalsView
                    medals={player.stats.extended.medals}
                    size={SMALL}
                />
            </div>
            <div style={infoContainerStyle}>
                <div>
                    <DurationView
                        duration={player.stats.timePlayedSeconds * 1000}
                    />
                </div>
                <div style={linksStyle}>
                    <DestinyTrackerButton
                        url={`https://destinytracker.com/destiny-2/profile/bungie/${player.player.memberId}/overview`}
                        description="View player on Destiny Tracker."
                    />
                    <TrialsReportButton
                        url={`https://destinytrialsreport.com/report/${player.player.platformId}/${player.player.memberId}`}
                        description="View player on Trials Report"
                    />
                </div>
            </div>
        </div>
    );
};

export default ActivityPlayerListItemDrawer;
