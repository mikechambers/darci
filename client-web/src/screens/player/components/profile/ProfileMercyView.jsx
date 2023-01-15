import React from "react";
import {
    CARD_EMPTY,
    CARD_FILLED,
} from "../../../overlay/components/CardSwatchView";
import ProfileCardStatView from "./ProfileCardStatView";

const ProfileMercyView = (props) => {
    const card = props.card;

    let type = card.isFlawless && !card.losses ? CARD_FILLED : CARD_EMPTY;

    return <ProfileCardStatView type={type} label="mercy" />;
};

export default ProfileMercyView;
