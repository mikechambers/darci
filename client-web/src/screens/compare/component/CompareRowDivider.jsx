import React from "react";

const dividerStyle = {
    //backgroundColor: "var(--color-list-item-background)",
    //width: "497px",
    width: "485px",

    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    justifyItems: "center",
};

const dividerCell = {
    display: "flex",

    justifyContent: "center",
    width: "100%",
    alignItems: "stretch",
    padding: "8px 0px",
};

const hStyle = {
    // margin: "8px",
};

const CompareRowDivider = (props) => {
    const label = props.label;
    return (
        <div style={dividerStyle} className="compare_row">
            <hr style={hStyle} key="1" />
            <div className="label_highlight">{label}</div>
            <hr style={hStyle} />
        </div>
    );
};

export default CompareRowDivider;
