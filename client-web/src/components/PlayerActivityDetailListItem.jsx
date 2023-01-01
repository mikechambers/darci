import React from "react";

import { useState } from "react";
import ActivityPlayerListItemDrawer from "../screens/activity/components/ActivityPlayerListItemDrawer";

const rootStyle = {
    width: "min-content", //min-content
    display: "flex",
    flexDirection: "column",
};

const PlayerActivityDetailListItem = (props) => {
    const player = props.player;

    const [expanded, setExpanded] = useState(false);

    let drawer;
    if (expanded) {
        drawer = <ActivityPlayerListItemDrawer player={player} />;
    } else {
        drawer = <div></div>;
    }

    const handleOnClick = (e) => {
        setExpanded(!expanded);
    };
    console.log(player);
    return (
        <div style={rootStyle} id={player.player.getFullName()}>
            <div onClick={handleOnClick}>{props.children}</div>
            {drawer}
        </div>
    );
};

export default PlayerActivityDetailListItem;
