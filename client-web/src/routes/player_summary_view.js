
import { useParams } from "react-router-dom";
import { ActivityListContainer } from "../components/activity_list"

const PlayerSummaryView = () => {
    let params = useParams();
    console.log(params);

    return (
        <main style={{ padding: "1rem 0" }}>
            <h2>Player</h2>
            <ActivityListContainer memberId={params.memberId} />
        </main>
    );

};

export default PlayerSummaryView;