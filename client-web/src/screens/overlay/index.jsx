import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { Moment } from "shared";
import CharacterClassSelection from "shared/packages/enums/CharacterClassSelection";
import Mode from "shared/packages/enums/Mode";
import LoadingAnimationView from "../../components/LoadingAnimationView";
import { GlobalContext } from "../../contexts/GlobalContext";
import { PLAYER_VIEW_REFRESH_INTERVAL } from "../../core/consts";
import Overlay from "../../core/enums/Overlay";
import { deserialize } from "../../core/utils/data";
import { useQuery } from "../../hooks/browser";
import { useFetchPlayerSummary } from "../../hooks/remote";

const OverlayView = (props) => {
    const params = useParams();
    const query = useQuery();

    let mode = Mode.fromType(params.mode);
    let startMoment = Moment.fromType(params.startMoment);
    let memberId = params.memberId;
    let platformId = params.platformId;
    let characterClass = CharacterClassSelection.fromType(params.classType);

    const { global, dispatchGlobal } = useContext(GlobalContext);
    const manifest = global.manifest;

    let [playerSummary, isPlayerSummaryLoading, playerSummaryLoadError] =
        useFetchPlayerSummary({
            refreshInterval: PLAYER_VIEW_REFRESH_INTERVAL,
            memberId: memberId,
            mode,
            startMoment,
            endMoment: Moment.NOW,
            characterClass,
            hash: query.get("fr"),
        });

    if (isPlayerSummaryLoading) {
        return <LoadingAnimationView message="Loading Player data." />;
    }

    let data = deserialize(params.data);

    console.log(data);

    let weapon;

    let overlayType = Overlay.fromType(data.overlayType);
    if (overlayType === Overlay.WEAPON && manifest) {
        weapon = manifest.getWeaponDefinition(data.weapon.id);
    }

    console.log(weapon);

    const rootStyle = {
        position: "absolute",
        top: 0,
        left: 0,
        height: "100%",
        width: "100%",
        backgroundColor: data.backgroundColor,
        padding: "var(--padding-page-container)",
    };
    return <div style={rootStyle}>foo</div>;
};

export default OverlayView;
