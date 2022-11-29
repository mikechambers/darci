import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Moment } from "shared";
import CharacterClassSelection from "shared/packages/enums/CharacterClassSelection";
import Mode from "shared/packages/enums/Mode";

import Overlay from "../../core/enums/Overlay";
import { deserialize } from "../../core/utils/data";

import OverlayStatsView from "./components/OverlayStatsView";

const rootStyleBase = {
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
    width: "100%",

    padding: 24,
    visibility: "visible",
};

const OverlayView = (props) => {
    const params = useParams();

    let mode = Mode.fromType(params.mode);
    let startMoment = Moment.fromType(params.startMoment);
    let memberId = params.memberId;
    //let platformId = params.platformId;
    let characterClass = CharacterClassSelection.fromType(params.classType);

    useEffect(() => {
        let e = document.querySelector("*");
        e.style.visibility = "hidden";

        return () => {
            e.style.visibility = "visible";
        };
    }, []);

    /*
    if (isPlayerSummaryLoading) {
        return <LoadingAnimationView message="Loading Player data." />;
    }
    */

    let data = deserialize(params.data);

    const rootStyle = {
        ...rootStyleBase,
        backgroundColor: data.backgroundColor,
    };

    let div = "";
    let overlayType = Overlay.fromType(data.overlayType);
    if (overlayType === Overlay.WEAPON) {
        //weapon = manifest.getWeaponDefinition(data.weapon.id);
    } else if (overlayType === Overlay.STATS) {
        div = (
            <OverlayStatsView
                stats={data.stats}
                mode={mode}
                startMoment={startMoment}
                memberId={memberId}
                characterClass={characterClass}
            />
        );
    }

    return <div style={rootStyle}>{div}</div>;
};

export default OverlayView;
