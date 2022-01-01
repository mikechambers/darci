import React, { Component } from 'react';
import { PlayerListContainer } from "../components/player_list"

class HomeView extends React.Component {

    render() {
        return (
            <main style={{ padding: "1rem 0" }}>
                <h2>MainView</h2>
                <PlayerListContainer />
            </main>
        );
    };
}

export default HomeView;