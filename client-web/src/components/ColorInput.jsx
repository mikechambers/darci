import React, { useEffect, useState } from "react";
import { getRandomInt } from "../core/utils/math";

const rootStyle = {
    display: "flex",
    gap: "4px",
    alignItems: "flex-end",
};
const colorStyle = {
    display: "none",
};

const colorSpanStyleBase = {
    borderRadius: "4px",
    width: "25px",
    height: "25px",
    backgroundColor: "red",
    display: "inline-block",
};

const ColorInput = (props) => {
    const label = props.label;
    const onChange = props.onChange;
    const color = props.color;

    const id = `id_${getRandomInt(0, 1000000)}`;

    const [currentColor, setCurrentColor] = useState(color);

    useEffect(() => {
        if (currentColor) {
            onChange(currentColor);
        }
    }, [currentColor]);

    const labelDiv = label ? <label htmlFor={id}>{label}</label> : "";

    const onColorChange = (e) => {
        setCurrentColor(e.target.value);
    };

    const colorSpanStyle = {
        ...colorSpanStyleBase,
        backgroundColor: currentColor,
    };

    return (
        <div style={rootStyle}>
            <span
                style={colorSpanStyle}
                onClick={() => document.getElementById(id).click()}
            >
                <input
                    type="color"
                    id={id}
                    style={colorStyle}
                    onChange={onColorChange}
                />
            </span>
            {labelDiv}
        </div>
    );
};

export default ColorInput;
