import React from "react";

import { useState } from "react";
import ActivityPlayerListItemDrawer from "./ActivityPlayerListItemDrawer";

const rootStyle = {
    width: "min-content", //min-content
    display: "flex",
    flexDirection: "column",
};

const PlayerActivityDetailListItem = (props) => {
    const stats = props.stats;
    const player = props.player;
    const links = props.links;

    const [expanded, setExpanded] = useState(false);

    let drawer;
    if (expanded) {
        drawer = <ActivityPlayerListItemDrawer stats={stats} links={links} />;
    } else {
        drawer = <div></div>;
    }

    const handleOnClick = (e) => {
        setExpanded(!expanded);
    };

    return (
        <div style={rootStyle} id={player.getFullName()}>
            <div onClick={handleOnClick}>{props.children}</div>
            {drawer}
        </div>
    );
};

export default PlayerActivityDetailListItem;
