import React from "react";
import EnumSelect from "../../../components/EnumSelect";
import Overlay from "../../../core/enums/Overlay";

const options = [Overlay.WEAPON, Overlay.STATS];

const OverlaySelect = (props) => {
    const onChange = props.onChange;
    const disabled = props.disabled;
    const label = props.label ? props.label : "Overlay Type";
    const selected = props.selected;

    return (
        <EnumSelect
            options={options}
            onChange={onChange}
            label={label}
            disabled={disabled}
            selected={selected}
        />
    );
};

export default OverlaySelect;
