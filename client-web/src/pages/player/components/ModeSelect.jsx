import React from "react";
import { Mode } from "shared";
import EnumSelectBase from "./EnumSelectBase";

const ModeSelect = (props) => {
    let modes = [
        Mode.PVP_QUICKPLAY,
        Mode.PVP_COMPETITIVE,
        Mode.TRIALS_OF_OSIRIS
    ];

    let selected = (props.selected)?props.selected:Mode.PVP_QUICKPLAY;
    let onChange = props.onChange;

    let handleOnChange = function(selected) {
        onChange(selected);
    }

  return (
    <EnumSelectBase onChange={handleOnChange} options={modes} selected={selected} label="modes" />
    );
};

export default ModeSelect;
