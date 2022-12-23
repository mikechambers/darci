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
            sort: (a, b) => {
                return b.count - a.count;
            },
        },
        {
            label: "Kills",
            sort: (a, b) => {
                return b.kills - a.kills;
            },
        },
        {
            label: `Kills / p`,
            sort: (a, b) => {
                return (
                    calculateAverage(b.kills, b.count) -
                    calculateAverage(a.kills, a.count)
                );
            },
        },
        {
            label: "Precision",
            sort: (a, b) => {
                return (
                    calculatePercent(b.precision, b.kills) -
                    calculatePercent(a.precision, a.kills)
                );
            },
        },
    ];

    const onSortChange = (item, index) => {
        setSortIndex(index);
    };

    weapons.sort(sortOptions[sortIndex].sort);

    //add formatter option
    //then sort items not weapons

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
