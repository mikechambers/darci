import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Moment } from "shared";
import CharacterClassSelection from "shared/packages/enums/CharacterClassSelection";
import Mode from "shared/packages/enums/Mode";

import Overlay from "../../core/enums/Overlay";
import { deserialize } from "../../core/utils/data";
import OverlayHistoryView from "./components/OverlayHistoryView";
import OverlayLoadoutView from "./components/OverlayLoadoutView";

import OverlayStatsView from "./components/OverlayStatsView";
import OverlayWeaponView from "./components/OverlayWeaponView";

const rootStyleBase = {
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
    width: "100%",
    padding: "var(--overlay-padding)",
    visibility: "visible",
    boxSizing: "border-box",
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

    switch (overlayType) {
        case Overlay.WEAPON: {
            div = (
                <OverlayWeaponView
                    mode={mode}
                    startMoment={startMoment}
                    memberId={memberId}
                    characterClass={characterClass}
                    config={data.weapon}
                />
            );
            break;
        }
        case Overlay.STATS: {
            div = (
                <OverlayStatsView
                    stats={data.stats}
                    mode={mode}
                    startMoment={startMoment}
                    memberId={memberId}
                    characterClass={characterClass}
                />
            );
            break;
        }
        case Overlay.HISTORY: {
            div = (
                <OverlayHistoryView
                    config={data.history}
                    mode={mode}
                    startMoment={startMoment}
                    memberId={memberId}
                    characterClass={characterClass}
                />
            );
            break;
        }
        case Overlay.LOADOUT: {
            div = (
                <OverlayLoadoutView
                    config={data.loadout}
                    mode={mode}
                    startMoment={startMoment}
                    memberId={memberId}
                    characterClass={characterClass}
                />
            );
            break;
        }
        default: {
            return <div>Unknown Overlay Type : {overlayType.label}</div>;
        }
    }

    return <div style={rootStyle}>{div}</div>;
};

export default OverlayView;
