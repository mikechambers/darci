import React from "react";

const rootStyleBase = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    textAlign: "left",
    borderLeft: "2px solid #FFFFFFA6",
    boxSizing: "border-box",
    height: 48,
    visibility: "visible",
    paddingLeft: 6,
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
        <div style={rootStyle}>
            <div className="overlay_stat_value">{formatter.format(value)}</div>
            <div className="overlay_stat_label">{label}</div>
        </div>
    );
};

export default OverlayStatView;
