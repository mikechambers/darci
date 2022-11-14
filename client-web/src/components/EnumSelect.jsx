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
        onChange(options[e.target.selectedIndex].data);
    };

    if (!options) {
        options = [];
    }

    options = options.map((item, index) => {
        return {
            value: item.label,
            label: truncate(item.label, maxLabelLength),
            data: item,
        };
    });

    let defaultValue = "";
    if (options && options.length && props.selected) {
        const found = options.find((option) => {
            //note, label may be truncated in options
            return option.value === selected.label;
        });

        //defaultValue = found ? found.value : options[0].value;

        if (found) {
            defaultValue = found.value;
        } else {
            //if we get here it means that a default value was passed in
            //that is not in the data set (happens when we remove a season option)
            //so, we set default to the first item in the data, and then broadcast that
            //the selected item changed. But we have to wait a frame to do it
            //since we cant cause a re-render when the component is rendering.
            defaultValue = options[0].value;
            window.requestAnimationFrame(() => {
                onChange(options[0].data);
            });
        }
    } else if (options && options.length && !props.selected) {
        //todo: this feels really hacky and there is almost certainly a better way
        //to do this. basically this is here so wrapper of this are always insync with
        //the values. this specific case is for when the options are loaded from the sever
        //and no selected value is passed in. so we need to set the first item to selected
        //and call back
        window.requestAnimationFrame(() => {
            console.log("hi");
            onChange(options[0].data);
        });
    }

    let labelDiv = label ? <label className="form_label">{label}</label> : "";

    return (
        <div>
            {labelDiv}
            <select
                onChange={handleOnChange}
                value={defaultValue}
                disabled={disabled}
            >
                {options.map((item) => {
                    return (
                        <option key={item.value} value={item.value}>
                            {item.label}
                        </option>
                    );
                })}
            </select>
        </div>
    );
};

export default EnumSelect;
