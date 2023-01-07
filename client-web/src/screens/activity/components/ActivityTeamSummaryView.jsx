/* MIT License
 *
 * Copyright (c) 2023 Mike Chambers
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

import React from "react";

import { calculateEfficiency, calculateKillsDeathsRatio } from "shared";
import { ReactComponent as AlphaTeamIcon } from "../../../components/images/alpha_team_logo.svg";
import { ReactComponent as BravoTeamIcon } from "../../../components/images/bravo_team_logo.svg";
import StatCollectionView from "../../../components/StatCollectionView";
import StatView from "../../../components/StatView";
import { LARGE } from "../../../core/consts";

const teamBarStyle = {
    height: 10,
};

const elementStyle = {
    display: "flex",
    flexDirection: "column",
    rowGap: 12,
};

const statHighlightsStyle = {
    display: "flex",
    flexDirection: "row",
    width: "min-content",
    columnGap: 48,
    justifyContent: "center",
};

const statDetailsStyle = {
    display: "flex",
    flexDirection: "row",
    columnGap: 36,
};

const dividerStyle = {
    opacity: 0.5,
};

const ActivityTeamSummaryView = (props) => {
    const team = props.team;

    let playerCount = team.players.length;
    let kills = 0;
    let assists = 0;
    let deaths = 0;
    let opponentsDefeated = 0;
    let melees = 0;
    let grenades = 0;
    let superKills = 0;
    let weaponKills = 0;
    for (const p of team.players) {
        kills += p.stats.kills;
        assists += p.stats.assists;
        deaths += p.stats.deaths;
        opponentsDefeated += p.stats.opponentsDefeated;
        melees += p.stats.extended.meleeKills;
        grenades += p.stats.extended.grenadeKills;
        superKills += p.stats.extended.superKills;

        //
    }

    let kd = calculateKillsDeathsRatio(kills, deaths).toFixed(2);
    let eff = calculateEfficiency(kills, deaths, assists).toFixed(2);

    const killsData = [
        {
            value: (kills / playerCount).toFixed(2),
            label: "avg",
        },
        {
            value: kills,
            label: "total",
        },
    ];

    const assistsData = [
        {
            value: (assists / playerCount).toFixed(2),
            label: "avg",
        },
        {
            value: assists,
            label: "total",
        },
    ];

    const deathsData = [
        {
            value: (deaths / playerCount).toFixed(2),
            label: "avg",
        },
        {
            value: deaths,
            label: "total",
        },
    ];

    const opponentsDefeatedData = [
        {
            value: (opponentsDefeated / playerCount).toFixed(2),
            label: "avg",
        },
        {
            value: opponentsDefeated,
            label: "total",
        },
    ];

    const meleeData = [
        {
            value: (melees / playerCount).toFixed(2),
            label: "avg",
        },
        {
            value: melees,
            label: "total",
        },
    ];

    const grenadeData = [
        {
            value: (grenades / playerCount).toFixed(2),
            label: "avg",
        },
        {
            value: grenades,
            label: "total",
        },
    ];

    const superData = [
        {
            value: (superKills / playerCount).toFixed(2),
            label: "avg",
        },
        {
            value: superKills,
            label: "total",
        },
    ];

    let teamClassName;
    let teamLogo;

    if (team.name === "Alpha") {
        teamClassName = "alpha";
        teamLogo = <AlphaTeamIcon width="60" height="60" />;
    } else {
        teamClassName = "bravo";
        teamLogo = <BravoTeamIcon width="60" height="60" />;
    }

    return (
        <div style={elementStyle}>
            <div style={teamBarStyle} className={teamClassName}></div>
            <div style={statHighlightsStyle}>
                <div>{teamLogo}</div>
                <div>
                    <StatView
                        styleName={LARGE}
                        label="Score"
                        value={team.score}
                    />
                </div>
                <div>
                    <StatView styleName={LARGE} label="KD" value={kd} />
                </div>
                <div>
                    <StatView styleName={LARGE} label="EFF" value={eff} />
                </div>
            </div>
            <div>
                <hr style={dividerStyle} />
            </div>
            <div style={statDetailsStyle}>
                <StatCollectionView values={killsData} title="Kills" />
                <StatCollectionView values={assistsData} title="Assists" />
                <StatCollectionView
                    values={opponentsDefeatedData}
                    title="Defeats"
                />
                <StatCollectionView values={deathsData} title="Deaths" />
                <StatCollectionView values={meleeData} title="Melees" />
                <StatCollectionView values={grenadeData} title="Grenades" />
                <StatCollectionView values={superData} title="Supers" />
            </div>
        </div>
    );
};

export default ActivityTeamSummaryView;
