import { CharacterClassSelection, Mode, Moment } from "shared";
import React, { useEffect, useState } from 'react';
import EnumSelectBase from "./EnumSelectBase";
import { useFetchPlayers } from '../hooks/remote';

const PlayerViewConfig = (props) => {

    let classes = [
        CharacterClassSelection.ALL,
        CharacterClassSelection.HUNTER,
        CharacterClassSelection.TITAN,
        CharacterClassSelection.WARLOCK
    ];
    const [classSelection, setClassSelection] = useState((props.classSelection)?props.classSelection:CharacterClassSelection.ALL);

    let modes = [
        Mode.PVP_QUICKPLAY,
        Mode.PVP_COMPETITIVE,
        Mode.TRIALS_OF_OSIRIS,
        Mode.IRON_BANNER,
        Mode.PRIVATE_MATCHES_ALL,
        Mode.ALL_PVP
    ];
    const [mode, setMode] = useState((props.mode)?props.mode:Mode.PVP_QUICKPLAY);

    let moments = [
        Moment.DAILY,
        Moment.WEEKLY,
        Moment.WEEKEND,
        Moment.DAY,
        Moment.WEEK,
        Moment.MONTH,
        Moment.SEASON_OF_THE_HAUNTED
    ];
    const [moment, setMoment] = useState((props.moment)?props.moment:Moment.WEEK);
    
    let [players, isLoading, error] = useFetchPlayers();
    const [player, setPlayer] = useState();

    let selectedPlayer;
    for(const p of players) {
        p.label = p.getFullName();
        p.toString = () => p.label;
        if(props.player && props.player.memberId === p.memberId && props.player.platformId === p.platformId) {
            selectedPlayer = p;
            
        }
    }

    //call this after component is rendered, otherwise we get in infinite
    //render loop
    useEffect(()=>{
        let s = selectedPlayer;
        if(!s && players && players.length) {
            s = players[0];
        }

        setPlayer(s);
    },[players, props.player, selectedPlayer]);

    

    let classOnChange = function(e) {
        setClassSelection(e);
        console.log("Class change : ", e);
    };

    let modeOnChange = function(e) {
        setMode(e);
        console.log("Mode change : ", e);
    };

    let momentOnChange = function(e) {
        console.log("Moment change : ", e);
        setMoment(e);
    };

    let playerOnChange = function(e) {
        console.log("Player change : ", e);
        setPlayer(e);
    };

    let onClick = function(e) {

        let url = `/player/${player.memberId}/${player.platformId}/${classSelection.type}/${mode.type}/${moment.type}/`
        window.location.href = url;
    }

let style={
    display:"flex",
};
  
  return (
    <div style={style}>
        <EnumSelectBase onChange={playerOnChange} options={players} selected={player} label="players" />
        <EnumSelectBase onChange={classOnChange} options={classes} selected={classSelection} label="classes" />
        <EnumSelectBase onChange={modeOnChange} options={modes} selected={mode} label="modes" />
        <EnumSelectBase onChange={momentOnChange} options={moments} selected={moment} label="moments" />
        <button onClick={onClick}>Go</button>
    </div>
  );
};

export default PlayerViewConfig;