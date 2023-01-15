import React from "react";

import CardSwatchView, {
    CARD_EMPTY,
    CARD_FILLED,
} from "../../../overlay/components/CardSwatchView";

const listStyle = {
    display: "flex",
    flexDirection: "row",
    gap: 6,
};

const rootStyle = {
    display: "flex",
    flexDirection: "column",
    gap: 4,
    justifyContent: "space-between",
};

const ProfilePassageStatusView = (props) => {
    const card = props.card;

    return (
        <div style={rootStyle}>
            <div style={listStyle}>
                {[...Array(7)].map((item, index) => {
                    const t =
                        index < card.wins ? (
                            <CardSwatchView type={CARD_FILLED} key={index} />
                        ) : (
                            <CardSwatchView type={CARD_EMPTY} key={index} />
                        );

                    return t;
                })}
            </div>
            <div className="label">Current Card</div>
        </div>
    );
};

export default ProfilePassageStatusView;
