import React from "react";

const EnumSelectBase = (props) => {

    let options = props.options;
    let selected = props.selected;
    let label = props.label;
    let onChange = props.onChange;

    let handleOnChange = function(e) {
        onChange(options[e.target.selectedIndex]);
    }

  return (
    <select onChange={handleOnChange} value={selected} name={label} id={`${label}_select`}>
    {options.map((m, index)=> {
        return(<option key={index} value={m}>{m.label}</option>);
    })}

    </select>);
};

export default EnumSelectBase;
