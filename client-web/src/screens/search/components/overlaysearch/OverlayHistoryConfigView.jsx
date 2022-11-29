import React, { useEffect, useState } from "react";
import RangeInput from "../../../../components/RangeInput";

const OverlayHistoryConfigView = (props) => {
    const onChange = props.onChange;
    const disabled = props.disabled;

    const [value, setValue] = useState(10);

    useEffect(() => {
        onChange(value);
    }, [value]);

    return (
        <fieldset className="form_column">
            <legend>Game History</legend>

            <RangeInput
                min={1}
                max={50}
                value={value}
                onChange={(e) => setValue(e)}
                label="Games"
                disabled={disabled}
            />
        </fieldset>
    );
};

export default OverlayHistoryConfigView;
