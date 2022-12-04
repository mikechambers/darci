import React from "react";
import OverlayStatView from "./OverlayStatView";
import Stat from "../../../core/enums/Stat";
import {
    calculateEfficiency,
    calculateKillsDeathsRatio,
    calculateRatio,
} from "shared/packages/utils";

import { useFetchPlayerSummary } from "../../../hooks/remote";
import { useQuery } from "../../../hooks/browser";
import { PLAYER_VIEW_REFRESH_INTERVAL } from "../../../core/consts";
import Moment from "shared/packages/enums/Moment";
import {
    formatFloat,
    formatInt,
    formatPercentInt,
} from "../../../core/utils/string";

const rootStyle = {
    display: "flex",
    flexDirection: "column",
    gap: 4,
};

const OverlayStatsView = (props) => {
    const stats = props.stats;
    const memberId = props.memberId;
    const mode = props.mode;
    const startMoment = props.startMoment;
    const characterClass = props.characterClass;
    const refreshInterval = props.refreshInterval
        ? props.refreshInterval
        : PLAYER_VIEW_REFRESH_INTERVAL;

    const query = useQuery();

    let [playerSummary, isPlayerSummaryLoading, playerSummaryLoadError] =
        useFetchPlayerSummary({
            refreshInterval,
            memberId,
            mode,
            startMoment,
            endMoment: Moment.NOW,
            characterClass,
            hash: query.get("fr"),
        });

    if (!playerSummary || playerSummaryLoadError) {
        return "";
    }
    console.log(playerSummary);
    let arr = [];
    for (const s of stats) {
        let type = Stat.fromType(s);
        let label = type.label;
        let value;
        let formatter;

        switch (type) {
            case Stat.KD: {
                value = calculateKillsDeathsRatio(
                    playerSummary.summary.kills,
                    playerSummary.summary.deaths
                );
                formatter = formatInt;
                break;
            }
            case Stat.EFFICIENCY: {
                label = "Eff";
                value = calculateEfficiency(
                    playerSummary.summary.kills,
                    playerSummary.summary.deaths,
                    playerSummary.summary.assists
                );
                formatter = formatInt;
                break;
            }
            case Stat.KILLS: {
                label = playerSummary.summary.kills === 1 ? "Kills" : "Kills";
                value = playerSummary.summary.kills;
                formatter = formatInt;

                break;
            }
            case Stat.DEATHS: {
                label = playerSummary.summary.deaths === 1 ? "Death" : "Deaths";
                value = playerSummary.summary.deaths;
                formatter = formatInt;
                break;
            }
            case Stat.DEFEATS: {
                label =
                    playerSummary.summary.opponentsDefeated === 1
                        ? "Defeat"
                        : "Defeats";
                value = playerSummary.summary.opponentsDefeated;
                formatter = formatInt;
                break;
            }
            case Stat.ASSISTS: {
                label =
                    playerSummary.summary.assists === 1 ? "Assist" : "Assists";
                value = playerSummary.summary.assists;
                formatter = formatInt;
                break;
            }
            case Stat.ACTIVITY_COUNT: {
                label =
                    playerSummary.summary.activityCount === 1
                        ? "Game"
                        : "Games";
                label = "Games";
                value = playerSummary.summary.activityCount;
                formatter = formatInt;
                break;
            }
            case Stat.WINS: {
                label = playerSummary.summary.wins === 1 ? "Win" : "Wins";
                value = playerSummary.summary.wins;
                formatter = formatInt;
                break;
            }
            case Stat.LOSSES: {
                const losses =
                    playerSummary.summary.activityCount -
                    playerSummary.summary.wins;
                label = losses === 1 ? "Loss" : "Losses";
                value = losses;
                formatter = formatInt;
                break;
            }
            case Stat.WIN_PERCENT: {
                label = "Win %";
                value = calculateRatio(
                    playerSummary.summary.wins,
                    playerSummary.summary.activityCount
                );
                formatter = formatPercentInt;

                break;
            }
            case Stat.KILLS_GAME: {
                value = calculateRatio(
                    playerSummary.summary.kills,
                    playerSummary.summary.activityCount
                );
                formatter = formatInt;

                break;
            }
            case Stat.ASSISTS_GAME: {
                value = calculateRatio(
                    playerSummary.summary.assists,
                    playerSummary.summary.activityCount
                );
                formatter = formatInt;

                break;
            }
            case Stat.DEFEATS_GAME: {
                value = calculateRatio(
                    playerSummary.summary.opponentsDefeated,
                    playerSummary.summary.activityCount
                );
                formatter = formatInt;

                break;
            }
            case Stat.DEATHS_GAME: {
                value = calculateRatio(
                    playerSummary.summary.deaths,
                    playerSummary.summary.activityCount
                );
                formatter = formatInt;

                break;
            }

            case Stat.GRENADES: {
                label = "Gren";
                value = playerSummary.summary.grenadeKills;
                formatter = formatInt;

                break;
            }
            case Stat.GRENADES_GAME: {
                label = "Gren / g";
                value = calculateRatio(
                    playerSummary.summary.grenadeKills,
                    playerSummary.summary.activityCount
                );
                formatter = formatFloat;

                break;
            }

            case Stat.SUPERS: {
                value = playerSummary.summary.superKills;
                formatter = formatInt;

                break;
            }
            case Stat.SUPERS_GAME: {
                value = calculateRatio(
                    playerSummary.summary.superKills,
                    playerSummary.summary.activityCount
                );
                formatter = formatInt;

                break;
            }

            case Stat.MELEES: {
                value = playerSummary.summary.meleeKills;
                formatter = formatInt;

                break;
            }
            case Stat.MELEES_GAME: {
                value = calculateRatio(
                    playerSummary.summary.meleeKills,
                    playerSummary.summary.activityCount
                );
                formatter = formatInt;

                break;
            }

            default: {
                console.log("OverlayStatsView : Unknown Stat type:", s, type);
            }
        }
        arr.push({ label, value, formatter });
    }

    return (
        <div style={rootStyle}>
            <div className="overlay_title">{`${mode.label} (${startMoment.label})`}</div>

            <div className="overlay_list_row">
                {arr.map((item, index) => {
                    return (
                        <OverlayStatView
                            key={index}
                            label={item.label}
                            value={item.value}
                            formatter={item.formatter}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default OverlayStatsView;
