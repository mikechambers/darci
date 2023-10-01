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

import { Moment } from "shared";
import { CURRENT_SEASON } from "../core/consts";
import EnumSelect from "./EnumSelect";

const moments = [
    Moment.DAILY,
    Moment.WEEKLY,
    Moment.WEEKEND,
    Moment.DAY,
    Moment.WEEK,
    Moment.MONTH,
    CURRENT_SEASON.startMoment,
    Moment.NOW,
    Moment.ALL_TIME,
];

const MomentSelect = (props) => {
    const onChange = props.onChange;
    const selected = props.selected;
    const maxLabelLength = props.maxLabelLength;
    const label = props.label ? props.label : "";
    const disabled = props.disabled;

    return (
        <EnumSelect
            onChange={onChange}
            options={moments}
            selected={selected}
            label={label}
            maxLabelLength={maxLabelLength}
            disabled={disabled}
        />
    );
};

export default MomentSelect;
