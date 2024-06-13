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

import Mode from "shared/packages/enums/Mode";
import EnumSelect from "./EnumSelect";

/*
const modes = [
    Mode.PVP_QUICKPLAY,
    Mode.PVP_COMPETITIVE,
    Mode.TRIALS_OF_OSIRIS,
    Mode.IRON_BANNER,
    Mode.RUMBLE,
    Mode.CONTROL_QUICKPLAY,
    Mode.CLASH_QUICKPLAY,
    Mode.SURVIVAL_COMPETITIVE,
    Mode.SHOWDOWN_COMPETITIVE,
    Mode.RIFT_COMPETITIVE,
    Mode.ZONE_CONTROL,
    Mode.RELIC,
    Mode.MAYHEM,
    Mode.MOMENTUM,
    Mode.ELIMINATION,
    Mode.SUPREMACY,
    Mode.CHECKMATE_ALL,
    Mode.PRIVATE_MATCHES_ALL,
    Mode.ALL_PVP,
];
*/

const ModeSelect = (props) => {
    const onChange = props.onChange;
    const selected = props.selected;
    const maxLabelLength = props.maxLabelLength;
    const label = props.label ? props.label : "";
    const disabled = props.disabled;

    return (
        <EnumSelect
            onChange={onChange}
            options={Mode.allCases}
            selected={selected}
            label={label}
            maxLabelLength={maxLabelLength}
            disabled={disabled}
        />
    );
};

export default ModeSelect;
