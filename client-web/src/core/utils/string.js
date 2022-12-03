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

import { FLOAT_DECIMAL_PRECISION } from "../consts";
import { humanDuration } from "./date";

//Format floating point  23.40
export const FLOAT_FORMATTER = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: FLOAT_DECIMAL_PRECISION,
    maximumFractionDigits: FLOAT_DECIMAL_PRECISION,
});

//format numbers / ints 23
export const INT_FORMATTER = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
});

//format number / int percent 23%
export const PERCENT_INT_FORMATTER = new Intl.NumberFormat("en-US", {
    style: "percent",
    minimumFractionDigits: 0, //change both to 2 for trailing numbers
    maximumFractionDigits: 0,
});

//format percent float 23.40%
export const PERCENT_FORMATTER = new Intl.NumberFormat("en-US", {
    style: "percent",
    minimumFractionDigits: FLOAT_DECIMAL_PRECISION, //change both to 2 for trailing numbers
    maximumFractionDigits: FLOAT_DECIMAL_PRECISION,
});

//format percent change number +24%
export const PERCENT_CHANGE_INT_FORMATTER = new Intl.NumberFormat("en-US", {
    style: "percent",
    signDisplay: "exceptZero",
    minimumFractionDigits: 0, //change both to 2 for trailing numbers
    maximumFractionDigits: 0,
});

export const HUMAN_DATE_TIME_FORMATTER = {
    format: (s) => {
        return humanDuration(s * 1000, true);
    },
};

export const capitalize = function (str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
};

//https://stackoverflow.com/a/1199420/10232
export const truncate = function (str, n) {
    return str.length > n ? str.substr(0, n - 1) + "..." : str;
};
