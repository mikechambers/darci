import React from "react";
import ActivityInfoView from "../../../../components/ActivityInfoView";
import NoActivityImage from "./images/pvp_no_activity.jpg";

const summaryStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    height: "100%",
    width: "100%",
};

const opacityLayerStyle = {
    width: "100%",
    height: "100%",
    backgroundColor: "#00000044",
};

const backgroundStyleBase = {
    height: "100%",
    width: "100%",
    backgroundSize: "cover",
    backgroundPosition: "center",
    borderRadius: 4,
};

const CurrentActivityView = (props) => {
    const currentActivity = props.currentActivity;
    const modeInfo = currentActivity ? currentActivity.modeInfo : undefined;
    const mapName = currentActivity ? currentActivity.location.name : undefined;

    const backgroundImage = currentActivity
        ? currentActivity.location.image
        : NoActivityImage;

    const backgroundStyle = {
        ...backgroundStyleBase,
        backgroundImage: `url(${backgroundImage})`,
    };

    return (
        <div style={backgroundStyle}>
            <div style={opacityLayerStyle}>
                <div style={summaryStyle}>
                    <ActivityInfoView modeInfo={modeInfo} mapName={mapName} />
                </div>
            </div>
        </div>
    );
};

export default CurrentActivityView;
