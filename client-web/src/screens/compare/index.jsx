import React from "react";
import { useParams, Link } from "react-router-dom";
import PageSectionView from "../../components/PageSectionView";
import { CharacterClassSelection, Mode, Moment, Season } from "shared";
import { SEASON_TYPE } from "../../core/consts";
import { useFetchPlayerSummary } from "../../hooks/remote";
import LoadingAnimationView from "../../components/LoadingAnimationView";

import PlayerCompareView from "./component/PlayerCompareView";
import ScreenNavigationView from "../../components/ScreenNavigationView";
import { deserialize } from "../../core/utils/data";

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

const pageLinks = [
    {
        value: "Overview",
        id: "overview",
    },
    {
        value: "Stats",
        id: "stats",
    },
    {
        value: "Weapons",
        id: "weapons",
    },
    {
        value: "Meta",
        id: "meta",
    },
    {
        value: "Maps",
        id: "maps",
    },
];

const CompareView = (props) => {
    const params = useParams();
    let encodedData = params.data;

    let data = deserialize(encodedData);

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

    if (isPlayer0SummaryLoading || isPlayer1SummaryLoading) {
        return <LoadingAnimationView message="Loading Player data." />;
    }

    return (
        <div
            id="page_nav"
            className="page_containter"
            style={pageContainerStyle}
        >
            <div className="page_content">
                <ScreenNavigationView links={pageLinks} />

                <PageSectionView title="Compare" description="" />

                <div>
                    You can change parameters on the{" "}
                    <Link to="/search/">search page</Link>.
                </div>

                <PlayerCompareView
                    summary1={player0Summary}
                    summary2={player1Summary}
                    period1={data[0].period}
                    period2={data[1].period}
                />
            </div>
        </div>
    );
};

export default CompareView;
