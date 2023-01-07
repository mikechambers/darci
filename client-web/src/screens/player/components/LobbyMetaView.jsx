import React from "react";
import ClassMetaSummaryList from "./ClassMetaSummaryList";
import LobbyMetaPlayerSummaryView from "./LobbyMetaPlayerSummaryView";

const rootStyle = {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    gap: "var(--gap-list-item)",
};

const LobbyMeta = (props) => {
    const characterClassMeta = props.characterClassMeta;

    return (
        <div style={rootStyle}>
            <ClassMetaSummaryList characterClassMeta={characterClassMeta} />
            <LobbyMetaPlayerSummaryView
                characterClassMeta={characterClassMeta}
            />
        </div>
    );
};

export default LobbyMeta;
