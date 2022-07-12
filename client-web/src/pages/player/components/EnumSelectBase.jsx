import React from "react";


const EnumSelectBase = (props) => {

    let options = props.options;
    let selected = props.selected;
    let label = props.label;
    let onChange = props.onChange;

    let defaultIndex = options.findIndex((element) => element === selected);

    let handleOnChange = function(o) {
        let targetIndex = parseInt(o.target.value);

        onChange(options[targetIndex]);
    }

  return (
    <select onChange={handleOnChange} defaultValue={defaultIndex} name={label} id={`${label}_select`}>
    {options.map((m, index)=> {
        return(<option key={index} value={index}>{m.label}</option>);
    })}

    </select>);
};

export default EnumSelectBase;
