import React from "react";
import CompareSectionView from "./CompareSectionView";

import { createDivider, createRow } from "./PlayerCompareView";

import {
    calculateRatio,
    calculateKillsDeathsRatio,
    calculateKillsDeathsAssists,
} from "shared/packages/utils";

import {
    FLOAT_FORMATTER,
    PERCENT_INT_FORMATTER,
} from "../../../core/utils/string";
import { DIVIDER_SUBHEADER } from "./CompareRowDivider";

const CompareMapSectionView = (props) => {
    const summary1 = props.summary1;
    const summary2 = props.summary2;

    const data = formatMapData(summary1, summary2);

    return <CompareSectionView data={data} />;
};

const createMapInfo = function (maps0, maps1) {
    let hash = new Map();

    const f = function (maps, index) {
        for (const m of maps) {
            let t = hash.get(m.map.name);

            let prop = `data${index}`;
            if (!t) {
                t = {
                    name: m.map.name,

                    [prop]: {
                        count: m.summary.activityCount,
                        wins: m.summary.wins,
                        completed: m.summary.completed,
                        mercy: m.summary.completionReasonMercy,
                        kills: m.summary.kills,
                        assists: m.summary.assists,
                        deaths: m.summary.deaths,
                    },
                };
            } else {
                if (!t[prop]) {
                    t[prop] = {
                        count: 0,
                        wins: 0,
                        completed: 0,
                        mercy: 0,
                        kills: 0,
                        assists: 0,
                        deaths: 0,
                    };
                }

                t[prop].count += m.summary.activityCount;
                t[prop].wins += m.summary.wins;
                t[prop].completed += m.summary.completed;
                t[prop].mercy += m.summary.completionReasonMercy;

                t[prop].kills += m.summary.kills;
                t[prop].assists += m.summary.assists;
                t[prop].deaths += m.summary.deaths;
            }

            hash.set(t.name, t);
        }
    };

    f(maps0, 0);
    f(maps1, 1);

    return Array.from(hash.values());
};

const formatMapData = function (s0, s1) {
    let mapInfo = createMapInfo(s0.maps, s1.maps);

    mapInfo = mapInfo.sort((a, b) => {
        let ac = a.data1 ? a.data1.count : 0;
        let bc = b.data1 ? b.data1.count : 0;
        return bc - ac;
    });

    let out = [];

    let g = function (d, n) {
        if (!d) {
            return 0;
        }

        return d[n];
    };

    for (const m of mapInfo) {
        out.push(createDivider(m.name, DIVIDER_SUBHEADER));

        out.push(
            createRow(
                "Total",
                calculateRatio(g(m.data0, "count"), s0.summary.activityCount),
                calculateRatio(g(m.data1, "count"), s1.summary.activityCount),
                PERCENT_INT_FORMATTER
            ),

            createRow(
                "Win",
                calculateRatio(g(m.data0, "wins"), g(m.data0, "count")),
                calculateRatio(g(m.data1, "wins"), g(m.data1, "count")),
                PERCENT_INT_FORMATTER
            ),

            createRow(
                "Completed",
                calculateRatio(g(m.data0, "completed"), g(m.data0, "count")),
                calculateRatio(g(m.data1, "completed"), g(m.data1, "count")),
                PERCENT_INT_FORMATTER
            ),

            createRow(
                "Mercy",
                calculateRatio(g(m.data0, "mercy"), g(m.data0, "count")),
                calculateRatio(g(m.data1, "mercy"), g(m.data1, "count")),
                PERCENT_INT_FORMATTER
            ),

            createRow(
                "K/D",
                calculateKillsDeathsRatio(
                    g(m.data0, "kills"),
                    g(m.data0, "deaths")
                ),
                calculateKillsDeathsRatio(
                    g(m.data1, "kills"),
                    g(m.data1, "deaths")
                ),
                FLOAT_FORMATTER
            ),

            createRow(
                "Efficiency",
                calculateKillsDeathsAssists(
                    g(m.data0, "kills"),
                    g(m.data0, "deaths"),
                    g(m.data0, "assists")
                ),
                calculateKillsDeathsAssists(
                    g(m.data1, "kills"),
                    g(m.data1, "deaths"),
                    g(m.data1, "assists")
                ),
                FLOAT_FORMATTER
            )
        );
    }
    return out;
};

export default CompareMapSectionView;
