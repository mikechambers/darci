import React from "react";
import {
    calculateEfficiency,
    calculateKillsDeathsRatio,
    calculateRatio,
} from "shared";
import StatView from "../../../components/StatView";
import { RIGHT } from "../../../core/consts";
import {
    formatFloat,
    formatPercent,
    formatPercentInt,
} from "../../../core/utils/string";

const rootStyle = {
    display: "flex",
    flexDirection: "row",

    backgroundColor: "var(--color-list-item-background)",
    borderRadius: "var(--radius-border)",
    padding: "12px",

    columnGap: "var(--gap-stat-item)",
    justifyContent: "space-between",
};

const LobbyMetaPlayerSummaryView = (props) => {
    const characterClassMeta = props.characterClassMeta;

    let count = 0;
    let kills = 0;
    let assists = 0;
    let deaths = 0;
    let defeats = 0;
    let grenadeKills = 0;
    let superKills = 0;
    let meleeKills = 0;
    let kd = 0.0;
    let eff = 0.0;

    for (const t of characterClassMeta) {
        count += t.count;
        kills += t.kills;
        assists += t.assists;
        deaths += t.deaths;
        defeats += t.opponentsDefeated;

        grenadeKills += t.grenadeKills;
        superKills += t.superKills;
        meleeKills += t.meleeKills;
    }

    kd = calculateKillsDeathsRatio(kills, deaths);
    eff = calculateEfficiency(kills, deaths, assists);

    return (
        <div style={rootStyle}>
            <StatView label="Players" value={count} />
            <StatView label="KD" value={formatFloat(kd)} align={RIGHT} />
            <StatView label="KD" value={formatFloat(eff)} align={RIGHT} />

            <StatView
                label="Kills / p"
                value={formatFloat(calculateRatio(kills, count))}
                align={RIGHT}
            />

            <StatView
                label="Assists / p"
                value={formatFloat(calculateRatio(assists, count))}
                align={RIGHT}
            />

            <StatView
                label="Defeats / p"
                value={formatFloat(calculateRatio(defeats, count))}
                align={RIGHT}
            />

            <StatView
                label="Deaths / p"
                value={formatFloat(calculateRatio(deaths, count))}
                align={RIGHT}
            />

            <StatView
                label="Melee"
                value={formatPercentInt(calculateRatio(meleeKills, kills))}
                align={RIGHT}
            />

            <StatView
                label="Grenade"
                value={formatPercentInt(calculateRatio(grenadeKills, kills))}
                align={RIGHT}
            />

            <StatView
                label="Super"
                value={formatPercentInt(calculateRatio(superKills, kills))}
                align={RIGHT}
            />
        </div>
    );
};

export default LobbyMetaPlayerSummaryView;
