import { useState, useEffect } from 'react';

import { calculateEfficiency, calculateKillsDeathsRatio, calculateKillsDeathsAssists } from "../utils"
import { FLOAT_DECIMAL_PRECISION } from '../consts';


const ActivityListContainer = (props) => {

    let memberId = props.memberId;

    //memberid, mode, moment
    const [activities, setActivities] = useState(null);

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

            setActivities(data.activities);
        };

        featchData();
    }, []);

    return (
        <ActivityList activities={activities} />
    );
};

const ActivityList = (props) => {

    let activities = (props.activities) ? props.activities : [];

    console.log(activities);

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
                        <td>{activity.referenceId}</td>
                        <td>{activity.mode}</td>
                        <td>{activity.stats.standing}</td>
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
                        <td>{(activity.stats.completionReason === 4 ? "TRUE" : "")}</td>
                    </tr>);
                })}
            </tbody></table>
    );
}


export default ActivityList;
export {
    ActivityListContainer
};