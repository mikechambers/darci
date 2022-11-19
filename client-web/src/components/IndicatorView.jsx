import React from "react";

const rootStyle = {
    width: "3px",
    height: "14px",
    flexShrink: "0",
};

const IndicatorView = (props) => {
    const color = props.color;
    const title = props.title ? props.title : "";

    const s = {
        ...rootStyle,
        backgroundColor: color,
    };

    return <div style={s} title={title}></div>;
};

export default IndicatorView;
