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

import React from "react";

import StatView from "../../../components/StatView";
import { calculateKillsDeathsRatio, calculateEfficiency } from "shared";
import { LARGE, RIGHT } from "../../../core/consts";
import { calculatePercent } from "shared/packages/utils";

const style = {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: "100px",
};

const PlayerHighlightsView = (props) => {
    const summary = props.summary;

    return (
        <div style={style}>
            <StatView
                styleName={LARGE}
                label="win%"
                value={`${calculatePercent(
                    summary.wins,
                    summary.activityCount
                ).toFixed()}%`}
                align={RIGHT}
            />
            <StatView
                styleName={LARGE}
                label="KD"
                value={calculateKillsDeathsRatio(
                    summary.kills,
                    summary.deaths
                ).toFixed(2)}
                align={RIGHT}
            />

            <StatView
                styleName={LARGE}
                label="EFF"
                value={calculateEfficiency(
                    summary.kills,
                    summary.deaths,
                    summary.assists
                ).toFixed(2)}
                align={RIGHT}
            />
        </div>
    );
};

export default PlayerHighlightsView;
