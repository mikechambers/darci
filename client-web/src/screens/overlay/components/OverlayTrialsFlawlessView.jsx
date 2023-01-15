import React from "react";
import CardSwatchView, { CARD_EMPTY, CARD_FILLED } from "./CardSwatchView";

const rootStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
};

const OverlayTrialsFlawlessView = (props) => {
    const flawless = props.flawless;

    let type;

    if (flawless === undefined || flawless === false) {
        type = CARD_EMPTY;
    } else {
        type = CARD_FILLED;
    }

    return (
        <div className="overlay_list_item overlay_border" style={rootStyle}>
            <CardSwatchView type={type} />
            <div className="overlay_stat_label">Flawless</div>
        </div>
    );
};

export default OverlayTrialsFlawlessView;
