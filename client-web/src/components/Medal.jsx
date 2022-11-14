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

import { LARGE, MEDIUM, SMALL } from "../core/consts";

const Medal = (props) => {
    const medal = props.medal;
    const count = props.count;
    const size = props.size ? props.size : LARGE;

    let fontSize = 16;
    let width = 96;
    let minWidth = 25;

    if (size === MEDIUM) {
        width = 32;
        minWidth = 11;
        fontSize = 9;
    } else if (size === SMALL) {
        width = 20;
        minWidth = 10;
        fontSize = 8;
    }

    let elementWrapperStyle = {
        width: width,
        height: width,
        backgroundImage: `url(${medal.icon})`,
        backgroundSize: "cover",
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "flex-end",
    };

    let badgeStyle = {
        borderRadius: 2,
        backgroundColor: "#dddddd",
        color: "#222222",
        fontSize: fontSize,
        padding: 1,
        minWidth: minWidth,
        minHeight: minWidth,
        textAlign: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontWeight: "bold",
    };

    const badge =
        count > 1 ? (
            <div
                style={badgeStyle}
                title={`${count} medal${count > 1 ? "s" : ""}`}
            >
                {count}
            </div>
        ) : (
            ""
        );
    return (
        <div
            style={elementWrapperStyle}
            title={`${medal.name} : ${medal.description}`}
        >
            {badge}
        </div>
    );
};

export default Medal;
