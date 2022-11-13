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

const TRIALS_WEEKLY_FLAWLESS = "122451876";
const TRIALS_SEASON_FLAWLESS = "1114483243";
const TRIALS_LIFETIME_FLAWLESS = "1765255052";

const TRIALS_SEASON_WIN_STREAK = "957196641";
const TRIALS_WEEKLY_WIN_STREAK = "3787323274"; //this appears to be bugged

const TRIALS_WEEKLY_DEFEATS = "2091173752";
const TRIALS_SEASON_DEFEATS = "3481560625";
const TRIALS_LIFETIME_DEFEATS = "2082314848";

const TRIALS_WEEKLY_WINS = "3046315288";
const TRIALS_SEASON_WINS = "2367472811";
const TRIALS_LIFETIME_WINS = "1365664208";

const IRON_BANNER_SEASON_WINS = "429382583";
const IRON_BANNER_SEASON_GOLD_MEDALS = "1196938828";
const IRON_BANNER_SEASON_EFFICIENCY = "1509147660";
const IRON_BANNER_SEASON_KILLS = "2161492053";

const CRUCIBLE_SEASON_DEFEATS = "2935221077";
const CRUCIBLE_WEEKLY_DEFEATS = "1766068284";
const CRUCIBLE_LIFETIME_DEFEATS = "811894228";

const CRUCIBLE_SEASON_WIN_STREAK = "1249684581";
const CRUCIBLE_WEEK_WIN_STREAK = "4044111774";

const CRUCIBLE_SEASON_KDA = "871184140";

const CRUCIBLE_SEASON_WIN_RATE = "2941499201";

class PlayerMetrics {
    trials;
    ironBanner;
    crucible;

    constructor(options = {}) {
        this.trials = options.trials;
        this.ironBanner = options.ironBanner;
        this.crucible = options.crucible;
    }

    static fromApi(data) {
        const trials = {
            flawlessWeekly:
                data.metrics.data.metrics[TRIALS_WEEKLY_FLAWLESS]
                    .objectiveProgress.progress,
            flawlessSeason:
                data.metrics.data.metrics[TRIALS_SEASON_FLAWLESS]
                    .objectiveProgress.progress,
            flawlessLifetime:
                data.metrics.data.metrics[TRIALS_LIFETIME_FLAWLESS]
                    .objectiveProgress.progress,

            winStreakWeekly:
                data.metrics.data.metrics[TRIALS_WEEKLY_WIN_STREAK]
                    .objectiveProgress.progress,
            winStreakSeason:
                data.metrics.data.metrics[TRIALS_SEASON_WIN_STREAK]
                    .objectiveProgress.progress,

            defeatsWeekly:
                data.metrics.data.metrics[TRIALS_WEEKLY_DEFEATS]
                    .objectiveProgress.progress,
            defeatsSeason:
                data.metrics.data.metrics[TRIALS_SEASON_DEFEATS]
                    .objectiveProgress.progress,
            defeatsLifetime:
                data.metrics.data.metrics[TRIALS_LIFETIME_DEFEATS]
                    .objectiveProgress.progress,

            winsWeekly:
                data.metrics.data.metrics[TRIALS_WEEKLY_WINS].objectiveProgress
                    .progress,
            winsSeason:
                data.metrics.data.metrics[TRIALS_SEASON_WINS].objectiveProgress
                    .progress,
            winsLifetime:
                data.metrics.data.metrics[TRIALS_LIFETIME_WINS]
                    .objectiveProgress.progress,
        };

        const ironBanner = {
            winsSeason:
                data.metrics.data.metrics[IRON_BANNER_SEASON_WINS]
                    .objectiveProgress.progress,
            goldMedalsSeason:
                data.metrics.data.metrics[IRON_BANNER_SEASON_GOLD_MEDALS]
                    .objectiveProgress.progress,
            efficiencySeason:
                data.metrics.data.metrics[IRON_BANNER_SEASON_EFFICIENCY]
                    .objectiveProgress.progress / 100,
            defeatsSeason:
                data.metrics.data.metrics[IRON_BANNER_SEASON_KILLS]
                    .objectiveProgress.progress,
        };

        const crucible = {
            defeatsWeekly:
                data.metrics.data.metrics[CRUCIBLE_WEEKLY_DEFEATS]
                    .objectiveProgress.progress,
            defeatsSeason:
                data.metrics.data.metrics[CRUCIBLE_SEASON_DEFEATS]
                    .objectiveProgress.progress,
            defeatsLifetime:
                data.metrics.data.metrics[CRUCIBLE_LIFETIME_DEFEATS]
                    .objectiveProgress.progress,

            winStreakWeekly:
                data.metrics.data.metrics[CRUCIBLE_WEEK_WIN_STREAK]
                    .objectiveProgress.progress,
            winStreakSeason:
                data.metrics.data.metrics[CRUCIBLE_SEASON_WIN_STREAK]
                    .objectiveProgress.progress,

            kdaSeason:
                data.metrics.data.metrics[CRUCIBLE_SEASON_KDA].objectiveProgress
                    .progress / 100,

            winRateSeason:
                data.metrics.data.metrics[CRUCIBLE_SEASON_WIN_RATE]
                    .objectiveProgress.progress,
        };

        return new PlayerMetrics({ trials, ironBanner, crucible });
    }
}

export default PlayerMetrics;
