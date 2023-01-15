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

const ProfileCardStatView = (props) => {
    const label = props.label;
    const type = props.type;

    return (
        <div style={rootStyle}>
            <CardSwatchView type={type} />
            <div className="label">{label}</div>
        </div>
    );
};

export default ProfileCardStatView;
