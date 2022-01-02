import { useState, useEffect } from 'react';

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
                    <th>ABILITY</th>
                    <th>MERCY</th>
                </tr>
            </thead>
            <tbody>
                {activities.map((activity, index) => {
                    return (<tr key={index}>
                        <td>{activity.referenceId}</td>
                        <td>{activity.mode}</td>
                        <td>{activity.stats.standing}</td>
                        <td>{activity.stats.kills}</td>
                        <td>{activity.stats.assists}</td>
                        <td>{activity.stats.opponentsDefeated}</td>
                        <td>{activity.stats.deaths}</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>{activity.stats.extended.superKills}</td>
                        <td>{activity.stats.extended.grenadeKills}</td>
                        <td>{activity.stats.extended.meleeKills}</td>
                        <td>{activity.stats.extended.abilityKills}</td>
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