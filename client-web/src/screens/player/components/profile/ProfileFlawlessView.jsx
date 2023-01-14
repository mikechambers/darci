import React from "react";
import CardSwatchView, {
    CARD_EMPTY,
    CARD_FLAWLESS,
    CARD_NO_FLAWLESS,
} from "../../../overlay/components/CardSwatchView";

const rootStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-end",
};

const ProfileFlawlessView = (props) => {
    const flawless = props.flawless;

    let type;

    if (flawless === undefined) {
        type = CARD_EMPTY;
    } else {
        type = flawless ? CARD_FLAWLESS : CARD_NO_FLAWLESS;
    }

    return (
        <div style={rootStyle}>
            <CardSwatchView type={type} />
            <div className="label">Flawless</div>
        </div>
    );
};

export default ProfileFlawlessView;
