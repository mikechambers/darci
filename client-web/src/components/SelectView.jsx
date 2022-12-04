import React, { useEffect, useState } from "react";

const SelectView = (props) => {
    const options = props.options;
    const onChange = props.onChange;

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

    return (
        <select
            className="nav_select"
            value={selectedIndex}
            onChange={onSelectChange}
        >
            {options.map((item, index) => {
                return (
                    <option
                        key={item.value}
                        value={index}
                        className="nav_option"
                    >
                        {item.value}
                    </option>
                );
            })}
        </select>
    );
};

export default SelectView;
