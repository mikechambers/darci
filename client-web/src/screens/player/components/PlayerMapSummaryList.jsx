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

import React, { useState } from "react";
import {
    calculateAverage,
    calculateEfficiency,
    calculateKillsDeathsRatio,
    calculatePercent,
} from "shared/packages/utils";
import SelectView from "../../../components/SelectView";
import { LEFT, RIGHT } from "../../../core/consts";

import PlayerMapSummaryView from "./PlayerMapSummaryView";

const rootStyle = {
    display: "flex",
    flexDirection: "column",
    maxWidth: 730,
};

const wrapperStyle = {
    display: "flex",
    flexDirection: "row",
    gap: "var(--gap-list-item)",
    flexWrap: "wrap",
    justifyContent: "flex-start",
};

const sortStyle = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
};

const sortOptions = [
    {
        label: "Games",
        sort: (a, b) => {
            return b.summary.activityCount - a.summary.activityCount;
        },
    },
    {
        label: "Win %",
        sort: (a, b) => {
            return (
                calculatePercent(b.summary.wins, b.summary.activityCount) -
                calculatePercent(a.summary.wins, a.summary.activityCount)
            );
        },
    },
    {
        label: "Mercy %",
        sort: (a, b) => {
            return (
                calculatePercent(
                    b.summary.completionReasonMercy,
                    b.summary.activityCount
                ) -
                calculatePercent(
                    a.summary.completionReasonMercy,
                    a.summary.activityCount
                )
            );
        },
    },
    {
        label: "KD",
        sort: (a, b) => {
            return (
                calculateKillsDeathsRatio(b.summary.kills, b.summary.deaths) -
                calculateKillsDeathsRatio(a.summary.kills, a.summary.deaths)
            );
        },
    },
    {
        label: "Efficiency",
        sort: (a, b) => {
            return (
                calculateEfficiency(
                    b.summary.kills,
                    b.summary.deaths,
                    b.summary.assists
                ) -
                calculateEfficiency(
                    a.summary.kills,
                    a.summary.deaths,
                    a.summary.assists
                )
            );
        },
    },
    {
        label: "Kills / g",
        sort: (a, b) => {
            return (
                calculateAverage(b.summary.kills, b.summary.activityCount) -
                calculateAverage(a.summary.kills, a.summary.activityCount)
            );
        },
    },
    {
        label: "Defeats / g",
        sort: (a, b) => {
            return (
                calculateAverage(
                    b.summary.opponentsDefeated,
                    b.summary.activityCount
                ) -
                calculateAverage(
                    a.summary.opponentsDefeated,
                    a.summary.activityCount
                )
            );
        },
    },
    {
        label: "Assists / g",
        sort: (a, b) => {
            return (
                calculateAverage(b.summary.assists, b.summary.activityCount) -
                calculateAverage(a.summary.assists, a.summary.activityCount)
            );
        },
    },
    {
        label: "Deaths / g",
        sort: (a, b) => {
            return (
                calculateAverage(b.summary.deaths, b.summary.activityCount) -
                calculateAverage(a.summary.deaths, a.summary.activityCount)
            );
        },
    },
    {
        label: "Time Played",
        sort: (a, b) => {
            return b.summary.timePlayedSeconds - a.summary.timePlayedSeconds;
        },
    },
    {
        label: "Completion %",
        sort: (a, b) => {
            return (
                calculatePercent(b.summary.completed, b.summary.activityCount) -
                calculatePercent(a.summary.completed, a.summary.activityCount)
            );
        },
    },
];

const PlayerMapSummaryList = (props) => {
    let maps = props.maps ? props.maps : [];

    const [sortIndex, setSortIndex] = useState(0);

    maps.sort(sortOptions[sortIndex].sort);

    let totalGames = maps.reduce(
        (prev, cur) => cur.summary.activityCount + prev,
        0
    );

    const onSortChange = (item, selectedIndex) => {
        setSortIndex(selectedIndex);
    };

    return (
        <div style={rootStyle}>
            <div style={sortStyle}>
                <SelectView
                    onChange={onSortChange}
                    options={sortOptions}
                    align={RIGHT}
                />
            </div>
            <div style={wrapperStyle}>
                {maps.map((map, index) => {
                    return (
                        <PlayerMapSummaryView
                            map={map}
                            totalGames={totalGames}
                            key={map.referenceId}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default PlayerMapSummaryList;
