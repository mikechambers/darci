import React from "react";
import { createRow } from "./PlayerCompareView";

import { calculateAverage, calculateRatio } from "shared/packages/utils";

import CompareSectionView from "./CompareSectionView";
import {
    formatHumanDateTime,
    formatHumanDateTimeSecs,
    formatInt,
    formatPercentInt,
} from "../../../core/utils/string";

const CompareOverviewSectionView = (props) => {
    const summary1 = props.summary1;
    const summary2 = props.summary2;

    let data = formatData(summary1, summary2);

    console.log(summary1);

    return <CompareSectionView data={data} id="stats" />;
};

const formatData = function (s0, s1) {
    let out = [
        createRow(
            "Games",
            s0.summary.activityCount,
            s1.summary.activityCount,
            formatInt
        ),
        createRow(
            "Win %",
            calculateRatio(s0.summary.wins, s0.summary.activityCount),
            calculateRatio(s1.summary.wins, s1.summary.activityCount),
            formatPercentInt
        ),
        createRow(
            "Mercy %",
            calculateRatio(
                s0.summary.completionReasonMercy,
                s0.summary.activityCount
            ),
            calculateRatio(
                s1.summary.completionReasonMercy,
                s1.summary.activityCount
            ),
            formatPercentInt
        ),
        createRow(
            "Timer Expired %",
            calculateRatio(
                s0.summary.completionReasonTimeExpired,
                s0.summary.activityCount
            ),
            calculateRatio(
                s1.summary.completionReasonTimeExpired,
                s1.summary.activityCount
            ),
            formatPercentInt
        ),
        createRow(
            "Objective Completed %",
            calculateRatio(
                s0.summary.completionReasonObjectiveCompleted,
                s0.summary.activityCount
            ),
            calculateRatio(
                s1.summary.completionReasonObjectiveCompleted,
                s1.summary.activityCount
            ),
            formatPercentInt
        ),

        createRow(
            "Completed %",
            calculateRatio(s0.summary.completed, s0.summary.activityCount),
            calculateRatio(s1.summary.completed, s1.summary.activityCount),
            formatPercentInt
        ),

        createRow(
            "Time / g",
            calculateAverage(
                s0.summary.timePlayedSeconds,
                s0.summary.activityCount
            ),
            calculateAverage(
                s1.summary.timePlayedSeconds,
                s1.summary.activityCount
            ),
            formatHumanDateTimeSecs
        ),

        createRow(
            "Time Played",
            s0.summary.timePlayedSeconds,
            s1.summary.timePlayedSeconds,
            formatHumanDateTime
        ),
    ];

    return out;
};

export default CompareOverviewSectionView;
