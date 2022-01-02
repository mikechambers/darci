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



    return (
        <table><tbody>
            {activities.map((activity, index) => {
                return (<tr key={index}>
                    <td>{activity.stats.kills}</td>
                </tr>);
            })}
        </tbody></table>
    );
}


export default ActivityList;
export {
    ActivityListContainer
};