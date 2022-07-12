import React from "react";
import { CharacterClassSelection } from "shared";
import EnumSelectBase from "./EnumSelectBase";

const ClassSelect = (props) => {
    let classes = [
        CharacterClassSelection.ALL,
        CharacterClassSelection.HUNTER,
        CharacterClassSelection.TITAN,
        CharacterClassSelection.WARLOCK
    ];

    let selected = (props.selected)?props.selected:CharacterClassSelection.DAILY;
    let onChange = props.onChange;

    let handleOnChange = function(selected) {
        onChange(selected);
    }


    return (
        <EnumSelectBase onChange={handleOnChange} options={classes} selected={selected} label="classes" />
        );
};

export default ClassSelect;
