import React from "react";

import TeamPerformanceSummaryView from "./TeamPerformanceSummaryView";

const rootStyle = {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    gap: "var(--gap-list-item)",
};

const TeamPerformance = (props) => {
    const playerTeamPerformance = props.playerTeamPerformance;
    const opponentTeamPerformance = props.opponentTeamPerformance;

    let pElement = "";
    if (playerTeamPerformance) {
        pElement = (
            <TeamPerformanceSummaryView
                label="Your Team Players"
                teamPerformance={playerTeamPerformance}
            />
        );
    }

    let oElement = "";
    if (opponentTeamPerformance) {
        oElement = (
            <TeamPerformanceSummaryView
                teamPerformance={opponentTeamPerformance}
                label="Opponent Team Players"
            />
        );
    }

    return (
        <div style={rootStyle}>
            {pElement}
            {oElement}
        </div>
    );
};

export default TeamPerformance;

//<TeamPerformanceSummaryView teamPerformance={teamPerformance} />
