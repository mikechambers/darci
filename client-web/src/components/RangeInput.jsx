import React from "react";
import { getRandomInt } from "../core/utils/math";

const rootStyle = {
    display: "flex",
    flexDirection: "row",
    gap: 6,
    alignItems: "center",
};

const RangeInput = (props) => {
    const min = props.min;
    const max = props.max;
    const step = props.step;
    const value = props.value;
    const onChange = props.onChange;
    const label = props.label;
    const disabled =
        props.disabled !== undefined && props.disabled ? true : false;

    const id = `id_${getRandomInt(0, 1000000)}`;

    const labelDiv = label ? <label htmlFor={id}>{label}: </label> : "";
    return (
        <div style={rootStyle}>
            {labelDiv}
            <input
                id={id}
                type="range"
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                disabled={disabled}
            />
            {value}
        </div>
    );
};

export default RangeInput;
