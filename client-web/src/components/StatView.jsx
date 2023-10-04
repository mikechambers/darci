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

import { LARGE, LEFT, RIGHT, SMALL } from "../core/consts";

const StatView = (props) => {
    const label = props.label;
    const value = props.value;
    const styleName = props.styleName;
    const className = props.className ? props.className : "";

    const align = props.align ? props.align : LEFT;
    const highlight = props.highlight === true ? true : false;
    const title = props.title ? props.title : "";

    let labelClassName = "label";
    let valueClassName = "data";

    if (styleName) {
        labelClassName = `${labelClassName}_${styleName}`;
        valueClassName = `${valueClassName}_${styleName}`;
    }

    if (styleName === SMALL) {
        labelClassName = "label_small";
        valueClassName = "data";
    } else if (styleName === LARGE) {
        labelClassName = "label_highlight";
        valueClassName = "data_highlight";
    }

    let s = {
        textAlign: align,
        alignItems: align === RIGHT ? "flex-end" : "flex-start",
    };

    let highlightStyle = {};

    if (highlight) {
        highlightStyle.textDecoration = "underline";
        highlightStyle.textDecorationColor = "#3FD445";
        highlightStyle.textDecorationStyle = "solid";
        highlightStyle.textDecorationThickness = "2px";
    }

    return (
        <div style={s} className="activity_header_stats">
            <div
                className={valueClassName}
                title={title}
                style={highlightStyle}
            >
                {value.toLocaleString()}
            </div>
            <div title={title} className={labelClassName}>
                {label}
            </div>
        </div>
    );
};

export default StatView;
