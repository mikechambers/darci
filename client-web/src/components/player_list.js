import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { useFetchPlayers } from '../data/hooks';

const PlayerList = (props) => {
    let [players, isLoading, error] = useFetchPlayers();

    console.log("---------PlayerList---------");
    console.log("players", players);
    console.log("isLoading", isLoading);
    console.log("error", error);

    if (isLoading) {
        return <div>Loading players...</div>
    }

    return (
        players.map((player, index) => {
            let to = `/player/${player.memberId}/${player.platformId}/all/allpvp/week/`;
            return (<div key={player.memberId}>
                <Link to={to}>{player.bungieDisplayName}#{player.bungieDisplayNameCode}</Link>
            </div>);
        })
    );
};

const PlayerListContainer = (props) => {

    const [players, setPlayers] = useState(null);

    return (
        < PlayerList players={players} />
    );
}

export {
    PlayerList,
    PlayerListContainer,
};