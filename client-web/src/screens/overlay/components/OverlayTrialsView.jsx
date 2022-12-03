import React from "react";
import RoundedImageView from "../../../components/RoundedImageView";
import SwatchView from "../../../components/SwatchView";
import { PLAYER_VIEW_REFRESH_INTERVAL } from "../../../core/consts";
import { INT_FORMATTER } from "../../../core/utils/string";
import { useFetchPlayerProfile } from "../../../hooks/remote";
import CardSwatchView, { CARD_FLAWLESS } from "./CardSwatchView";
import OverlayStatView from "./OverlayStatView";
import OverlayTrialsFlawlessView from "./OverlayTrialsFlawlessView";
import PassageStatusView from "./PassageStatusView";

const rootStyle = {
    display: "flex",
    flexDirection: "column",
    gap: 4,
};

const contentRowStyle = {
    display: "flex",
    flexDirection: "row",
};

const OverlayTrialsView = (props) => {
    const memberId = props.memberId;
    const platformId = props.platformId;
    const refreshInterval = props.refreshInterval
        ? props.refreshInterval
        : PLAYER_VIEW_REFRESH_INTERVAL;

    const config = props.config;

    const [profile, isLoading, error] = useFetchPlayerProfile(
        refreshInterval,
        memberId,
        platformId
    );

    if (!profile) {
        return "";
    }

    let card =
        profile.lastActiveCharacterProfile.progressions.trials.currentCard;

    if (!card) {
        card = {
            wins: 0,
            losses: 0,
            roundsWon: 0,
            isFlawless: undefined,
            passage: {
                name: "No Passage",
                icon: "https://www.bungie.net/common/destiny2_content/icons/892caaf523b17aca478cbea3d63a07d0.jpg",
            },
        };
    }
    console.log(config);

    const divs = [];

    const labelDiv = config.showCardInfo ? (
        <div className="overlay_title">{card.passage.name}</div>
    ) : (
        ""
    );
    const cardDiv = config.showCardInfo ? (
        <React.Fragment key="0">
            <div className="overlay_list_item">
                <RoundedImageView
                    width={50}
                    height={50}
                    image={card.passage.icon}
                />
            </div>

            <PassageStatusView card={card} />
            <OverlayTrialsFlawlessView flawless={card.isFlawless} />
        </React.Fragment>
    ) : (
        ""
    );
    const flawlessDiv = config.showWeeklyFlawlessCount ? (
        <OverlayStatView
            key="1"
            label="weekly"
            value={0}
            formatter={INT_FORMATTER}
        />
    ) : (
        ""
    );

    return (
        <div style={rootStyle}>
            {labelDiv}
            <div className="overlay_list_row">
                {cardDiv}
                {flawlessDiv}
            </div>
        </div>
    );
};

export default OverlayTrialsView;
