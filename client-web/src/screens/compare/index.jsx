import React from "react";
import { useParams } from "react-router-dom";
import PageSectionView from "../../components/PageSectionView";
import { Buffer } from "buffer";
import {
    calculateRatio,
    CharacterClassSelection,
    Mode,
    Moment,
    Season,
} from "shared";
import { SEASON_TYPE } from "../../core/consts";
import { useFetchPlayerSummary } from "../../hooks/remote";
import LoadingAnimationView from "../../components/LoadingAnimationView";
import { calculateAverage } from "shared/packages/utils";

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

    //TODO: move these to const
    let avgFormatter = new Intl.NumberFormat("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });

    let digitFormatter = new Intl.NumberFormat("en-US", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    });

    let percentFormatter = new Intl.NumberFormat("en-US", {
        style: "percent",
        minimumFractionDigits: 0, //change both to 2 for trailing numbers
        maximumFractionDigits: 0,
    });

    let changeFormatter = new Intl.NumberFormat("en-US", {
        style: "percent",
        signDisplay: "exceptZero",
        minimumFractionDigits: 0, //change both to 2 for trailing numbers
        maximumFractionDigits: 0,
    });

    const f = (label, a, b, formatter) => {
        return {
            label,
            data0: formatter.format(a),
            data1: formatter.format(b),
            change: (b - a) / a,
        };
    };

    let s0 = player0Summary;
    let s1 = player1Summary;
    let sData = [
        f(
            "Games",
            s0.summary.activityCount,
            s1.summary.activityCount,
            digitFormatter
        ),
        f(
            "Win %",
            calculateRatio(s0.summary.wins, s0.summary.activityCount),
            calculateRatio(s1.summary.wins, s1.summary.activityCount),
            percentFormatter
        ),
        f(
            "Mercy %",
            calculateRatio(
                s0.summary.completionReasonMercy,
                s0.summary.activityCount
            ),
            calculateRatio(
                s1.summary.completionReasonMercy,
                s1.summary.activityCount
            ),
            percentFormatter
        ),
        f(
            "Completed %",
            calculateRatio(s0.summary.completed, s0.summary.activityCount),
            calculateRatio(s1.summary.completed, s1.summary.activityCount),
            percentFormatter
        ),

        f(
            "Kill / g",
            calculateAverage(s0.summary.kills, s0.summary.activityCount),
            calculateAverage(s1.summary.kills, s1.summary.activityCount),
            avgFormatter
        ),
        f("Kills", s0.summary.kills, s1.summary.kills, digitFormatter),
        f(
            "Assists / g",
            calculateAverage(s0.summary.assists, s0.summary.activityCount),
            calculateAverage(s1.summary.assists, s1.summary.activityCount),
            percentFormatter
        ),
        f("Assists", s0.summary.assists, s1.summary.assists, digitFormatter),
        f(
            "Defeats / g",
            calculateAverage(
                s0.summary.opponentsDefeated,
                s0.summary.activityCount
            ),
            calculateAverage(
                s1.summary.opponentsDefeated,
                s1.summary.activityCount
            ),
            percentFormatter
        ),
        f(
            "Defeats",
            s0.summary.opponentsDefeated,
            s1.summary.opponentsDefeated,
            digitFormatter
        ),
        f(
            "Deaths / g",
            calculateAverage(s0.summary.deaths, s0.summary.activityCount),
            calculateAverage(s1.summary.deaths, s1.summary.activityCount),
            avgFormatter
        ),
        f("Deaths", s0.summary.deaths, s1.summary.deaths, digitFormatter),
    ];

    const tableStyle = {
        borderSpacing: "20px",
        width: "500px",
        verticalAlign: "text-bottom",
        background: "#eeeeee",
        border: "3px solid #111111",
        borderCollapse: "collapse",
    };
    const labelStyle = {
        font: "var(--light) 20px var(--font-family)",
        color: "#222222",
        textAlign: "right",
    };
    const dataStyle = {
        font: "var(--light) 20px var(--font-family)",
        color: "#222222",
        textAlign: "left",
    };

    const changeStyle = {
        ...dataStyle,
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
                    <table style={tableStyle}>
                        <tbody>
                            {sData.map((d) => {
                                let c = {
                                    ...changeStyle,
                                };

                                if (d.change > 0) {
                                    c.color = "#00FF00";
                                } else {
                                    c.color = "#FF0000";
                                }

                                return (
                                    <tr key={d.label}>
                                        <td style={labelStyle}>{d.label}</td>
                                        <td style={dataStyle}>{d.data0}</td>
                                        <td style={dataStyle}>{d.data1}</td>
                                        <td style={c}>
                                            {changeFormatter.format(d.change)}
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
