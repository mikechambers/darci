import React from "react";
import { calculateAverage, calculateRatio } from "shared/packages/utils";
import {
    formatFloat,
    formatInt,
    formatPercent,
    formatPercentInt,
} from "../../../core/utils/string";

import { DIVIDER_SUBHEADER } from "./CompareRowDivider";
import CompareSectionView from "./CompareSectionView";
import { createDivider, createRow } from "./PlayerCompareView";

const { useQuery } = require("../../../hooks/browser");

export const WEAPON_TYPE = "WEAPON_TYPE";
export const META_TYPE = "META_TYPE";

const CompareWeaponsSectionView = (props) => {
    const summary1 = props.summary1;
    const summary2 = props.summary2;
    const type = props.type ? props.type : WEAPON_TYPE;

    let limit = props.limit ? props.limit : 10;

    const activityCount1 = summary1.summary.activityCount;
    const activityCount2 = summary2.summary.activityCount;

    let query = useQuery();

    if (type === META_TYPE) {
        let metalimit = query.get("metalimit");
        if (metalimit) {
            limit = metalimit;
        }
    } else {
        let weaponlimit = query.get("weaponlimit");
        if (weaponlimit) {
            limit = weaponlimit;
        }
    }

    const [weapons1, weapons2] =
        type === WEAPON_TYPE
            ? [summary1.summary.weapons, summary2.summary.weapons]
            : [summary1.meta, summary2.meta];

    const data = formatWeaponData(
        weapons1,
        weapons2,
        limit,
        activityCount1,
        activityCount2,
        type
    );

    return <CompareSectionView data={data} />;
};

export default CompareWeaponsSectionView;

const formatWeaponData = function (w0, w1, limit, count1, count2, type) {
    let weaponInfo = createWeaponInfo(w0, w1);

    weaponInfo = weaponInfo.sort((a, b) => {
        let ac = a.data1 ? a.data1.count : 0;
        let bc = b.data1 ? b.data1.count : 0;
        return bc - ac;
    });

    if (weaponInfo.length > limit) {
        weaponInfo.length = limit;
    }

    let out = [];

    let g = function (d, n) {
        if (!d) {
            return 0;
        }

        return d[n];
    };

    let [unit, abbr] = type === WEAPON_TYPE ? ["Games", "g"] : ["Players", "p"];

    for (const m of weaponInfo) {
        out.push(createDivider(m.name, DIVIDER_SUBHEADER));

        out.push(
            createRow(unit, g(m.data0, "count"), g(m.data1, "count"), formatInt)
        );

        if (type === WEAPON_TYPE) {
            out.push(
                createRow(
                    "% Total",
                    calculateRatio(g(m.data0, "count"), count1),
                    calculateRatio(g(m.data1, "count"), count2),
                    formatPercent
                )
            );
        } else {
            out.push(
                createRow(
                    `Players / g`,
                    calculateAverage(g(m.data0, "count"), count1),
                    calculateAverage(g(m.data1, "count"), count2),
                    formatFloat
                )
            );
        }
        out.push(
            createRow(
                "Kills",
                g(m.data0, "kills"),
                g(m.data1, "kills"),
                formatInt
            )
        );

        out.push(
            createRow(
                `Kills / ${abbr}`,
                calculateAverage(g(m.data0, "kills"), g(m.data0, "count")),
                calculateAverage(g(m.data1, "kills"), g(m.data1, "count")),
                formatFloat
            )
        );

        out.push(
            createRow(
                "Precision",
                calculateRatio(g(m.data0, "precision"), g(m.data0, "kills")),
                calculateRatio(g(m.data1, "precision"), g(m.data1, "kills")),
                formatPercentInt
            )
        );
    }

    return out;
};

const createWeaponInfo = function (weapons0, weapons1) {
    let hash = new Map();

    const f = function (weapons, index) {
        for (const m of weapons) {
            const id = m.id;
            let t = hash.get(id);

            let prop = `data${index}`;
            if (!t) {
                t = {
                    name: m.item.name,

                    [prop]: {
                        count: m.count,
                        kills: m.kills,
                        precision: m.precision,
                    },
                };
            } else {
                if (!t[prop]) {
                    t[prop] = {
                        count: 0,
                        kills: 0,
                        precision: 0,
                    };
                }

                t[prop].count += m.count;
                t[prop].kills += m.kills;
                t[prop].precision += m.precision;
            }

            hash.set(id, t);
        }
    };

    f(weapons0, 0);
    f(weapons1, 1);

    return Array.from(hash.values());
};
