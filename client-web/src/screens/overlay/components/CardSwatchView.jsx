import React from "react";
import SwatchView from "../../../components/SwatchView";

export const CARD_FILLED = "CARD_FILLED";
export const CARD_EMPTY = "CARD_EMPTY";

const SIDE = 12;
const CardSwatchView = (props) => {
    const type = props.type;

    let div;
    switch (type) {
        case CARD_FILLED: {
            div = (
                <SwatchView
                    width={SIDE}
                    height={SIDE}
                    color="yellow"
                    border="white"
                />
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
