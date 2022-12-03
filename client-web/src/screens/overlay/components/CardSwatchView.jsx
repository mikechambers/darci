import React from "react";
import SwatchView from "../../../components/SwatchView";

export const CARD_WIN = "CARD_WIN";
export const CARD_EMPTY = "CARD_EMPTY";
export const CARD_NO_FLAWLESS = "CARD_NO_FLAWLESS";
export const CARD_FLAWLESS = "CARD_FLAWLESS";

const SIDE = 12;
const CardSwatchView = (props) => {
    const type = props.type;

    let div;
    switch (type) {
        case CARD_WIN: {
            div = (
                <SwatchView width={SIDE} height={SIDE} borderColor="yellow" />
            );
            break;
        }
        default: {
            div = <SwatchView width={SIDE} height={SIDE} borderColor="white" />;
        }
    }

    return div;
};

export default CardSwatchView;
