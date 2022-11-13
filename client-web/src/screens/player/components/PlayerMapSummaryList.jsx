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
import PlayerMapSummaryView from "./PlayerMapSummaryView";

const rootStyle = {
    display: "flex",
    flexDirection: "column",
};

const wrapperStyle = {
    display: "flex",
    flexDirection: "row",
    gap: "var(--gap-list-item)",
    flexWrap: "wrap",
};

const PlayerMapSummaryList = (props) => {
    let maps = props.maps ? props.maps : [];

    maps.sort((a, b) => {
        return b.summary.activityCount - a.summary.activityCount;
    });

    let totalGames = maps.reduce(
        (prev, cur) => cur.summary.activityCount + prev,
        0
    );

    return (
        <div style={rootStyle}>
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
