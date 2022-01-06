import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { useFetchPlayers } from '../data/fetch_hooks';

const PlayerList = (props) => {
    let players = useFetchPlayers();

    return (
        players.map((player, index) => {
            let to = `/player/${player.memberId}`;
            return (<div key={index}>
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