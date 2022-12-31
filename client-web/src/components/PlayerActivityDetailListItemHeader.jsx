import CompactMedalsList from "./CompactMedalsList";
import StatusView from "./StatusView";
import PlayerActivityDetailStatsView from "./PlayerActivityDetailStatsView";
import { SMALL } from "../core/consts";

import React from "react";

const rootStyle = {
    display: "grid",
    gridTemplateColumns: "6px 218px 370px 20px auto",
    alignItems: "center",
    columnGap: 6,
    //justifyContent: "center",
};

const statusViewStyle = {
    display: "flex",
    justifyContent: "center",
};

const PlayerActivityDetailListItemHeader = (props) => {
    const player = props.player;
    const onClick = props.onClick;
    const topStats = props.topStats;

    const goldMedals = player.stats.extended.medals.filter(
        (m) => m.info.isGold
    );

    return (
        <div
            className="list_item_header clickable"
            style={rootStyle}
            onClick={onClick}
        >
            {props.children}
            <PlayerActivityDetailStatsView
                stats={player.stats}
                topStats={topStats}
            />
            <div style={statusViewStyle}>
                <StatusView
                    completed={player.stats.completed}
                    joinedLate={player.stats.joinedLate}
                />
            </div>
            <CompactMedalsList medals={goldMedals} size={SMALL} />
        </div>
    );
};

export default PlayerActivityDetailListItemHeader;
