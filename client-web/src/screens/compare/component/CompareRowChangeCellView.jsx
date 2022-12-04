import React from "react";
import IndicatorView from "../../../components/IndicatorView";
import {
    formatPercentChangeInt,
    PERCENT_CHANGE_INT_FORMATTER,
} from "../../../core/utils/string";

const changeCellStyle = {
    display: "flex",
    gap: "4px",
    justifyContent: "flex-end",
    marginRight: "10px",
};

const CompareRowChangeCellView = (props) => {
    const change = props.change;

    let cElement;

    let v = "";
    let color = "--color-neutral";

    if (change !== undefined) {
        if (change > 0) {
            color = "--color-positive";
        } else if (change < 0) {
            color = "--color-negative";
        } else {
            color = "--color-neutral";
        }

        v = formatPercentChangeInt(change);

        cElement = (
            <div style={changeCellStyle}>
                {v}
                <IndicatorView color={`var(${color})`} />
            </div>
        );
    } else {
        cElement = <div></div>;
    }

    return cElement;
};

export default CompareRowChangeCellView;
