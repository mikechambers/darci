import React from "react";
import ActivityInfoView from "../../../components/ActivityInfoView";
import NoActivityImage from "./images/pvp_no_activity.jpg";

const summaryStyleBase = {
    width: 700,
    height: 400,

    backgroundSize: "cover",

    borderRadius: 4,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
};

const activityInfoStyle = {
    padding: "var(--padding-content)",
};

const CurrentActivityView = (props) => {
    const currentActivity = props.currentActivity;
    console.log(currentActivity);
    const modeInfo = currentActivity ? currentActivity.modeInfo : undefined;
    const mapName = currentActivity ? currentActivity.location.name : undefined;

    const backgroundImage = currentActivity
        ? currentActivity.location.image
        : NoActivityImage;

    const summaryStyle = {
        ...summaryStyleBase,
        backgroundImage: `url(${backgroundImage})`,
    };

    console.log(currentActivity);

    return (
        <div style={summaryStyle}>
            <div style={activityInfoStyle}>
                <ActivityInfoView modeInfo={modeInfo} mapName={mapName} />
            </div>
        </div>
    );
};

export default CurrentActivityView;
