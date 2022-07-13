import React from "react";
import { Moment } from "shared";
import EnumSelectBase from "./EnumSelectBase";

const MomentSelect = (props) => {

    let moments = [
        Moment.DAILY,
        Moment.WEEKLY,
        Moment.WEEKEND,
        Moment.DAY,
        Moment.WEEK,
        Moment.MONTH,
        Moment.SEASON_OF_THE_HAUNTED
    ];

    let selected = (props.selected)?props.selected:Moment.DAILY;

    let onChange = props.onChange;

    let handleOnChange = function(selected) {
        onChange(selected);
    }

    return (
        <EnumSelectBase onChange={handleOnChange} options={moments} selected={selected} label="classes" />
        );
};

export default MomentSelect;
