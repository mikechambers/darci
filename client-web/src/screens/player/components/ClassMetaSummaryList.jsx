import React from "react";
import ClassMetaSummaryView from "./ClassMetaSummaryView";

const rootStyle = {
    display: "flex",
    flexDirection: "row",
    gap: "var(--gap-list-item)",
};

const ClassMetaSummaryList = (props) => {
    const characterClassMeta = props.characterClassMeta;

    const playerCount = characterClassMeta.reduce((prev, cur) => {
        return prev + cur.count;
    }, 0);

    return (
        <div style={rootStyle}>
            {characterClassMeta.map((item) => {
                //filter unknown

                return (
                    <ClassMetaSummaryView
                        key={item.characterClass.label}
                        playerCount={playerCount}
                        data={item}
                    />
                );
            })}
        </div>
    );
};

export default ClassMetaSummaryList;
