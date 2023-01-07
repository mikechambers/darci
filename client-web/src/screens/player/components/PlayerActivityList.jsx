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

import { DateTime, Interval } from "luxon";
import React from "react";
import { formatFloat } from "../../../core/utils/string";
import PlayerActivityListItem from "./PlayerActivityListItem";

const containerStyle = {
    display: "flex",
    flexDirection: "column",
};

const wrapperStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "2px",
};

const dateStyleFirst = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    textTransform: "capitalize",
};

const dateStyle = {
    ...dateStyleFirst,
    paddingTop: "24px",
};

const PlayerActivityList = (props) => {
    let activities = props.activities;
    let summary = props.summary;

    let lastDate;
    let now = DateTime.now();

    let topStats = {
        score: summary.highestScore,
        kills: summary.highestKills,
        assists: summary.highestAssists,
        deaths: summary.highestDeaths,
        opponentsDefeated: summary.highestOpponentsDefeated,
        kd: formatFloat(summary.highestKillsDeathsRatio),
        efficiency: formatFloat(summary.highestEfficiency),
    };

    return (
        <div style={containerStyle}>
            <div style={wrapperStyle}>
                {activities.map((game, index) => {
                    let dt = DateTime.fromISO(game.activity.period);

                    let dateDiv = "";
                    if (!lastDate || !dt.hasSame(lastDate, "day")) {
                        lastDate = dt;

                        let s;
                        let diff = Interval.fromDateTimes(dt, now).length(
                            "days"
                        );

                        if (diff < 4) {
                            s = dt.toRelativeCalendar({ unit: "days" });
                        } else if (diff < 7) {
                            s = dt.toFormat("EEEE, LLLL d");
                        } else {
                            s = dt.toFormat("DDD");
                        }
                        let style = !index ? dateStyleFirst : dateStyle;

                        dateDiv = (
                            <div style={style} className="subsection_header">
                                {s}
                            </div>
                        );
                    }

                    return (
                        <React.Fragment key={game.activity.activityId}>
                            {dateDiv}
                            <PlayerActivityListItem
                                activity={game}
                                summary={summary}
                                topStats={topStats}
                                key={game.activity.activityId}
                            />
                        </React.Fragment>
                    );
                })}
            </div>
        </div>
    );
};

export default PlayerActivityList;
