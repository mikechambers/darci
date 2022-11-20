import React from "react";
import EnumSelect from "../../../components/EnumSelect";

const WeaponSelect = (props) => {
    const onChange = props.onChange;
    const selected = props.selected;
    const disabled = props.disabled;
    const options = props.options;

    return (
        <EnumSelect
            options={options}
            onChange={onChange}
            selected={selected}
            disabled={disabled}
        />
    );
};

export default WeaponSelect;
