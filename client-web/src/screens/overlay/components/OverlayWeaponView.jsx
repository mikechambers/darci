import React from "react";
import { useFetchPlayerSummary } from "../../../hooks/remote";
import { PLAYER_VIEW_REFRESH_INTERVAL } from "../../../core/consts";
import { Moment } from "shared";
import { useQuery } from "../../../hooks/browser";
import OverlayWeaponItem from "./OverlayWeaponItem";

const OverlayWeaponView = (props) => {
    const memberId = props.memberId;
    const mode = props.mode;
    const startMoment = props.startMoment;
    const characterClass = props.characterClass;
    const refreshInterval = props.refreshInterval
        ? props.refreshInterval
        : PLAYER_VIEW_REFRESH_INTERVAL;

    const config = props.config;

    const query = useQuery();

    let [playerSummary, isPlayerSummaryLoading, playerSummaryLoadError] =
        useFetchPlayerSummary({
            refreshInterval,
            memberId,
            mode,
            startMoment,
            endMoment: Moment.NOW,
            characterClass,
            hash: query.get("fr"),
        });

    if (!playerSummary || playerSummaryLoadError) {
        return "";
    }

    return (
        <OverlayWeaponItem
            showIcon={config.showIcon}
            showPrecision={config.showPrecision}
            showKills={config.showKills}
            showKillsGame={config.showKillsGame}
            weaponId={config.id}
            weapons={playerSummary.summary.weapons}
        />
    );
};

export default OverlayWeaponView;
