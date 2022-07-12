
import { CharacterClassSelection, Mode, Moment } from "shared";
import ClassSelect from "./ClassSelect";
import ModeSelect from "./ModeSelect";
import MomentSelect from "./MomentSelect";
import React, { useState } from 'react';

const PlayerViewConfig = (props) => {

    //let mode = props.mode;
    //let moment = props.moment;
    //let classSelection = props.classSelection;
    let player = props.player;

    const [moment, setMoment] = useState(props.moment);
    const [mode, setMode] = useState(props.mode);
    const [classSelection, setClassSelection] = useState(props.classSelection);


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

    let onClick = function(e) {

        let url = `/player/${player.memberId}/${player.platformId}/${classSelection.type}/${mode.type}/${moment.type}/`
        window.location.href = url;
    }
  
  return (
    <div>
        <ClassSelect onChange={classOnChange} selected={classSelection}/>
        <ModeSelect onChange={modeOnChange} selected={mode} />
        <MomentSelect onChange={momentOnChange} selected={moment}/>
        <button onClick={onClick}>Go</button>
    </div>
  );
};

export default PlayerViewConfig;
