import React from "react";
import { PLAYER_VIEW_REFRESH_INTERVAL } from "../../../core/consts";
import { useFetchPlayerProfile } from "../../../hooks/remote";
import PassageStatusView from "./PassageStatusView";

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
        <div>
            <PassageStatusView card={card} />
        </div>
    );
};

export default OverlayTrialsView;
