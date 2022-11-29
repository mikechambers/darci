import React from "react";

const rootStyleBase = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    textAlign: "right",
    borderRight: "2px solid #FFFFFFA6",
    paddingRight: 4,
    visibility: "visible",
};

const labelStyle = {
    textTransform: "uppercase",
    fontWeight: "var(--medium)",
    opacity: 0.7,
    visibility: "visible",
};

const valueStyle = {
    fontWeight: "var(--bold)",
    fontSize: "24px",
    visibility: "visible",
};

const OverlayStatView = (props) => {
    const label = props.label;
    const value = props.value;
    const formatter = props.formatter;
    const color = props.color ? props.color : "#FFFFFF";

    const rootStyle = {
        ...rootStyleBase,
        color: color,
    };

    console.log(label, value);
    return (
        <div style={rootStyle}>
            <div style={valueStyle}>{formatter.format(value)}</div>
            <div style={labelStyle}>{label}</div>
        </div>
    );
};

export default OverlayStatView;
