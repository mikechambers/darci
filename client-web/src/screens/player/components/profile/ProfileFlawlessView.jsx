import React from "react";
import {
    CARD_EMPTY,
    CARD_FILLED,
} from "../../../overlay/components/CardSwatchView";
import ProfileCardStatView from "./ProfileCardStatView";

const ProfileFlawlessView = (props) => {
    const flawless = props.flawless;

    let type;

    if (flawless === undefined || flawless === false) {
        type = CARD_EMPTY;
    } else {
        type = CARD_FILLED;
    }

    return <ProfileCardStatView type={type} label="flawless" />;
};

export default ProfileFlawlessView;
