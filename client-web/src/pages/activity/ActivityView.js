import { useParams } from "react-router-dom";

const ActivityView = (props) => {

    const params = useParams();
    const activityId = params.activityId;
    const memberId = params.memberId;


    return (
        <main style={{ padding: "1rem 0" }}>
            <h2>Activity</h2>
            <div>Activity Id : {activityId} for {memberId}</div>
            <div><a href={`https://destinytracker.com/destiny-2/pgcr/${activityId}`}>Destiny Tracker</a></div>
            <div><a href={`https://www.bungie.net/en/PGCR/${params.activityId}`}>Bungie PGCR</a></div>

        </main >
    );
}


export default ActivityView;