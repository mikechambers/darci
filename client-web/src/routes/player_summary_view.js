
import { useParams } from "react-router-dom";
import { PlayerSummaryLoader } from "../components/activity_list"

const PlayerSummaryView = () => {
    let params = useParams();

    return (
        <main style={{ padding: "1rem 0" }}>
            <h2>Player</h2>
            <PlayerSummaryLoader memberId={params.memberId} />
        </main>
    );

};

export default PlayerSummaryView;