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

import { MOMENT_TYPE } from "../consts";

export const calculateAverage = (value, total) => {
    if (!total) {
        return 0;
    }

    return value / total;
};

export const calculatePercent = (value, total) => {
    if (!total) {
        return 0;
    }

    return (value / total) * 100.0;
};

/***
{
  player,
    characterClass,
    mode,
    periodType,
    startMoment,
    endMoment,
    season,
    orderBy;
}
*/
export const createPlayerUrl = function (opts) {
    let seasonStartMomentString =
        opts.periodType === MOMENT_TYPE
            ? opts.startMoment.type
            : opts.season.type;

    let lastArgStr =
        opts.periodType === MOMENT_TYPE && opts.endMoment
            ? `${opts.endMoment.type}/`
            : "";

    let orderByStr = opts.orderBy ? `&orderby=${opts.orderBy.id}` : "";

    let ts = new Date().getTime();

    //this is a little messy
    let url = `/player/${opts.player.memberId}/${opts.player.platformId}/${opts.characterClass.type}/${opts.mode.type}/${opts.periodType}/${seasonStartMomentString}/${lastArgStr}?fr=${ts}${orderByStr}`;

    return url;
};
