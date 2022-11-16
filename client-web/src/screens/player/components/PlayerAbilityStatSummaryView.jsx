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

import { calculatePercent } from "shared/packages/utils";

import StatCollectionView from "../../../components/StatCollectionView";

const PlayerAbilityStatSummaryView = (props) => {
    let total = props.total;
    let weapons = props.weapons;
    let melees = props.melees;
    let supers = props.supers;
    let grenades = props.grenades;

    let values = [
        {
            value: calculatePercent(weapons, total).toFixed() + "%",
            label: "weapon",
        },
        {
            value: calculatePercent(melees, total).toFixed() + "%",
            label: "melee",
        },
        {
            value: calculatePercent(grenades, total).toFixed() + "%",
            label: "grenade",
        },
        {
            value: calculatePercent(supers, total).toFixed() + "%",
            label: "super",
        },
    ];

    return <StatCollectionView title="Kills Breakdown" values={values} />;
};

export default PlayerAbilityStatSummaryView;
