
import { PlayerListContainer } from "./components/PlayerList"

const HomeView = (props) => {
    return (
        <main style={{ padding: "1rem 0" }}>
            <h2>MainView</h2>
            <PlayerListContainer />
        </main>
    );
};

export default HomeView;