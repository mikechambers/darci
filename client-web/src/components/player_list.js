import React, { Component } from 'react';
import { Link } from "react-router-dom";

class PlayerList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        let players = (this.props.players) ? this.props.players : [];

        return (
            players.map((player, index) => {
                return (<div key="{index}">
                    <Link to="/player">{player.bungieDisplayName}#{player.bungieDisplayNameCode}</Link>
                </div>);
            })
        );
    };
}

class PlayerListContainer extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            players: null,
        };
    }

    async componentDidMount() {

        let response;
        let data;
        try {
            response = await fetch('/api/getplayers/');
            data = await response.json()
        } catch (e) {
            console.log(e);
            return;
        }

        console.log(data.players);
        this.setState({ players: data.players });
    }

    render() {
        return (
            < PlayerList players={this.state.players} />
        );
    }
}

export {
    PlayerList,
    PlayerListContainer,
};