import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { useFetchPlayers } from '../../../hooks/remote';

const PlayerList = (props) => {
    let [players, isLoading, error] = useFetchPlayers();

    if (isLoading) {
        return <div>Loading players...</div>
    }

    return (
        players.map((player, index) => {
            let to = `/player/${player.memberId}/${player.platformId}/all/allpvp/week/`;
            return (<div key={player.memberId}>
                <Link to={to}>{player.getShortName()}</Link>
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