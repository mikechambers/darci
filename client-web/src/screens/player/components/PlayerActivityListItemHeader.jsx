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

import { useState } from "react";
import PlayerActivityListItemDrawer from "./PlayerActivityListItemDrawer";
import StatView from "../../../components/StatView";
import { useNavigate } from "react-router-dom";

import { ReactComponent as ChevronRight } from "../../../components/images/tabler/chevron-right.svg";
import StatusView from "../../../components/StatusView";
import ActivityCompletionReasonView from "../../../components/CompletionReasonView";

import { Standing } from "shared";
import CompactMedalsList from "../../../components/CompactMedalsList";
import { SMALL } from "../../../core/consts";

const resultWinStyle = {
    backgroundColor: "var(--color-win)",
    //width: "6px",
    borderRadius: "var(--radius-border) 0px 0px var(--radius-border)",
};

const resultLossStyle = {
    backgroundColor: "var(--color-loss)",
    //width: "6px",
    borderRadius: "var(--radius-border) 0px 0px var(--radius-border)",
};

const statsStyle = {
    alignItems: "center",
    display: "grid",
    gridTemplateColumns: "repeat(6, 50px)",
    columnGap: "var(--gap-stat-item)",
};

//todo: remove this here or in parent

const gameContainerStyle = {
    height: "46px",
    display: "grid",
    gridTemplateColumns: "6px 170px 400px 39px 75px 10px",
    flexDirection: "row",

    cursor: "pointer",
};

const gameTitleStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    paddingLeft: "4px",
};

const gameContainerWrapper = {
    display: "flex",
    flexDirection: "column",

    width: "min-content",
};

const statusStyleWrapper = {
    //width: "35px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
};

const mercyStyle = {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "flex-start",
};

const statusStyle = {
    display: "flex",

    alignItems: "flex-end",
};

const medalsStyle = {
    //width: "60px",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
};

const gameDetailNavStyle = {
    backgroundColor: "#FFFFFFee",
    width: "10px",
    borderRadius: "0px var(--radius-border) var(--radius-border) 0px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
};

const chevronIconStyle = {
    color: "#000000",
    width: 16,
    height: 16,
};

const PlayerActivityListItemHeader = (props) => {
    let activity = props.activity;
    let summary = props.summary;

    let navigate = useNavigate();

    const onGameDetailNavClick = (e, activityId) => {
        e.stopPropagation();
        navigate(`/activity/${activityId}`);
    };

    let resultStyle =
        activity.stats.standing === Standing.VICTORY
            ? resultWinStyle
            : resultLossStyle;

    let gm = new Map();
    for (let m of activity.stats.extended.medals) {
        if (m.info.isGold) {
            gm.set(m.id, m);
        }
    }

    let goldMedals = Array.from(gm.values());

    if (goldMedals.length > 6) {
        goldMedals = goldMedals.slice(0, 5);
    }

    let title = "Highest Value";
    let killsHighlight = activity.stats.kills === summary.highestKills;
    let killsTitle = killsHighlight ? title : "";

    let assistsHighlight = activity.stats.assists === summary.highestAssists;
    let assistsTitle = assistsHighlight ? title : "";

    let defeatsHighlight =
        activity.stats.opponentsDefeated === summary.highestOpponentsDefeated;
    let defeatsTitle = defeatsHighlight ? title : "";

    let deathsHighlight = activity.stats.deaths === summary.highestDeaths;
    let deathsTitle = deathsHighlight ? title : "";

    let kdHighlight =
        activity.stats.killsDeathsRatio.toFixed(2) ===
        summary.highestKillsDeathsRatio.toFixed(2);
    let kdTitle = kdHighlight ? title : "";

    let effHighlight =
        activity.stats.efficiency.toFixed(2) ===
        summary.highestEfficiency.toFixed(2);
    let effTitle = effHighlight ? title : "";

    let [isExpanded, setIsExpanded] = useState(
        props.expanded === undefined ? false : props.expanded
    );

    const onItemClick = function (e) {
        setIsExpanded(!isExpanded);
    };

    let detailsDiv = isExpanded ? (
        <PlayerActivityListItemDrawer activity={activity} />
    ) : (
        ""
    );

    return (
        <div style={gameContainerWrapper}>
            <div
                className="list_item_header"
                style={gameContainerStyle}
                onClick={onItemClick}
            >
                <div style={resultStyle}></div>
                <div style={gameTitleStyle}>
                    <div className="subsection_header">
                        {activity.activity.map.name}
                    </div>
                    <div className="list_subtitle">
                        {activity.activity.mode.label}
                    </div>
                </div>

                <div style={statsStyle}>
                    <StatView
                        label="kills"
                        value={activity.stats.kills}
                        highlight={killsHighlight}
                        title={killsTitle}
                    />
                    <StatView
                        label="assists"
                        value={activity.stats.assists}
                        highlight={assistsHighlight}
                        title={assistsTitle}
                    />
                    <StatView
                        label="defeats"
                        value={activity.stats.opponentsDefeated}
                        highlight={defeatsHighlight}
                        title={defeatsTitle}
                    />
                    <StatView
                        label="deaths"
                        value={activity.stats.deaths}
                        highlight={deathsHighlight}
                        title={deathsTitle}
                    />
                    <StatView
                        label="kd"
                        value={activity.stats.killsDeathsRatio.toFixed(2)}
                        highlight={kdHighlight}
                        title={kdTitle}
                    />
                    <StatView
                        label="eff"
                        value={activity.stats.efficiency.toFixed(2)}
                        highlight={effHighlight}
                        title={effTitle}
                    />
                </div>

                <div style={statusStyleWrapper}>
                    <div style={statusStyle}>
                        <StatusView
                            completed={activity.stats.completed}
                            joinedLate={activity.stats.joinedLate}
                        />
                    </div>
                    <div style={mercyStyle}>
                        <ActivityCompletionReasonView
                            completionReason={activity.stats.completionReason}
                        />
                    </div>
                </div>

                <div style={medalsStyle}>
                    <CompactMedalsList medals={goldMedals} size={SMALL} />
                </div>
                <div
                    style={gameDetailNavStyle}
                    onClick={(e) =>
                        onGameDetailNavClick(e, activity.activity.activityId)
                    }
                >
                    <ChevronRight style={chevronIconStyle} />
                </div>
            </div>
            {detailsDiv}
        </div>
    );
};

export default PlayerActivityListItemHeader;
