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
import { calculateEfficiency, calculateKillsDeathsRatio } from "shared";

import { formatFloat } from "../core/utils/string";

import StatView from "./StatView";

const rootStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(7, 1fr)",
    columnGap: "var(--gap-stat-item)",

    backgroundColor: "green",
};

const PlayerActivityDetailStatsView = (props) => {
    const stats = props.stats;
    const topStats = props.topStats;

    const kd = formatFloat(
        calculateKillsDeathsRatio(stats.kills, stats.deaths)
    );

    const efficiency = formatFloat(
        calculateEfficiency(stats.kills, stats.deaths, stats.assists)
    );

    return (
        <div style={rootStyle} className="stats_grid">
            <StatView
                className="meta_weapon_icon"
                key="score"
                label="Score"
                value={stats.score}
                highlight={
                    topStats.score !== 0 && topStats.score === stats.score
                } //TODO: add highlights
                title="Score"
            />
            <StatView
                key="kills"
                label="kills"
                value={stats.kills}
                highlight={topStats.kills === stats.kills} //TODO: add highlights
                title="Kills"
            />
            <StatView
                key="assists"
                label="assists"
                value={stats.assists}
                highlight={topStats.assists === stats.assists} //TODO: add highlights
                title="Assists"
            />
            <StatView
                className="meta_weapon_icon"
                key="defeats"
                label="defeats"
                value={stats.opponentsDefeated}
                highlight={
                    topStats.opponentsDefeated === stats.opponentsDefeated
                } //TODO: add highlights
                title="Defeats"
            />
            <StatView
                key="deaths"
                label="deaths"
                value={stats.deaths}
                highlight={topStats.deaths === stats.deaths} //TODO: add highlights
                title="Deaths"
            />
            <StatView
                key="kd"
                label="kd"
                value={kd}
                highlight={formatFloat(topStats.kd) === kd} //TODO: add highlights
                title="KD"
            />
            <StatView
                className="meta_weapon_icon"
                key="eff"
                label="eff"
                value={efficiency}
                highlight={formatFloat(topStats.efficiency) === efficiency} //TODO: add highlights
                title="Efficiency"
            />
        </div>
    );
};

export default PlayerActivityDetailStatsView;
