import React from "react";
import RoundedImageView from "../../../components/RoundedImageView";
import SwatchView from "../../../components/SwatchView";
import { PLAYER_VIEW_REFRESH_INTERVAL } from "../../../core/consts";
import { INT_FORMATTER } from "../../../core/utils/string";
import { useFetchPlayerProfile } from "../../../hooks/remote";
import CardSwatchView, { CARD_FLAWLESS } from "./CardSwatchView";
import OverlayStatView from "./OverlayStatView";
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
            isFlawless: 0,
            passage: { name: "No Passage", icon: undefined },
        };
    }

    console.log(card);

    return (
        <div style={rootStyle}>
            <div className="overlay_title">{card.passage.name}</div>

            <div style={contentRowStyle}>
                <RoundedImageView
                    width={50}
                    height={50}
                    image={card.passage.icon}
                />

                <PassageStatusView card={card} />
                <div>
                    <CardSwatchView type={CARD_FLAWLESS} />
                    <div className="overlay_stat_label">Flawless</div>
                </div>
                <OverlayStatView
                    label="weekly"
                    value={0}
                    formatter={INT_FORMATTER}
                />
            </div>
        </div>
    );
};

export default OverlayTrialsView;
