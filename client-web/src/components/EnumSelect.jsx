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

import React, { useEffect, useState } from "react";

import { truncate } from "../core/utils/string";

const EnumSelect = (props) => {
    let options = props.options;
    let selected = props.selected;
    let label = props.label;
    let onChange = props.onChange;
    let maxLabelLength = props.maxLabelLength ? props.maxLabelLength : 100;
    const disabled =
        props.disabled !== undefined && props.disabled ? true : false;

    //let [selectedItem, setSelectedItem] = useState(selected);
    /*
    useEffect(() => {
        if (selectedItem) {
            onChange(selectedItem);
        }
    }, [selectedItem]);
    */

    let handleOnChange = function (e) {
        //setSelectedItem(options[e.target.selectedIndex]);
        onChange(options[e.target.selectedIndex]);
    };

    /*
    useEffect(() => {
        if (options && selected) {
            let s = options.find((element) => element.value === selected.value);

            if (s) {
                setSelectedItem(s);
            }
        }
    }, [options, selected]);
    */

    let labelDiv = label ? <label className="form_label">{label}</label> : "";

    return (
        <div>
            {labelDiv}
            <select
                onChange={handleOnChange}
                value={selected ? selected : ""}
                disabled={disabled}
            >
                {options.map((item) => {
                    return (
                        <option
                            key={item.value}
                            defaultValue={selected ? selected : ""}
                            value={item.value}
                        >
                            {truncate(item.label, maxLabelLength)}
                        </option>
                    );
                })}
            </select>
        </div>
    );
};

export default EnumSelect;
