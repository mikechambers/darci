import React from "react";
import { calculateKillsDeathsRatio, CharacterClass } from "shared";
import { calculateEfficiency } from "shared/packages/utils";
import ClassMetaSummaryView from "./ClassMetaSummaryView";

const rootStyle = {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
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
                if (item.characterClass === CharacterClass.UNKNOWN) {
                    return "";
                }

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
