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

const dataContainerStyle = {
    display: "flex",

    flexDirection: "column",
    backgroundColor: "var(--color-list-item-background)",
    borderRadius: "var(--radius-border)",

    columnGap: "var(--gap-stat-item)",
    justifyContent: "space-between",
    marginLeft: "12px",
    height: "64px",
    width: "100%",
};

const dataContainerStyle2 = {
    width: "100%",
    display: "flex",

    justifyContent: "space-between",
    marginLeft: "12px",
};

const containerStyle = {
    display: "flex",
    backgroundColor: "var(--color-list-item-background)",
    borderRadius: "var(--radius-border)",
    padding: "12px",
    //gap: "var(--gap-list-item)",
};

const valuesStyle = {
    display: "flex",
    justifyContent: "space-between",
};

const TeamPerformanceSummaryView = (props) => {
    const teamPerformance = props.teamPerformance;
    const label = props.label ?? "";

    /*
  '1': {
    teamType: 1,
    totalPlayers: 1202,
    completed: 1012,
    wins: 549,
    kills: 11132,
    deaths: 11295,
    assists: 5398,
    grenadeKills: 258,
    superKills: 742,
    meleeKills: 1082
  }
*/

    let count = teamPerformance.totalPlayers;
    let kills = teamPerformance.kills;
    let assists = teamPerformance.assists;
    let deaths = teamPerformance.deaths;
    let defeats = kills + assists;
    let grenadeKills = teamPerformance.grenadeKills;
    let superKills = teamPerformance.superKills;
    let meleeKills = teamPerformance.meleeKills;
    let kd = 0.0;
    let eff = 0.0;

    kd = calculateKillsDeathsRatio(kills, deaths);
    eff = calculateEfficiency(kills, deaths, assists);

    return (
        <div style={containerStyle}>
            <div style={dataContainerStyle}>
                <div className="subsection_header">{label}</div>

                <div style={valuesStyle}>
                    <StatView label="Players" value={count} />
                    <StatView
                        label="KD"
                        value={formatFloat(kd)}
                        align={RIGHT}
                    />
                    <StatView
                        label="EFF"
                        value={formatFloat(eff)}
                        align={RIGHT}
                    />

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
                        value={formatPercentInt(
                            calculateRatio(meleeKills, kills)
                        )}
                        align={RIGHT}
                    />

                    <StatView
                        label="Grenade"
                        value={formatPercentInt(
                            calculateRatio(grenadeKills, kills)
                        )}
                        align={RIGHT}
                    />

                    <StatView
                        label="Super"
                        value={formatPercentInt(
                            calculateRatio(superKills, kills)
                        )}
                        align={RIGHT}
                    />
                </div>
            </div>
        </div>
    );
};

export default TeamPerformanceSummaryView;
