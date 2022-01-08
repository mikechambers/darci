import { calculateEfficiency, calculateKillsDeathsRatio, calculateKillsDeathsAssists } from "../utils";
import { FLOAT_DECIMAL_PRECISION } from '../consts';
import { Link } from "react-router-dom";
import { CompletionReason } from 'shared';

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



                    return (<tr key={activity.activityId}>
                        <td>
                            <Link to={`/activity/${activity.activityId}/${activity.player.memberId}`}>{activity.mapName}</Link>

                        </td>
                        <td>{activity.stats.mode.toString()}</td>
                        <td>{activity.stats.standing.toString()}</td>
                        <td>{activity.stats.kills}</td>
                        <td>{activity.stats.assists}</td>
                        <td>{activity.stats.opponentsDefeated}</td>
                        <td>{activity.stats.deaths}</td>
                        <td>{activity.stats.killsDeathsRatio.toFixed(2)}</td>
                        <td>{activity.stats.killsDeathsAssists.toFixed(2)}</td>
                        <td>{activity.stats.efficiency.toFixed(2)}</td>
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
