import React from "react";

const SwatchView = (props) => {
    const color = props.color;
    const height = props.height;
    const width = props.width;
    const radius = props.radius ? props.radius : 0;

    const rootStyle = {
        backgroundColor: color,
        height: height,
        width: width,
        borderRadius: radius,
    };

    return <div style={rootStyle}></div>;
};

export default SwatchView;
