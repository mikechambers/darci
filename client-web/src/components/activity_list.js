import { useState, useEffect, useContext } from 'react';

import { calculateEfficiency, calculateKillsDeathsRatio, calculateKillsDeathsAssists } from "../utils"
import { FLOAT_DECIMAL_PRECISION } from '../consts';
import { ManifestContext } from '../app';

import { Mode } from 'shared';

const ActivityListContainer = (props) => {

    let memberId = props.memberId;

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
    const manifest = useContext(ManifestContext);


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

                    let mode = Mode.fromId(activity.mode);

                    let mapName = manifest.getActivityDefinition(activity.referenceId).name;

                    //console.log(activity.referenceId);
                    //console.log(manifest.getActivityDefinition(activity.referenceId));

                    return (<tr key={index}>
                        <td>{mapName}</td>
                        <td>{mode.toString()}</td>
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