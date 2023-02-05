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

import React, { useState } from "react";
import {
    calculateAverage,
    calculateEfficiency,
    calculateKillsDeathsRatio,
    calculatePercent,
    calculateRatio,
} from "shared/packages/utils";
import ExportDataView from "../../../components/ExportDataView";
import SelectView from "../../../components/SelectView";
import { LEFT, RIGHT } from "../../../core/consts";
import ExportData from "../../../core/data/export/ExportData";
import { humanDuration } from "../../../core/utils/date";
import {
    formatFloat,
    formatPercent,
    formatPercentInt,
} from "../../../core/utils/string";

import PlayerMapSummaryView from "./PlayerMapSummaryView";

const rootStyle = {
    display: "flex",
    flexDirection: "column",
    maxWidth: 730,
    gap: 2,
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

    const generateData = () => {
        const d = new ExportData();

        d.addHeader("NAME", LEFT);
        d.addHeader("GAMES", RIGHT);
        d.addHeader("TOTAL %", RIGHT);

        d.addHeader("WIN %", RIGHT);
        d.addHeader("COMPLETED", RIGHT);
        d.addHeader("MERCY", RIGHT);
        d.addHeader("OBJECTIVE", RIGHT);
        d.addHeader("EXPIRED", RIGHT);
        d.addHeader("KD", RIGHT);
        d.addHeader("EFF", RIGHT);

        d.addHeader("TIME / G", LEFT);

        for (const m of maps) {
            let row = [];

            row.push(m.map.name);

            row.push(m.summary.activityCount);
            row.push(
                formatPercentInt(
                    calculateRatio(m.summary.activityCount, totalGames)
                )
            );

            row.push(
                formatPercentInt(
                    calculateRatio(m.summary.wins, m.summary.activityCount)
                )
            );
            row.push(
                formatPercentInt(
                    calculateRatio(m.summary.completed, m.summary.activityCount)
                )
            );

            row.push(
                formatPercentInt(
                    calculateRatio(
                        m.summary.completionReasonMercy,
                        m.summary.activityCount
                    )
                )
            );

            row.push(
                formatPercentInt(
                    calculateRatio(
                        m.summary.completionReasonObjectiveCompleted,
                        m.summary.activityCount
                    )
                )
            );

            row.push(
                formatPercentInt(
                    calculateRatio(
                        m.summary.completionReasonTimeExpired,
                        m.summary.activityCount
                    )
                )
            );

            row.push(
                formatFloat(
                    calculateKillsDeathsRatio(m.summary.kills, m.summary.deaths)
                )
            );
            row.push(
                formatFloat(
                    calculateEfficiency(
                        m.summary.kills,
                        m.summary.deaths,
                        m.summary.assists
                    )
                )
            );

            let ms =
                (m.summary.timePlayedSeconds / m.summary.activityCount) * 1000;
            row.push(humanDuration(ms, true, true));

            d.addRow(row);
        }

        return d;
    };

    const data = generateData();

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
            <ExportDataView data={data} />
        </div>
    );
};

export default PlayerMapSummaryList;
