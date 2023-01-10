import React from "react";
import NoActivityImage from "./images/pvp_no_activity.jpg";

const summaryStyleBase = {
    width: 700,
    height: 400,

    backgroundSize: "cover",

    borderRadius: 4,
    display: "flex",
    flexDirection: "column",
    //alignItems: "space-around",
};

const CurrentActivityView = (props) => {
    const currentActivity = props.currentActivity;

    const backgroundImage = currentActivity
        ? currentActivity.location.image
        : NoActivityImage;

    const summaryStyle = {
        ...summaryStyleBase,
        backgroundImage: `url(${backgroundImage})`,
    };

    return <div style={summaryStyle}></div>;
};

export default CurrentActivityView;
