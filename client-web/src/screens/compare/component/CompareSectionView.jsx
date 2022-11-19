import React from "react";

import CompareRowChangeCellView from "./CompareRowChangeCellView";
import CompareRowDivider from "./CompareRowDivider";

const renderSection = (arr) => {
    return arr.map((d, index) => {
        let key = `${d.label}_${index}`;
        if (d.isDivider) {
            return (
                <CompareRowDivider label={d.label} key={key} type={d.type} />
            );
        }

        return (
            <div className="compare_row compare_data_row" key={key}>
                <div>{d.label}</div>
                <div>{d.data0}</div>
                <div>{d.data1}</div>
                <CompareRowChangeCellView change={d.change} />
            </div>
        );
    });
};

const CompareSectionView = (props) => {
    const data = props.data;

    return renderSection(data);
};

export default CompareSectionView;
