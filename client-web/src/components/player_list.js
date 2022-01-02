import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";


const PlayerList = (props) => {
    let players = (props.players) ? props.players : [];

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

    useEffect(() => {

        async function featchData() {
            let response;
            let data;
            try {
                response = await fetch('/api/players/');
                data = await response.json()
            } catch (e) {
                console.log(e);
                return;
            }

            setPlayers(data.players);
        };

        featchData();
    }, []);


    return (
        < PlayerList players={players} />
    );
}

export {
    PlayerList,
    PlayerListContainer,
};