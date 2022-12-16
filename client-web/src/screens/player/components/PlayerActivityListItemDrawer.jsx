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

import Icon, { DESTINY_LOGO } from "../../../components/Icon";
import DurationView from "../../../components/DurationView";
import ActivityPlayerStatBreakdownView from "../../../components/ActivityPlayerStatBreakdownView";
import ActivityPlayerWeaponsList from "../../../components/ActivityPlayerWeaponsList";
import DestinyTrackerButton from "../../../components/DestinyTrackerButton";
import TrialsReportButton from "../../../components/TrialsReportButton";

const dataContainerStyle = {
    display: "flex",
    justifyContent: "space-around",
};

const timePlayedStyle = {
    display: "flex",
    justifyContent: "flex-start",
};

const dataContainerWrapperStyle = {
    width: "75%",
    margin: "4px",
};

const backgroundStyleBase = {
    width: "25%",
    height: 125,
    backgroundSize: "cover",
    backgroundPosition: "center",
    borderRadius: "4px",
    margin: "4px",
    display: "flex",
    alignItems: "flex-end",
};

let detailStyleBase = {
    display: "flex",
    flexDirection: "column",
    gap: 4,
};

let dataStyle = {
    display: "flex",
    flexDirection: "row",
    width: "100%",
};

const PlayerActivityListItemDrawer = (props) => {
    let activity = props.activity;

    const detailStyle = {
        ...detailStyleBase,
    };

    const backgroundStyle = {
        ...backgroundStyleBase,
        backgroundImage: `url(${activity.activity.map.image})`,
    };

    const metaDataStyle = {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
    };

    const linksStyle = {
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
    };

    const siteIconStyle = {
        verticalAlign: "middle",
    };

    let activityId = activity.activity.activityId;
    let characterId = activity.player.character.characterId;

    let scoreStyle = {
        backgroundColor: "#00000088",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        borderRadius: "0px 0px 4px 4px",
        paddingTop: "2px",
    };
    let scoreDiv =
        activity.stats.opponentTeamScore !== -1 ? (
            <div style={scoreStyle}>
                {activity.stats.teamScore} - {activity.stats.opponentTeamScore}
            </div>
        ) : (
            ""
        );

    return (
        <div className="list_item_drawer" style={detailStyle}>
            <div style={dataStyle}>
                <div style={backgroundStyle}>{scoreDiv}</div>

                <div style={dataContainerWrapperStyle}>
                    <div style={dataContainerStyle}>
                        <ActivityPlayerWeaponsList
                            weapons={activity.stats.extended.weapons}
                        />

                        <ActivityPlayerStatBreakdownView
                            stats={activity.stats}
                        />
                    </div>
                </div>
            </div>
            <div style={metaDataStyle}>
                <div style={timePlayedStyle} className="section_entry">
                    <DurationView
                        duration={activity.stats.activityDurationSeconds * 1000}
                    />
                </div>
                <div style={linksStyle}>
                    <TrialsReportButton
                        url={`https://crucible.report/pgcr/${activityId}`}
                        description="View game on Crucible Report"
                    />
                    &nbsp;
                    <DestinyTrackerButton
                        url={`https://destinytracker.com/destiny-2/pgcr/${activityId}`}
                        description="View game on Destiny Tracker"
                    />
                    &nbsp;
                    <a
                        href={`https://www.bungie.net/en/PGCR/${activityId}?character=${characterId}`}
                    >
                        <Icon
                            icon={DESTINY_LOGO}
                            style={siteIconStyle}
                            title="View game on Bungie.com"
                        />
                    </a>
                </div>
            </div>
        </div>
    );
};

export default PlayerActivityListItemDrawer;
