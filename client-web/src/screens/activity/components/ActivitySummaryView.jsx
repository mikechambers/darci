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

import { DateTime, Interval } from "luxon";
import DurationView from "../../../components/DurationView";
import { capitalize } from "../../../core/utils/string";

const scoreStyle = {
    padding: "var(--padding-content)",
    height: "33%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "6px",
};

const spacerContainerStyle = {
    height: "50%",
};

const gameInfoContainterStyle = {
    height: "25%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-apart",
    alignItems: "flex-end",

    backgroundColor: "#00000044",
    padding: "var(--padding-content)",
};

const gameInfoStyle = {
    width: "60%",
};

const matchTimeStyle = {
    width: "40%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "flex-end",
};

const modeMapContainerStyle = {
    display: "flex",
    flexDirection: "columns",
    alignItems: "center",
};

const dividerStyle = {
    margin: 0,
};

const teamScoresStyle = {
    display: "flex",
    flexDirection: "rows",
    gap: "10px",
};

const scoreDivider = {
    borderColor: "#ffffff",
    borderStyle: "solid",
    borderWidth: "0px 1px 0px 0px",
};

const summaryStyleBase = {
    width: 700,
    height: 400,

    backgroundSize: "cover",

    borderRadius: 4,
    display: "flex",
    flexDirection: "column",
    alignItems: "space-apart",
};

const modeIconStyleBase = {
    width: 70,
    height: 70,
    backgroundSize: "cover",
};

const ActivitySummaryView = (props) => {
    const details = props.details;
    const teams = props.teams;

    const summaryStyle = {
        ...summaryStyleBase,
        backgroundImage: `url(${details.map.image})`,
    };

    let modeIconStyle = {
        ...modeIconStyleBase,
        backgroundImage: `url(${details.modeInfo.icon})`,
    };

    let alphaTeam = teams[0];
    let betaTeam = teams[1];

    //todo: change based on time
    let period = DateTime.fromJSDate(details.period);
    let now = DateTime.now();
    let diff = Interval.fromDateTimes(period, now).length("days");
    let periodHuman;
    if (diff < 2) {
        periodHuman = `${capitalize(
            period.toRelativeCalendar()
        )} at ${period.toFormat("t")}`;
    } else if (diff < 7) {
        periodHuman = period.toFormat("EEEE, LLLL d 'at' t");
    } else if (period.get("year") !== now.get("year")) {
        periodHuman = period.toFormat("LLLL d, kkkk 'at' t");
    } else {
        periodHuman = period.toFormat("LLLL d 'at' t");
    }

    return (
        <div style={summaryStyle}>
            <div style={scoreStyle}>
                <div className="activity_completion_reason">
                    {details.completionReason.label}
                </div>
                <div style={teamScoresStyle}>
                    <div className="alpha_team activity_score_box">
                        {alphaTeam.score}
                    </div>
                    <div style={scoreDivider}></div>
                    <div className="bravo_team activity_score_box">
                        {betaTeam.score}
                    </div>
                </div>
                <DurationView
                    duration={details.activityDurationSeconds * 1000}
                />
            </div>
            <div style={spacerContainerStyle}></div>
            <div style={gameInfoContainterStyle}>
                <div style={gameInfoStyle}>
                    <div style={modeMapContainerStyle}>
                        <div style={modeIconStyle}></div>
                        <div className="activity_mode_name">
                            <div className="activity_map_name">
                                {details.map.name}
                            </div>
                            <div>
                                <hr style={dividerStyle} />
                            </div>
                            <div className="activity_mode_name">
                                {details.modeInfo.name}
                            </div>
                        </div>
                    </div>
                </div>
                <div style={matchTimeStyle}>
                    <div>{periodHuman}</div>
                </div>
            </div>
        </div>
    );
};

export default ActivitySummaryView;
