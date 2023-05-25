import React, { useState } from "react";

import { calculateChange } from "shared/packages/utils";

import CompareRowDivider, { DIVIDER_HEADER } from "./CompareRowDivider";
import CompareStatSectionView from "./CompareStatSectionView";
import CompareMapSectionView from "./CompareMapSectionView";
import CompareConfigSectionView from "./CompareConfigSectionView";
import CompareWeaponsSectionView, {
    META_TYPE,
    WEAPON_TYPE,
} from "./CompareWeaponsSectionView";
import CompareOverviewSectionView from "./CompareOverviewSectionView";

const rootStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
    width: "497px",
};

const expandStyle = {
    display: "flex",
    justifyContent: "center",
    padding: "8px",
};

const PlayerCompareView = (props) => {
    const summary1 = props.summary1;
    const summary2 = props.summary2;
    const period1 = props.period1;
    const period2 = props.period2;

    const [expandMaps, setExpandMaps] = useState(false);

    const onExpandMap = () => {
        setExpandMaps(!expandMaps);
    };

    return (
        <div style={rootStyle} id="overview">
            <CompareConfigSectionView
                summary1={summary1}
                summary2={summary2}
                period1={period1}
                period2={period2}
            />

            <CompareRowDivider
                label="Overview"
                id="overview"
                type={DIVIDER_HEADER}
            />
            <CompareOverviewSectionView
                summary1={summary1}
                summary2={summary2}
            />
            <CompareRowDivider label="Stats" id="stats" type={DIVIDER_HEADER} />
            <CompareStatSectionView summary1={summary1} summary2={summary2} />

            <div>&nbsp;</div>

            <CompareRowDivider
                label="Weapons"
                id="weapons"
                type={DIVIDER_HEADER}
            />
            <CompareWeaponsSectionView
                summary1={summary1}
                summary2={summary2}
                type={WEAPON_TYPE}
            />

            <div>&nbsp;</div>

            <CompareRowDivider
                label="Maps"
                id="maps"
                key="maps_divider"
                type={DIVIDER_HEADER}
            />
            {expandMaps ? (
                <CompareMapSectionView
                    summary1={summary1}
                    summary2={summary2}
                />
            ) : (
                <div onClick={onExpandMap} className="link" style={expandStyle}>
                    View Map Data
                </div>
            )}
        </div>
    );
};

export const createDivider = function (label, type = DIVIDER_HEADER) {
    return { isDivider: true, label: label, type: type };
};

export const createRow = (label, a, b, formatter) => {
    return {
        label,
        data0: formatter(a),
        data1: formatter(b),
        change: calculateChange(a, b),
    };
};

export default PlayerCompareView;
