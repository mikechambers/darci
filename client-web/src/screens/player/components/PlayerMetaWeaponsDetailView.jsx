import React, { useState } from "react";
import { ItemSubType } from "shared";
import AmmunitionType from "shared/packages/enums/AmmunitionType";
import { calculateAverage, calculatePercent } from "shared/packages/utils";
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

    let data = [];
    for (const w of weapons) {
        let precision = calculatePercent(w.precision, w.kills).toFixed(2);
        let items = [
            {
                label: "Players",
                value: w.count,
            },
            {
                label: "Kills",
                value: w.kills,
            },
            {
                label: `Kills/p`,
                value: calculateAverage(w.kills, w.count).toFixed(2),
            },
            {
                label: "Precision",
                value: precision + "%",
                data: precision,
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
