import React from "react";

export const DIVIDER_HEADER = "DIVIDER_HEADER";
export const DIVIDER_SUBHEADER = "DIVIDER_SUBHEADER";

let dividerStyleBase = {
    width: "485px",
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    justifyItems: "center",
};

const CompareRowDivider = (props) => {
    const label = props.label;
    const type = props.type;
    const id = props.id;

    let divider;
    let dividerStyle;
    let labelStyle = {};
    if (type === DIVIDER_SUBHEADER) {
        divider = "";
        labelStyle.textTransform = "capitalize";
        dividerStyle = {
            ...dividerStyleBase,
            gridTemplateColumns: "1fr",
        };
    } else {
        divider = <hr />;
        dividerStyle = dividerStyleBase;
    }

    return (
        <div style={dividerStyle} className="compare_row" id={id}>
            {divider}
            <div className="label_highlight" style={labelStyle}>
                {label}
            </div>
            {divider}
        </div>
    );
};

export default CompareRowDivider;
