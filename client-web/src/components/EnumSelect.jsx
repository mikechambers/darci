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

import { truncate } from "../core/utils/string";

const EnumSelect = (props) => {
    let options = props.options;
    let selected = props.selected;
    let label = props.label;
    let onChange = props.onChange;
    let maxLabelLength = props.maxLabelLength ? props.maxLabelLength : 100;
    const disabled =
        props.disabled !== undefined && props.disabled ? true : false;

    let handleOnChange = function (e) {
        if (!onChange) {
            return;
        }
        onChange(options[e.target.selectedIndex]);
    };

    let labelDiv = label ? <label className="form_label">{label}</label> : "";

    if (!options) {
        options = [];
    }
    return (
        <div>
            {labelDiv}
            <select
                onChange={handleOnChange}
                value={selected ? selected.value : ""}
                disabled={disabled}
            >
                {options.map((item) => {
                    let key = item.key ? item.key : item.value;

                    return (
                        <option key={key} value={item.value}>
                            {truncate(item.label, maxLabelLength)}
                        </option>
                    );
                })}
            </select>
        </div>
    );
};

export default EnumSelect;
