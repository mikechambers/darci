import React from "react";
import { calculateRatio } from "shared/packages/utils";
import RoundedImageView from "../../../components/RoundedImageView";
import StatView from "../../../components/StatView";
import { RIGHT } from "../../../core/consts";
import { formatPercentInt } from "../../../core/utils/string";

const rootStyle = {
    display: "flex",
    flexDirection: "column",
};

const dataContainerStyle = {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    marginLeft: "12px",
};

const containerStyle = {
    display: "flex",
    backgroundColor: "var(--color-list-item-background)",
    borderRadius: "var(--radius-border)",
    padding: "12px",
    //gap: "var(--gap-list-item)",
    width: 200,
};

const valuesStyle = {
    display: "flex",
    justifyContent: "space-between",
};

const ClassMetaSummaryView = (props) => {
    const data = props.data;

    const playerCount = props.playerCount;

    const percent = formatPercentInt(calculateRatio(data.count, playerCount));
    const winPercent = formatPercentInt(calculateRatio(data.wins, data.count));

    return (
        <div style={containerStyle}>
            <RoundedImageView
                height={64}
                width={64}
                image={data.icon}
                backgroundColor="var(--color-list-item-detail-background)"
            />
            <div style={dataContainerStyle}>
                <div className="subsection_header">
                    {data.characterClass.label}
                </div>

                <div style={valuesStyle}>
                    <StatView value={percent} label="usage" key="usage" />
                    <StatView
                        value={winPercent}
                        label="Wins"
                        key="wins"
                        align={RIGHT}
                    />
                </div>
            </div>
        </div>
    );
};

export default ClassMetaSummaryView;
