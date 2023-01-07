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

import { calculateRatio } from "shared";

import Stat from "./StatView";
import { RIGHT } from "../core/consts";
import { calculatePercent } from "shared/packages/utils";

const rootStyle = {
    maxWidth: 125,
    display: "flex",
    flexDirection: "column",
    rowGap: 4,
};

const ActivityPlayerStatBreakdownView = (props) => {
    const stats = props.stats;

    const weaponKills = stats.extended.weapons.reduce((prev, cur) => {
        return prev + cur.kills;
    }, 0);

    const grenadeKills = stats.extended.grenadeKills;
    const superKills = stats.extended.superKills;
    const meleeKills = stats.extended.meleeKills;

    const totalKills = weaponKills + grenadeKills + superKills + meleeKills;

    const rowStyle = {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 8,
    };

    return (
        <div style={rootStyle}>
            <div className="subsection_header underline">Breakdown</div>
            <div style={rowStyle}>
                <Stat
                    label="weapon"
                    value={weaponKills}
                    title="Weapon final blows"
                />

                <Stat
                    label="total"
                    title="Percent of all final blows from weapons"
                    value={`${Math.round(
                        calculatePercent(weaponKills, totalKills)
                    )}%`}
                />
            </div>
            <div style={rowStyle}>
                <Stat label="melee" value={meleeKills} title="Melee kills" />

                <Stat
                    label="total"
                    align={RIGHT}
                    title="Percent of all final blows from melees"
                    value={`${Math.round(
                        calculatePercent(meleeKills, totalKills)
                    )}%`}
                />
            </div>
            <div style={rowStyle}>
                <Stat
                    label="grenade"
                    value={grenadeKills}
                    title="Grenade kills"
                />

                <Stat
                    label="total"
                    align={RIGHT}
                    title="Percent of all final blows from grenades"
                    value={`${Math.round(
                        calculatePercent(grenadeKills, totalKills)
                    )}%`}
                />
            </div>
            <div style={rowStyle}>
                <Stat label="super" value={superKills} title="Super kills" />

                <Stat
                    label="total"
                    align={RIGHT}
                    title="Percent of all final blows from supers"
                    value={`${Math.round(
                        calculatePercent(superKills, totalKills)
                    )}%`}
                />
            </div>
            <div>
                <Stat
                    label="K / A"
                    title="Kills to assists ratio"
                    value={`${calculateRatio(totalKills, stats.assists).toFixed(
                        2
                    )}`}
                />
            </div>
        </div>
    );
};

export default ActivityPlayerStatBreakdownView;
