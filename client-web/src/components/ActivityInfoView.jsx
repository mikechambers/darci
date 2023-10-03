import React from "react";

const modeMapContainerStyle = {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    flexWrap: "wrap",
};

const modeIconStyleBase = {
    width: 70,
    height: 70,
    backgroundSize: "cover",
};

const dividerStyle = {
    margin: 0,
};

const noActivityStyle = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    font: "var(--regular) 26px 'Roboto'",
};

const ActivityInfoView = (props) => {
    const mapName = props.mapName;
    const modeInfo = props.modeInfo;
    const playlist = props.playlist;

    if (!modeInfo) {
        return <div style={noActivityStyle}>Not Currently in a Match</div>;
    }

    const icon = modeInfo.icon;
    const modeName = playlist
        ? `${playlist} : ${modeInfo.name}`
        : modeInfo.name;

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
