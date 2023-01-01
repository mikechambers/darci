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

import ActivityPlayerMedalsView from "../screens/activity/components/ActivityPlayerMedalsView";
import ActivityPlayerStatBreakdownView from "./ActivityPlayerStatBreakdownView";
import ActivityPlayerWeaponsList from "./ActivityPlayerWeaponsList";
import DestinyTrackerIconButton from "./DestinyTrackerIconButton";
import DurationView from "./DurationView";
import TrialsReportIconButton from "./TrialsReportIconButton";
import { SMALL } from "../core/consts";
import BungieIconButton from "./BungieIconButton";

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

const ActivityPlayerListItemDrawer = (props) => {
    const stats = props.stats;
    const links = props.links;

    return (
        <div style={rootStyle} className="list_item_drawer">
            <div style={statsContainterStyle}>
                <ActivityPlayerWeaponsList weapons={stats.extended.weapons} />
                <ActivityPlayerStatBreakdownView stats={stats} />
                <ActivityPlayerMedalsView
                    medals={stats.extended.medals}
                    size={SMALL}
                />
            </div>
            <div style={infoContainerStyle}>
                <div>
                    <DurationView duration={stats.timePlayedSeconds * 1000} />
                </div>
                <div style={linksStyle}>
                    {(() => {
                        if (links && !!links.destinyTracker) {
                            return (
                                <DestinyTrackerIconButton
                                    url={links.destinyTracker.url}
                                    description={
                                        links.destinyTracker.description
                                    }
                                />
                            );
                        }
                    })()}

                    {(() => {
                        if (links && !!links.trialsReport) {
                            return (
                                <TrialsReportIconButton
                                    url={links.trialsReport.url}
                                    description={links.trialsReport.description}
                                />
                            );
                        }
                    })()}

                    {(() => {
                        if (links && !!links.bungie) {
                            return (
                                <BungieIconButton
                                    url={links.bungie.url}
                                    description={links.bungie.description}
                                />
                            );
                        }
                    })()}
                </div>
            </div>
        </div>
    );
};

export default ActivityPlayerListItemDrawer;
