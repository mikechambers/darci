import React, { useState } from "react";
import { ItemSubType } from "shared";
import AmmunitionType from "shared/packages/enums/AmmunitionType";
import {
    calculateAverage,
    calculatePercent,
    calculateRatio,
} from "shared/packages/utils";
import {
    formatFloat,
    formatInt,
    formatPercent,
    formatPercentInt,
} from "../../../core/utils/string";
import PlayerWeaponsDetailList from "./PlayerWeaponsDetailList";

const PlayerMetaWeaponsDetailView = (props) => {
    let weapons = props.weapons ? props.weapons : [];

    const [sortIndex, setSortIndex] = useState(0);

    let sortOptions = [
        {
            label: "Players",
        },
        {
            label: "Kills",
        },
        {
            label: `Kills / p`,
        },
        {
            label: "Precision",
        },
    ];

    const onSortChange = (item, index) => {
        setSortIndex(index);
    };

    let data = [];
    for (const w of weapons) {
        let precision = calculateRatio(w.precision, w.kills);
        let items = [
            {
                label: "Players",
                value: w.count,
                formatter: formatInt,
            },
            {
                label: "Kills",
                value: w.kills,
                formatter: formatInt,
            },
            {
                label: `Kills/p`,
                value: calculateAverage(w.kills, w.count),
                formatter: formatFloat,
            },
            {
                label: "Precision",
                value: precision,
                formatter: formatPercent,
            },
        ];

        data.push({
            id: w.id,
            items: items,
            weapon: w.item,
        });
    }

    data.sort((a, b) => {
        return b.items[sortIndex].value - a.items[sortIndex].value;
    });

    return (
        <PlayerWeaponsDetailList
            weapons={data}
            title="weapons"
            description="Meta weapons you have played against."
            sortOptions={sortOptions}
            onSortChange={onSortChange}
        />
    );
};

export default PlayerMetaWeaponsDetailView;
