import CompactMedalsList from "./CompactMedalsList";
import StatusView from "./StatusView";
import PlayerActivityDetailStatsView from "./PlayerActivityDetailStatsView";
import { SMALL } from "../core/consts";

import React from "react";
import ListLinkIndicatorView from "./ListLinkIndicatorView";
import { CompletionReason } from "shared";

const rootStyle = {
    display: "grid",
    //gridTemplateColumns: "6px 218px 370px 20px auto 10px",

    gridTemplateColumns: "6px auto 370px auto auto 10px",
    //gridTemplateColumns: "repeat(auto-fill, minmax(40px, 1fr))",
    //display: "flex",
    //alignItems: "space-between",

    flexWrap: "wrap",

    alignItems: "center",
    columnGap: 6,
    justifyContent: "space-between",
    backgroundColor: "yellow",
};

const statusViewStyle = {
    display: "flex",
    justifyContent: "center",
};

const PlayerActivityDetailListItemHeader = (props) => {
    const stats = props.stats;
    const topStats = props.topStats;
    const onClick = props.onClick;
    const showMercy = props.showMercy === false ? false : true;

    const goldMedals = stats.extended.medals.filter((m) => m.info.isGold);

    const mercy =
        showMercy && stats.completionReason === CompletionReason.MERCY;

    return (
        <div className="list_item_header clickable" style={rootStyle}>
            {props.children}
            <PlayerActivityDetailStatsView stats={stats} topStats={topStats} />
            <div style={statusViewStyle}>
                <StatusView
                    completed={stats.completed}
                    joinedLate={stats.joinedLate}
                    mercy={mercy}
                />
            </div>
            <CompactMedalsList medals={goldMedals} size={SMALL} />

            <ListLinkIndicatorView onClick={onClick} />
        </div>
    );
};

export default PlayerActivityDetailListItemHeader;
