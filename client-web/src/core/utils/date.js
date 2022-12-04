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

import { Duration } from "luxon";

export const dateIsToday = function (d) {
    let n = new Date();
    return (
        d.getFullYear() === n.getFullYear() &&
        d.getMonth() === n.getMonth() &&
        d.getDate() === n.getDate()
    );
};

export const dateIsWithinLastWeek = function (d) {
    let n = new Date();
    let diffMs = Math.abs(d.getTime() - n.getTime());
    const weekMs = 7 * 24 * 60 * 60 * 1000;
    return diffMs > weekMs;
};

export const humanDuration = function (ms, short = false, showSeconds = false) {
    var dur = Duration.fromMillis(ms)
        .shiftTo("years", "months", "days", "hours", "minutes", "seconds")
        .toObject();

    let f = function (data, label) {
        if (!data) {
            return null;
        }

        let space = short ? "" : " ";
        let out = `${data}${space}${label}`;

        if (!short && data > 1) {
            out += "s";
        }

        out += ",";
        return out;
    };

    let humanDurationParts = [];
    humanDurationParts.push(f(dur.years, short ? "y" : "year"));
    humanDurationParts.push(f(dur.months, short ? "m" : "month"));
    humanDurationParts.push(f(dur.days, short ? "d" : "day"));
    humanDurationParts.push(f(dur.hours, short ? "h" : "hour"));
    humanDurationParts.push(f(dur.minutes, short ? "m" : "minute"));

    if (showSeconds) {
        const s = Math.round(dur.seconds);
        if (short) {
            humanDurationParts.push(f(s, short ? "s" : "second"));
        } else {
            humanDurationParts.push(f(s, "second"));
        }
    }

    humanDurationParts = humanDurationParts.filter((entry) => entry !== null);

    if (humanDurationParts.length > 1) {
        //remove the comma before the and
        humanDurationParts[humanDurationParts.length - 2] = humanDurationParts
            .at(-2)
            .slice(0, -1);

        humanDurationParts.splice(humanDurationParts.length - 1, 0, "and");
    }

    if (humanDurationParts.length) {
        humanDurationParts[humanDurationParts.length - 1] = humanDurationParts
            .at(-1)
            .slice(0, -1);
    }

    return humanDurationParts.join(" ");
};
