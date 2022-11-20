import React, { useContext, useEffect, useState } from "react";
import { EnumBase } from "shared";
import EnumSelect from "../../../components/EnumSelect";
import { GlobalContext } from "../../../contexts/GlobalContext";

//use across components so we only initialize once. Note, this means if the manifest
//updates with new weapons while user is in a session, they will not see until they
//refresh the page
let _options = [];
const WeaponSelect = (props) => {
    const onChange = props.onChange;
    const selected = props.selected;
    const disabled = props.disabled;

    const { global, dispatchGlobal } = useContext(GlobalContext);

    const [options, setOptions] = useState(_options);

    useEffect(() => {
        const manifest = global.manifest;
        if (manifest && !_options.length) {
            const weapons = manifest.getWeapons();
            let keyIndex = 0;
            for (const [key, value] of Object.entries(weapons)) {
                _options.push({
                    label: value.name,
                    value: value.name,
                    key: keyIndex++,
                    data: value,
                });
            }

            _options.sort((a, b) => a.label.localeCompare(b.label));

            setOptions(_options);
        }
    }, [global.manifest]);

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
