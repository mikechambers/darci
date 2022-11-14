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

import React from "react";

import LeaderList from "../../../components/LeaderList";

const rootStyle = {
    display: "grid",
    gridTemplateColumns: "min-content min-content min-content",
    gap: 36,
    flexWrap: "wrap",
};

const ActivityLeadersView = (props) => {
    const players = props.players;

    players.sort(
        (a, b) =>
            b.player.stats.opponentsDefeated - a.player.stats.opponentsDefeated
    );

    let opponentsDefeatedLeaders = players.slice(0, 3);
    opponentsDefeatedLeaders = opponentsDefeatedLeaders.map((data) => {
        return {
            player: data.player.player,
            stat: data.player.stats.opponentsDefeated,
            teamName: data.teamName,
        };
    });

    players.sort((a, b) => b.player.stats.kills - a.player.stats.kills);

    let assistsLeaders = players.slice(0, 3);
    assistsLeaders = assistsLeaders.map((data) => {
        return {
            player: data.player.player,
            stat: data.player.stats.kills,
            teamName: data.teamName,
        };
    });

    players.sort((a, b) => b.player.stats.deaths - a.player.stats.deaths);

    let deathsLeaders = players.slice(0, 3);
    deathsLeaders = deathsLeaders.map((data) => {
        return {
            player: data.player.player,
            stat: data.player.stats.deaths,
            teamName: data.teamName,
        };
    });

    players.sort(
        (a, b) =>
            b.player.stats.killsDeathsRatio - a.player.stats.killsDeathsRatio
    );

    let killsDeathsLeaders = players.slice(0, 3);
    killsDeathsLeaders = killsDeathsLeaders.map((data) => {
        return {
            player: data.player.player,
            stat: data.player.stats.killsDeathsRatio.toFixed(2),
            teamName: data.teamName,
        };
    });

    players.sort(
        (a, b) => b.player.stats.efficiency - a.player.stats.efficiency
    );

    let efficiencyLeaders = players.slice(0, 3);
    efficiencyLeaders = efficiencyLeaders.map((data) => {
        return {
            player: data.player.player,
            stat: data.player.stats.efficiency.toFixed(2),
            teamName: data.teamName,
        };
    });

    players.sort(
        (a, b) =>
            b.player.stats.extended.totalMedals -
            a.player.stats.extended.totalMedals
    );

    let medalsLeaders = players.slice(0, 3);
    medalsLeaders = medalsLeaders.map((data) => {
        return {
            player: data.player.player,
            stat: data.player.stats.extended.totalMedals,
            teamName: data.teamName,
        };
    });

    players.sort(
        (a, b) =>
            b.player.stats.extended.abilityKills -
            a.player.stats.extended.abilityKills
    );

    return (
        <div style={rootStyle}>
            {" "}
            <LeaderList
                title="Opponents Defeated"
                leaderData={opponentsDefeatedLeaders}
                showTeams={true}
            />
            <LeaderList
                title="KD"
                leaderData={killsDeathsLeaders}
                showTeams={true}
            />
            <LeaderList
                title="Efficiency"
                leaderData={efficiencyLeaders}
                showTeams={true}
            />
            <LeaderList
                title="Assists"
                leaderData={assistsLeaders}
                showTeams={true}
            />
            <LeaderList
                title="Deaths"
                leaderData={deathsLeaders}
                showTeams={true}
            />
            <LeaderList
                title="Medals"
                leaderData={medalsLeaders}
                showTeams={true}
            />
        </div>
    );
};

export default ActivityLeadersView;
