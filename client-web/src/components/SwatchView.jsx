import React from "react";

const SwatchView = (props) => {
    const color = props.color;
    const height = props.height;
    const width = props.width;
    const radius = props.radius ? props.radius : 0;
    const borderColor = props.borderColor;

    const rootStyleBase = {
        height: height,
        width: width,
        borderRadius: radius,
    };

    let rootStyle = rootStyleBase;
    if (color) {
        rootStyle = {
            ...rootStyle,
            backgroundColor: color,
        };
    }

    if (borderColor) {
        rootStyle = {
            ...rootStyle,
            border: "1px solid",
            borderColor: borderColor,
        };
    }

    return <div style={rootStyle}></div>;
};

export default SwatchView;
