import React, { useEffect, useState } from "react";
import { RIFT } from "shared/packages/enums/Mode";
import { LEFT, RIGHT } from "../core/consts";

const SelectView = (props) => {
    const options = props.options;
    const onChange = props.onChange;
    const align = props.align ? props.align : RIGHT;

    const [selectedIndex, setSelectedIndex] = useState(0);

    useEffect(() => {
        if (!options) {
            return;
        }

        onChange(options[selectedIndex], selectedIndex);
    }, [selectedIndex]);

    const onSelectChange = (e) => {
        setSelectedIndex(e.target.selectedIndex);
    };

    const className =
        align === RIGHT ? "nav_select" : "nav_select nav_select_left";
    return (
        <select
            className={className}
            value={selectedIndex}
            onChange={onSelectChange}
        >
            {options.map((item, index) => {
                return (
                    <option
                        key={item.label}
                        value={index}
                        className="nav_option"
                    >
                        {item.label}
                    </option>
                );
            })}
        </select>
    );
};

export default SelectView;
