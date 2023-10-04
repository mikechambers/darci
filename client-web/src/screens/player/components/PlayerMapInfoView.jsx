import React from "react";

import RoundedImageView from "../../../components/RoundedImageView";
import useWindowDimensions from "../../../hooks/browser";

const elementStyle = {
    display: "flex",
    flexDirection: "row",
    columnGap: 4,
};

const detailsStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    rowGap: 4,
};

const PlayerMapInfoView = (props) => {
    const activity = props.activity;
    const { windowHeight, windowWidth } = useWindowDimensions();

    return (
        <div>
            <div style={elementStyle}>
                <RoundedImageView
                    className="meta_weapon_icon"
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
