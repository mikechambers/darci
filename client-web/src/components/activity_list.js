import { useState, useEffect, useContext } from 'react';

import { calculateEfficiency, calculateKillsDeathsRatio, calculateKillsDeathsAssists } from "../utils";
import { FLOAT_DECIMAL_PRECISION } from '../consts';
import { ManifestContext } from '../app';
import ActivityStats from '../data/activity_stats';
import Action, { PLAYER_ACTIVITIES_LOADED } from '../app_state/action';

import { CompletionReason, Mode } from 'shared';

import { AppContext } from "../app"

const PlayerSummaryLoader = (props) => {

    let memberId = props.memberId;

    const { state, dispatch } = useContext(AppContext);
    const manifest = state.manifest;
    const activityStats = state.playerActivityStats;

    useEffect(() => {
        async function featchData() {

            if (!memberId) {
                return;
            }

            let response;
            let data;
            try {
                response = await fetch(`/api/player/${memberId}/all/all_pvp/weekly/`);
                data = await response.json()
            } catch (e) {
                console.log(e);
                return;
            }

            console.log(data);

            const activityStats = new ActivityStats(data.activities, manifest);

            dispatch(new Action(PLAYER_ACTIVITIES_LOADED, activityStats));
        };

        featchData();

    }, []);

    return (
        <ActivityList activityStats={activityStats} />
    );
};

const ActivityList = (props) => {

    let activityStats = props.activityStats;
    let activities = (activityStats) ? activityStats.activities : [];

    return (
        <table>
            <thead>
                <tr>
                    <th>MAP</th>
                    <th>MODE</th>
                    <th>W/L</th>
                    <th>KILLS</th>
                    <th>ASSISTS</th>
                    <th>K+A</th>
                    <th>DEATHS</th>
                    <th>KD</th>
                    <th>KD/A</th>
                    <th>EFF</th>
                    <th>SUPERS</th>
                    <th>GRENADES</th>
                    <th>MELEES</th>
                    <th>MERCY</th>
                </tr>
            </thead>
            <tbody>
                {activities.map((activity, index) => {

                    let kills = activity.stats.kills;
                    let deaths = activity.stats.deaths;
                    let assists = activity.stats.assists;

                    let kd = calculateKillsDeathsRatio(kills, deaths).toFixed(FLOAT_DECIMAL_PRECISION);
                    let kda = calculateKillsDeathsAssists(kills, deaths, assists).toFixed(FLOAT_DECIMAL_PRECISION);
                    let eff = calculateEfficiency(kills, deaths, assists).toFixed(FLOAT_DECIMAL_PRECISION);

                    return (<tr key={index}>
                        <td>{activity.mapName}</td>
                        <td>{activity.stats.mode.toString()}</td>
                        <td>{activity.stats.standing.toString()}</td>
                        <td>{kills}</td>
                        <td>{assists}</td>
                        <td>{activity.stats.opponentsDefeated}</td>
                        <td>{deaths}</td>
                        <td>{kd}</td>
                        <td>{kda}</td>
                        <td>{eff}</td>
                        <td>{activity.stats.extended.superKills}</td>
                        <td>{activity.stats.extended.grenadeKills}</td>
                        <td>{activity.stats.extended.meleeKills}</td>
                        <td>{(activity.stats.completionReason === CompletionReason.MERCY ? "TRUE" : "")}</td>
                    </tr>);
                })}
            </tbody></table>
    );
}


export default ActivityList;
export {
    PlayerSummaryLoader
};