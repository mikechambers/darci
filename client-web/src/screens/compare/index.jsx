import React from "react";
import { useParams } from "react-router-dom";
import PageSectionView from "../../components/PageSectionView";
import { Buffer } from "buffer";
import {
    CharacterClass,
    CharacterClassSelection,
    Mode,
    Moment,
    Season,
} from "shared";
import { SEASON_TYPE } from "../../core/consts";
import { useFetchPlayerSummary } from "../../hooks/remote";
import LoadingAnimationView from "../../components/LoadingAnimationView";
import { subtractDaysFromDate } from "shared/packages/enums/Moment";
import { calculateAverage, calculatePercent } from "../../core/utils";

const pageContainerStyle = {
    //minWidth: "720px",
    width: "100%",
};

const gappedStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "30px",
    //width: "250px",
    //width: "min-content",
};

const CompareView = (props) => {
    const params = useParams();
    let encodedData = params.data;

    let json = Buffer.from(encodedData, "base64").toString("utf8");

    let data = JSON.parse(json);

    let sm0;
    let em0;
    if (data[0].period.type === SEASON_TYPE) {
        let s = Season.fromType(data[0].period.season);
        sm0 = s.startMoment;
        em0 = s.endMoment;
    } else {
        sm0 = Moment.fromType(data[0].period.startMoment);
        em0 = Moment.fromType(data[0].period.endMoment);
    }

    let [player0Summary, isPlayer0SummaryLoading, player0SummaryLoadError] =
        useFetchPlayerSummary({
            refreshInterval: 0,
            memberId: data[0].memberId,
            mode: Mode.fromType(data[0].mode),
            startMoment: sm0,
            endMoment: em0,
            characterClass: CharacterClassSelection.fromType(
                data[0].characterClass
            ),
            undefined,
        });

    let sm1;
    let em1;
    if (data[1].period.type === SEASON_TYPE) {
        let s = Season.fromType(data[1].period.season);
        sm1 = s.startMoment;
        em1 = s.endMoment;
    } else {
        sm1 = Moment.fromType(data[1].period.startMoment);
        em1 = Moment.fromType(data[1].period.endMoment);
    }

    let [player1Summary, isPlayer1SummaryLoading, player1SummaryLoadError] =
        useFetchPlayerSummary({
            refreshInterval: 0,
            memberId: data[1].memberId,
            mode: Mode.fromType(data[1].mode),
            startMoment: sm1,
            endMoment: em1,
            characterClass: CharacterClassSelection.fromType(
                data[1].characterClass
            ),
            undefined,
        });

    //console.log(player0Summary);
    //console.log(player1Summary);

    if (isPlayer0SummaryLoading || isPlayer1SummaryLoading) {
        return <LoadingAnimationView message="Loading Player data." />;
    }

    const calculatePercentChange = function (o, n) {
        return ((n - o) / o) * 100;
    };

    const f = (label, a, b, isPercent) => {
        let c = calculatePercentChange(a, b);

        a = isPercent ? `${a.toFixed(2)}%` : a.toLocaleString("en-US");
        b = isPercent ? `${b.toFixed(2)}%` : b.toLocaleString("en-US");

        return {
            label,
            data0: a,
            data1: b,
            change: c,
        };
    };

    let s0 = player0Summary;
    let s1 = player1Summary;
    let sData = [
        f("Games", s0.summary.activityCount, s1.summary.activityCount),
        f(
            "Win %",
            calculatePercent(s0.summary.wins, s0.summary.activityCount),
            calculatePercent(s1.summary.wins, s1.summary.activityCount),
            true
        ),
        f(
            "Mercy %",
            calculatePercent(
                s0.summary.completionReasonMercy,
                s0.summary.activityCount
            ),
            calculatePercent(
                s1.summary.completionReasonMercy,
                s1.summary.activityCount
            ),
            true
        ),
        f(
            "Completed %",
            calculatePercent(s0.summary.completed, s0.summary.activityCount),
            calculatePercent(s1.summary.completed, s1.summary.activityCount)
        ),

        f(
            "Kill / g",
            calculateAverage(s0.summary.kills, s0.summary.activityCount),
            calculateAverage(s1.summary.kills, s1.summary.activityCount)
        ),
        f("Kills", s0.summary.kills, s1.summary.kills),
        f(
            "Assists / g",
            calculateAverage(s0.summary.assists, s0.summary.activityCount),
            calculateAverage(s1.summary.assists, s1.summary.activityCount)
        ),
        f("Assists", s0.summary.assists, s1.summary.assists),
        f(
            "Defeats / g",
            calculateAverage(
                s0.summary.opponentsDefeated,
                s0.summary.activityCount
            ),
            calculateAverage(
                s1.summary.opponentsDefeated,
                s1.summary.activityCount
            )
        ),
        f(
            "Defeats",
            s0.summary.opponentsDefeated,
            s1.summary.opponentsDefeated
        ),
        f(
            "Deaths / g",
            calculateAverage(s0.summary.deaths, s0.summary.activityCount),
            calculateAverage(s1.summary.deaths, s1.summary.activityCount)
        ),
        f("Deaths", s0.summary.deaths, s1.summary.deaths),
    ];

    console.log(s0);

    const style = {
        padding: "6px",
    };

    const formatChanged = (d) => {
        const pre = d > 0 ? "+" : "";

        return `${pre}${d.toFixed(2)}`;
    };
    return (
        <div
            id="page_nav"
            className="page_containter"
            style={pageContainerStyle}
        >
            <div style={gappedStyle}>
                <PageSectionView
                    id="results"
                    title="Results"
                    description="Player search"
                />

                <div>
                    <table style={{ width: "500px", cellSpacing: "6px" }}>
                        <tbody>
                            {sData.map((d) => {
                                return (
                                    <tr key={d.label} style={style}>
                                        <td className="subsection_header">
                                            {d.label}
                                        </td>
                                        <td className="label_data">
                                            {d.data0}
                                        </td>
                                        <td className="label_data">
                                            {d.data1}
                                        </td>
                                        <td className="label_data">
                                            {formatChanged(d.change)}%
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default CompareView;
