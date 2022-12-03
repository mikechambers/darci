import React from "react";
import { createRow } from "./PlayerCompareView";

import { calculateRatio } from "shared/packages/utils";

import {
    HUMAN_DATE_TIME_FORMATTER,
    INT_FORMATTER,
    PERCENT_INT_FORMATTER,
} from "../../../core/utils/string";
import CompareSectionView from "./CompareSectionView";

const CompareOverviewSectionView = (props) => {
    const summary1 = props.summary1;
    const summary2 = props.summary2;

    let data = formatData(summary1, summary2);

    return <CompareSectionView data={data} id="stats" />;
};

const formatData = function (s0, s1) {
    let out = [
        createRow(
            "Games",
            s0.summary.activityCount,
            s1.summary.activityCount,
            INT_FORMATTER
        ),
        createRow(
            "Win %",
            calculateRatio(s0.summary.wins, s0.summary.activityCount),
            calculateRatio(s1.summary.wins, s1.summary.activityCount),
            PERCENT_INT_FORMATTER
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
            PERCENT_INT_FORMATTER
        ),
        createRow(
            "Completed %",
            calculateRatio(s0.summary.completed, s0.summary.activityCount),
            calculateRatio(s1.summary.completed, s1.summary.activityCount),
            PERCENT_INT_FORMATTER
        ),
        createRow(
            "Time Played",
            s0.summary.timePlayedSeconds,
            s1.summary.timePlayedSeconds,
            HUMAN_DATE_TIME_FORMATTER
        ),
    ];

    return out;
};

export default CompareOverviewSectionView;
