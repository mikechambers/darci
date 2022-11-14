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

import ResultSummaryView from "./ResultSummaryView";
import PlayerAbilityStatSummaryView from "./PlayerAbilityStatSummaryView";
import StatSummaryView from "../../../components/StatSummaryView";

import { calculateAverage } from "../../../core/utils";
import PlayerWeaponStatSummaryView from "./PlayerWeaponStatSummaryView";

const style = {
    display: "flex",
    flexWrap: "wrap",
    columnGap: "40px",
    backgroundColor: "rgba(0,0,0,0.1)",
    padding: "10px",
    borderRadius: "var(--radius-border)",
    width: "max-content",
    //border: "var(--border-list-item)",
    backdropFilter: "var(--blur-background)",
};

const PlayerStatsView = (props) => {
    const summary = props.summary;

    return (
        <div style={style}>
            <ResultSummaryView
                wins={summary.wins}
                mercies={summary.completionReasonMercy}
                activityCount={summary.activityCount}
                completed={summary.completed}
            />

            <StatSummaryView
                avg={calculateAverage(
                    summary.kills,
                    summary.activityCount
                ).toFixed(2)}
                total={summary.kills}
                high={summary.highestKills}
                title="Kills"
            />

            <StatSummaryView
                avg={calculateAverage(
                    summary.assists,
                    summary.activityCount
                ).toFixed(2)}
                total={summary.assists}
                high={summary.highestAssists}
                title="Assists"
            />

            <StatSummaryView
                avg={calculateAverage(
                    summary.opponentsDefeated,
                    summary.activityCount
                ).toFixed(2)}
                total={summary.opponentsDefeated}
                high={summary.highestOpponentsDefeated}
                title="Defeats"
            />

            <StatSummaryView
                avg={calculateAverage(
                    summary.deaths,
                    summary.activityCount
                ).toFixed(2)}
                total={summary.deaths}
                high={summary.highestDeaths}
                title="Deaths"
            />

            <PlayerAbilityStatSummaryView
                total={summary.kills}
                weapons={summary.weaponKills}
                supers={summary.superKills}
                melees={summary.meleeKills}
                grenades={summary.grenadeKills}
            />

            <PlayerWeaponStatSummaryView
                total={summary.weaponKills}
                primary={summary.primaryAmmoKills}
                secondary={summary.specialAmmoKills}
                heavy={summary.heavyAmmoKills}
            />
        </div>
    );
};

export default PlayerStatsView;
