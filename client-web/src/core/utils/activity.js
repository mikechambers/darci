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

const { CompletionReason, Standing } = require("shared");

const {
    calculateEfficiency,
    calculateKillsDeathsRatio,
    calculateKillsDeathsAssists,
} = require("shared");

//note this modifies the passed in reference (to save memory / cpu)
export const calculateStats = (stats, mode) => {
    let standing = Standing.fromIdAndMode(stats.standing, mode);
    stats.standing = standing;

    let completionReason = CompletionReason.fromId(stats.completionReason);
    stats.completionReason = completionReason;

    let kills = stats.kills;
    let assists = stats.assists;
    let deaths = stats.deaths;

    stats.efficiency = calculateEfficiency(kills, deaths, assists);
    stats.killsDeathsRatio = calculateKillsDeathsRatio(kills, deaths);
    stats.killsDeathsAssists = calculateKillsDeathsAssists(
        kills,
        deaths,
        assists
    );

    return stats;
};
