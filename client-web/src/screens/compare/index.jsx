import React from "react";
import { useParams } from "react-router-dom";
import PageSectionView from "../../components/PageSectionView";
import { Buffer } from "buffer";
import { CharacterClass, Mode, Moment, Season } from "shared";
import { SEASON_TYPE } from "../../core/consts";
import { useFetchPlayerSummary } from "../../hooks/remote";
import LoadingAnimationView from "../../components/LoadingAnimationView";

const pageContainerStyle = {
    //minWidth: "720px",
    width: "000%",
};

const gappedStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "30px",
    //width: "250px",
    width: "min-content",
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
            characterClass: CharacterClass.fromType(data[0].characterClass),
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
            characterClass: CharacterClass.fromType(data[1].characterClass),
            undefined,
        });

    console.log(player0Summary);
    console.log(player1Summary);

    if (isPlayer0SummaryLoading || isPlayer1SummaryLoading) {
        return <LoadingAnimationView message="Loading Player data." />;
    }

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
            </div>
        </div>
    );
};

export default CompareView;
