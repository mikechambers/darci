import React from "react";

const modeMapContainerStyle = {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
};

const modeIconStyleBase = {
    width: 70,
    height: 70,
    backgroundSize: "cover",
};

const dividerStyle = {
    margin: 0,
};

const ActivityInfoView = (props) => {
    const mapName = props.mapName;
    const modeInfo = props.modeInfo;

    const icon = !!modeInfo ? modeInfo.icon : undefined;
    const modeName = !!modeInfo ? modeInfo.name : "Not in a PVP Match";

    let modeIconStyle = {
        ...modeIconStyleBase,
        backgroundImage: `url(${icon})`,
    };

    return (
        <div style={modeMapContainerStyle}>
            <div style={modeIconStyle}></div>
            <div className="activity_mode_name">
                <div className="activity_map_name">{mapName}</div>
                <div>
                    <hr style={dividerStyle} />
                </div>
                <div className="activity_mode_name">{modeName}</div>
            </div>
        </div>
    );
};

export default ActivityInfoView;
