import React from "react";

const rootStyleBase = {
    display: "flex",
    flexDirection: "column",
};

const OverlayStatView = (props) => {
    const label = props.label;
    const value = props.value;
    const formatter = props.formatter;
    const color = props.color ? props.color : "#FFFFFF";

    const rootStyle = {
        ...rootStyleBase,
        color: color,
        justifyContent: "space-between",
    };

    return (
        <div style={rootStyle} className="overlay_border overlay_list_item">
            <div className="overlay_stat_value">{formatter.format(value)}</div>
            <div className="overlay_stat_label">{label}</div>
        </div>
    );
};

export default OverlayStatView;
