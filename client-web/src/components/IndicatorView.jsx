import React from "react";

const rootStyle = {
    width: 3,
    height: 14,
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
