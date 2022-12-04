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

import { DateTime } from "luxon";
import { useEffect, useState } from "react";
import { calculatePercent } from "shared/packages/utils";

const barContainerStyle = {
    width: "50%",
    backgroundColor: "#FFFFFF22",
};

const elementStyleBase = {
    display: "flex",
    flexDirection: "column",
    rowGap: 4,
};

const barStyleBase = {
    backgroundColor: "#FFFFFF88",
    height: "2px",
};

const RefreshStatusView = (props) => {
    const lastUpdate = props.lastUpdate;
    const refreshInterval = props.refreshInterval;
    const align = props.align;

    let elementAlign = "flex-start";
    if (align === "center") {
        elementAlign = "center";
    } else if (align === "right") {
        elementAlign = "flex-end";
    }

    const [elapsedTime, setElapsedTime] = useState(0);
    useEffect(() => {
        if (!lastUpdate) {
            return;
        }

        let isMounted = true;

        let lastUpdateMs = lastUpdate.getTime();
        const frameCallback = (elapsed) => {
            //this is to keep setState being called after component is removed
            if (!isMounted) {
                return;
            }
            let t = Date.now() - lastUpdateMs;

            setElapsedTime(t);

            if (t >= refreshInterval) {
                return;
            }

            window.requestAnimationFrame(frameCallback);
        };

        const intervalId = window.requestAnimationFrame(frameCallback);

        //todo: issue is we only capture the first interval
        return () => {
            isMounted = false;
            window.cancelAnimationFrame(intervalId);
        };
    }, [lastUpdate, refreshInterval]);

    let s = "Waiting to update";
    let percent = 0;
    if (lastUpdate) {
        let out = DateTime.fromJSDate(lastUpdate).toRelative();
        s = `Last updated ${out}`;
        percent = calculatePercent(elapsedTime, refreshInterval);
        percent = Math.min(percent, 100);
    }

    const elementStyle = {
        ...elementStyleBase,
        alignItems: elementAlign,
    };

    const barStyle = {
        ...barStyleBase,
        width: `${percent.toFixed(2)}%`,
    };

    return (
        <div style={elementStyle}>
            <div style={barContainerStyle}>
                <div style={barStyle}></div>
            </div>
            <div>{s}</div>
        </div>
    );
};

export default RefreshStatusView;
