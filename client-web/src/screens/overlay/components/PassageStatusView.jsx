import React from "react";
import SwatchView from "../../../components/SwatchView";
import CardSwatchView, {
    CARD_EMPTY,
    CARD_FLAWLESS,
    CARD_WIN,
} from "./CardSwatchView";
const listStyle = {
    display: "flex",
    flexDirection: "row",
    gap: 10,
};

const rootStyle = {
    display: "flex",
    flexDirection: "column",
    gap: 4,
    height: "100%",
    justifyContent: "space-between",
};

const PassageStatusView = (props) => {
    const card = props.card;

    return (
        <div style={rootStyle}>
            <div style={listStyle}>
                {[...Array(7)].map((item, index) => {
                    const t =
                        index < card.wins ? (
                            <CardSwatchView type={CARD_WIN} key={index} />
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
