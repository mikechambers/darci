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
import { calculateRatio } from "shared";

import { calculateAverage } from "shared/packages/utils";

import {
    formatFloat,
    formatInt,
    formatPercent,
} from "../../../core/utils/string";
import PlayerWeaponsDetailList from "./PlayerWeaponsDetailList";

export const WEAPONS_DETAIL_GAME = "WEAPONS_DETAIL_GAME";
export const WEAPONS_DETAIL_PLAYER = "WEAPONS_DETAIL_PLAYER";

const PlayerWeaponsDetailView = (props) => {
    let weapons = props.weapons ? props.weapons : [];

    let description = "Weapons you have used ordered by kills.";

    const [sortIndex, setSortIndex] = useState(0);

    let data = [];
    for (const w of weapons) {
        let items = [
            {
                label: "Games",
                value: w.count,
                formatter: formatInt,
            },
            {
                label: "Kills",
                value: w.kills,
                formatter: formatInt,
            },
            {
                label: "Kills / g",
                value: calculateAverage(w.kills, w.count),
                formatter: formatFloat,
            },
            {
                label: "Precision",
                value: calculateRatio(w.precision, w.kills),
                formatter: formatPercent,
            },
        ];

        data.push({
            id: w.id,
            items: items,
            weapon: w.item,
        });
    }

    let sortOptions = [
        {
            label: "Games",
        },
        {
            label: "Kills",
        },
        {
            label: "Kills / g",
        },
        {
            label: "Precision",
        },
    ];

    const onSortChange = (item, index) => {
        setSortIndex(index);
    };

    data.sort((a, b) => {
        return b.items[sortIndex].value - a.items[sortIndex].value;
    });

    return (
        <PlayerWeaponsDetailList
            weapons={data}
            title="weapons"
            description={description}
            sortOptions={sortOptions}
            onSortChange={onSortChange}
        />
    );
};

export default PlayerWeaponsDetailView;
