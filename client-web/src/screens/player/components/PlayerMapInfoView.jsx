import React from "react";

import RoundedImageView from "../../../components/RoundedImageView";

const elementStyle = {
    display: "flex",
    flexDirection: "row",
    columnGap: 4,
    alignItems: "space-apart",
};

const detailsStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    rowGap: 4,
};

const PlayerMapInfoView = (props) => {
    const activity = props.activity;

    return (
        <div>
            <div style={elementStyle}>
                <RoundedImageView
                    image={activity.activity.map.image}
                    width={50}
                    height={50}
                />
                <div style={detailsStyle}>
                    <div className="subsection_header">
                        {activity.activity.map.name}
                    </div>
                    <div className="list_subtitle">
                        {activity.activity.mode.label}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlayerMapInfoView;
