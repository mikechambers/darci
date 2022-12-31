import React from "react";

const DetailListIndicatorView = (props) => {
    const description = !!props.description ? props.description : "";
    const color = !!props.color ? props.color : "#00000000";

    const rootStyle = {
        backgroundColor: color,
        height: "100%",
        borderRadius: "var(--radius-border) 0px 0px var(--radius-border)",
    };

    return <div style={rootStyle} title={description}></div>;
};

export default DetailListIndicatorView;
