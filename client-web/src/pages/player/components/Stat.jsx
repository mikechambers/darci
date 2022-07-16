import React from "react";


const Stat = (props) => {

    const label = props.label;
    const value = props.value;

    return (
        <div>
            <div className="data">
                {value}
            </div>
            <div
            className="label"
            >
                {label}
            </div>
        </div>
    );
}

export default Stat;