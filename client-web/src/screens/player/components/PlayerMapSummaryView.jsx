/* MIT License
 *
 * Copyright (c) 2022 Mike Chambers
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import { humanDuration } from "../../../core/utils/date";
import StatView from "../../../components/StatView";
import { calculatePercent, calculateAverage } from "../../../core/utils";
import { calculateEfficiency, calculateKillsDeathsRatio } from "shared";
import SingleBarChart from "../../../components/SingleBarChart";

const headerStyle = {
    display: "flex",
    height: "50px",
    alignSelf: "flex-start",
};

const elementStyle = {
    width: "235px",
    height: "310px",
    borderRadius: "var(--radius-border)",
    backgroundPosition: "top 49px left 0px, top",
    backgroundSize: "cover, contain", //contain cover
    backgroundRepeat: "no-repeat, no-repeat",

    display: "flex",
    flexDirection: "column",
    alignItems: "center",
};

const datacontainerStyle = {
    height: "265px",
    width: "100%",

    backgroundColor: "#1C1C1Cee",
    backdropFilter: "var(--blur-background)",
    borderRadius: "0px 0px var(--radius-border) var(--radius-border)",

    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
};

const topContainerDataStyle = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    margin: "12px",
};

const bottomContainerDataStyle = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    margin: "12px",
};

const mapNameStyle = {
    display: "inline-block",
    alignSelf: "flex-end",
    padding: "0px 12px",
    textShadow: "1px 1px 1px black",
};

const statContainerStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
};

const PlayerMapSummaryView = (props) => {
    let map = props.map;
    let totalGames = props.totalGames;

    let h = {
        ...elementStyle,
        backgroundImage: `url(${map.map.image}), url(${map.map.image})`,
    };

    let timePlayed = humanDuration(map.summary.timePlayedSeconds * 1000, true);

    let data = [
        {
            label: "Mercy",
            value: calculatePercent(
                map.summary.completionReasonMercy,
                map.summary.activityCount
            ).toFixed(),
        },
        {
            label: "Objective Complete",
            value: calculatePercent(
                map.summary.completionReasonObjectiveCompleted,
                map.summary.activityCount
            ).toFixed(),
        },
        {
            label: "Timer Expired",
            value: calculatePercent(
                map.summary.completionReasonTimeExpired,
                map.summary.activityCount
            ).toFixed(),
        },
        {
            label: "No Opponents",
            value: calculatePercent(
                map.summary.completionReasonNoOpponents,
                map.summary.activityCount
            ).toFixed(),
        },
    ];

    return (
        <div style={h}>
            <div className="subsection_header" style={headerStyle}>
                <span style={mapNameStyle}>{map.map.name}</span>
            </div>

            <div style={datacontainerStyle}>
                <div style={topContainerDataStyle}>
                    <div style={statContainerStyle}>
                        <StatView
                            label="win"
                            title="Winning percentage"
                            value={`${calculatePercent(
                                map.summary.wins,
                                map.summary.activityCount
                            ).toFixed()}%`}
                        />
                        <StatView
                            label="games"
                            value={map.summary.activityCount}
                            title="Total number of games on this map"
                        />
                        <StatView
                            label="total"
                            title="Percent of all games on this map"
                            value={`${calculatePercent(
                                map.summary.activityCount,
                                totalGames
                            ).toFixed()}%`}
                        />
                    </div>
                    <div style={statContainerStyle}>
                        <StatView
                            label="kd"
                            title="Kill / Death Ratio"
                            value={calculateKillsDeathsRatio(
                                map.summary.kills,
                                map.summary.deaths
                            ).toFixed(2)}
                            align="center"
                        />
                        <StatView
                            label="kills"
                            title="Kills per game"
                            value={calculateAverage(
                                map.summary.kills,
                                map.summary.activityCount
                            ).toFixed(2)}
                            align="center"
                        />
                        <StatView
                            label="defeats"
                            title="Defeats per game"
                            value={calculateAverage(
                                map.summary.opponentsDefeated,
                                map.summary.activityCount
                            ).toFixed(2)}
                            align="center"
                        />
                    </div>
                    <div style={statContainerStyle}>
                        <StatView
                            title="Efficiency"
                            label="eff"
                            value={calculateEfficiency(
                                map.summary.kills,
                                map.summary.deaths,
                                map.summary.assists
                            ).toFixed(2)}
                            align="right"
                        />
                        <StatView
                            title="Assists per game"
                            label="assists"
                            value={calculateAverage(
                                map.summary.assists,
                                map.summary.activityCount
                            ).toFixed(2)}
                            align="right"
                        />
                        <StatView
                            label="deaths"
                            title="Deaths per game"
                            value={calculateAverage(
                                map.summary.deaths,
                                map.summary.activityCount
                            ).toFixed(2)}
                            align="right"
                        />
                    </div>
                </div>
                <SingleBarChart data={data} />
                <div style={bottomContainerDataStyle}>
                    <StatView
                        title="Percent of games completed"
                        label="completed"
                        value={`${calculatePercent(
                            map.summary.completed,
                            map.summary.activityCount
                        ).toFixed()}%`}
                    />
                    <StatView
                        label="time played"
                        title="Total time played on map"
                        value={timePlayed}
                        align="right"
                    />
                </div>
            </div>
        </div>
    );
};

export default PlayerMapSummaryView;
