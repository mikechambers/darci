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

import Medal from "../../../components/Medal";
import { MEDIUM } from "../../../core/consts";

let style = {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    flexWrap: "wrap",
};

const medal_style = {
    display: "flex",
    alignItems: "center",
    padding: "0px 20px 20px 0px",
};

const GoldMedalSummaryView = (props) => {
    let medals = props.medals ? props.medals : [];
    let max = props.max ? props.max : 5;

    medals.sort((a, b) => {
        if (b.info.isGold === a.info.isGold) {
            return b.count - a.count;
        }

        if (b.info.isGold && !a.info.isGold) {
            return 1;
        }

        return -1;
    });

    //only display gold medals
    medals = medals.filter((m) => m.info.isGold);

    if (medals.length > max) {
        medals = medals.slice(0, max);
    }

    if (medals.length === 0) {
        return "";
    }

    return (
        <div style={style}>
            {medals.map((m, index) => {
                return (
                    <div style={medal_style} key={m.id}>
                        <Medal medal={m.info} count={m.count} size={MEDIUM} />
                        &nbsp;
                        {m.info.name}
                    </div>
                );
            })}
        </div>
    );
};

export default GoldMedalSummaryView;
