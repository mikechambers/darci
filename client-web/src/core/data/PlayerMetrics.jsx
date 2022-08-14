const TRIALS_WEEKLY_FLAWLESS = "122451876";
const TRIALS_SEASON_FLAWLESS = "1114483243";
const TRIALS_LIFETIME_FLAWLESS = "1765255052";

const TRIALS_SEASON_WIN_STREAK = "957196641";
const TRIALS_WEEKLY_WIN_STREAK = "3787323274"; //this appears to be bugged

const TRIALS_WEEKLY_KILLS = "2091173752";
const TRIALS_SEASON_KILLS = "3481560625";
const TRIALS_LIFETIME_KILLS = "2082314848";

const TRIALS_WEEKLY_WINS = "3046315288";
const TRIALS_SEASON_WINS = "2367472811";
const TRIALS_LIFETIME_WINS = "1365664208";

class PlayerMetrics {
  trials;

  constructor(options = {}) {
    this.trials = options.trials;
  }

  static fromApi(data) {
    let trials = {
      flawlessWeekly:
        data.metrics.data.metrics[TRIALS_WEEKLY_FLAWLESS].objectiveProgress
          .progress,
      flawlessSeason:
        data.metrics.data.metrics[TRIALS_SEASON_FLAWLESS].objectiveProgress
          .progress,
      flawlessLifetime:
        data.metrics.data.metrics[TRIALS_LIFETIME_FLAWLESS].objectiveProgress
          .progress,

      winStreakWeekly:
        data.metrics.data.metrics[TRIALS_WEEKLY_WIN_STREAK].objectiveProgress
          .progress,
      winStreakSeason:
        data.metrics.data.metrics[TRIALS_SEASON_WIN_STREAK].objectiveProgress
          .progress,

      killsWeekly:
        data.metrics.data.metrics[TRIALS_WEEKLY_KILLS].objectiveProgress
          .progress,
      killsSeason:
        data.metrics.data.metrics[TRIALS_SEASON_KILLS].objectiveProgress
          .progress,
      killsLifetime:
        data.metrics.data.metrics[TRIALS_LIFETIME_KILLS].objectiveProgress
          .progress,

      winsWeekly:
        data.metrics.data.metrics[TRIALS_WEEKLY_WINS].objectiveProgress
          .progress,
      winsSeason:
        data.metrics.data.metrics[TRIALS_SEASON_WINS].objectiveProgress
          .progress,
      winsLifetime:
        data.metrics.data.metrics[TRIALS_LIFETIME_WINS].objectiveProgress
          .progress,
    };

    return new PlayerMetrics({ trials: trials });
  }
}

export default PlayerMetrics;
