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

import { calculatePercent, calculateAverage } from "../../../core/utils/index";
import PlayerWeaponsDetailList from "./PlayerWeaponsDetailList";

export const WEAPONS_DETAIL_GAME = "WEAPONS_DETAIL_GAME";
export const WEAPONS_DETAIL_PLAYER = "WEAPONS_DETAIL_PLAYER";

const PlayerWeaponsDetailView = (props) => {
    let weapons = props.weapons ? props.weapons : [];
    let type = props.type ? props.type : WEAPONS_DETAIL_GAME;

    let [typeLabel, typeAbr] =
        type === WEAPONS_DETAIL_GAME ? ["Games", "g"] : ["Players", "p"];

    let description = "Weapons you have used ordered by kills.";

    weapons.sort((a, b) => {
        return b.kills - a.kills;
    });

    let data = [];
    for (const w of weapons) {
        let precision = calculatePercent(w.precision, w.kills).toFixed(2);
        let items = [
            {
                label: typeLabel,
                value: w.count,
            },
            {
                label: "Kills",
                value: w.kills,
            },
            {
                label: `Kills/${typeAbr}`,
                value: calculateAverage(w.kills, w.count).toFixed(2),
            },
            {
                label: "Precision",
                value: precision + "%",
                data: precision,
            },
        ];

        data.push({
            id: w.id,
            title: w.item.name,
            subtitle: w.item.itemSubType.toString(),
            icon: w.item.icon,
            items: items,
        });
    }

    let sortLabels = [
        typeLabel.toLocaleLowerCase(),
        "kills",
        `kills/${typeAbr}`,
        "precision",
    ];

    return (
        <PlayerWeaponsDetailList
            weapons={data}
            title="weapons"
            description={description}
            sortLabels={sortLabels}
        />
    );
};

export default PlayerWeaponsDetailView;
