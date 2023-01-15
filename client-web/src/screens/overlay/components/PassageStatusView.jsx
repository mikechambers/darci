import React from "react";
import CardSwatchView, { CARD_EMPTY, CARD_FILLED } from "./CardSwatchView";

const listStyle = {
    display: "flex",
    flexDirection: "row",
    gap: 10,
};

const rootStyle = {
    display: "flex",
    flexDirection: "column",
    gap: 4,
    justifyContent: "space-between",
};

const PassageStatusView = (props) => {
    const card = props.card;

    return (
        <div
            style={rootStyle}
            className="overlay_list_large_item overlay_list_item"
        >
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
            <div className="overlay_stat_label">Current Card</div>
        </div>
    );
};

export default PassageStatusView;
