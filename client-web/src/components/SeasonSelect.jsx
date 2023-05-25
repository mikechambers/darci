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

import Season from "shared/packages/enums/Season";
import EnumSelect from "./EnumSelect";

const seasons = [
    Season.RED_WAR,
    Season.CURSE_OF_OSIRIS,
    Season.WARMIND,
    Season.SEASON_OF_THE_OUTLAW,
    Season.SEASON_OF_THE_FORGE,
    Season.SEASON_OF_THE_DRIFTER,
    Season.SEASON_OF_OPULENCE,
    Season.SEASON_OF_THE_UNDYING,
    Season.SEASON_OF_DAWN,
    Season.SEASON_OF_THE_WORTHY,
    Season.SEASON_OF_ARRIVALS,
    Season.SEASON_OF_THE_HUNT,
    Season.SEASON_OF_THE_CHOSEN,
    Season.SEASON_OF_THE_SPLICER,
    Season.SEASON_OF_THE_LOST,
    Season.SEASON_OF_THE_RISEN,
    Season.SEASON_OF_THE_HAUNTED,
    Season.SEASON_OF_PLUNDER,
    Season.SEASON_OF_THE_SERAPH,
    Season.SEASON_OF_DEFIANCE,
    Season.SEASON_OF_THE_DEEP,
];

const SeasonSelect = (props) => {
    const onChange = props.onChange;
    const selected = props.selected;
    const maxLabelLength = props.maxLabelLength;
    const label = props.label ? props.label : "";
    const disabled = props.disabled;

    return (
        <EnumSelect
            onChange={onChange}
            options={seasons}
            selected={selected}
            label={label}
            maxLabelLength={maxLabelLength}
            disabled={disabled}
        />
    );
};

export default SeasonSelect;
