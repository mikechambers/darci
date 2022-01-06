import { useParams } from "react-router-dom";

const ActivityDetailView = (props) => {

    const params = useParams();
    return (
        <main style={{ padding: "1rem 0" }}>
            <h2>Activity</h2>
            <div>Activity Id : {params.activityId} for {params.memberId}</div>
            <div><a href={`https://www.bungie.net/en/PGCR/${params.activityId}`}>Bungie PGCR</a></div>

        </main >
    );
}


export default ActivityDetailView;