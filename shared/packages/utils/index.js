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

const { API_RESOURCE_BASE_URL } = require("../consts");

const calculateKillsDeathsRatio = function (kills, deaths) {
    return calculateRatio(kills, deaths);
};

const calculateKillsDeathsAssists = function (kills, deaths, assists) {
    let t = kills + assists / 2;
    return deaths !== 0 ? t / deaths : t;
};

const calculateEfficiency = function (kills, deaths, assists) {
    let t = kills + assists;
    return deaths !== 0 ? t / deaths : t;
};

const calculateRatio = function (n, d) {
    return d !== 0 ? n / d : n;
};

const calculatePercent = (value, total) => {
    return calculateRatio(value, total) * 100.0;
};

const calculateChange = function (old, n) {
    if (!old) {
        return 0;
    }

    return (n - old) / old;
};

const calculatePercentChange = function (old, n) {
    return calculateChange(old, n) * 100;
};

const calculateAverage = (value, total) => {
    if (!total) {
        return 0;
    }

    return value / total;
};

const createResourceUrl = (path) => {
    if (!path) {
        return undefined;
    }

    return `${API_RESOURCE_BASE_URL}${path}`;
};

module.exports = {
    calculateEfficiency,
    calculateKillsDeathsRatio,
    calculateKillsDeathsAssists,
    calculateRatio,
    calculatePercent,
    calculateAverage,
    calculateChange,
    calculatePercentChange,
    createResourceUrl,
};
