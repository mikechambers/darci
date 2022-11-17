import React from "react";
import { calculateRatio, Moment, Season } from "shared";
import {
    calculateAverage,
    calculateChange,
    calculateEfficiency,
    calculateKillsDeathsRatio,
} from "shared/packages/utils";

import PlayerNameView from "../../../components/PlayerNameView";
import { SEASON_TYPE } from "../../../core/consts";
import {
    FLOAT_FORMATTER,
    INT_FORMATTER,
    PERCENT_FORMATTER,
    PERCENT_INT_FORMATTER,
} from "../../../core/utils/string";
import CompareRowChangeCellView from "./CompareRowChangeCellView";
import CompareRowDivider from "./CompareRowDivider";

const rootStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
    width: "497px",
};

const dataRowStyle = {
    display: "grid",
    gridTemplateColumns: "135px 150px 150px 50px",
    rowGap: "4px",
};

const PlayerCompareView = (props) => {
    const summary1 = props.summary1;
    const summary2 = props.summary2;
    const period1 = props.period1;
    const period2 = props.period2;

    const sData = formatData(summary1, summary2);

    return (
        <div style={rootStyle}>
            <div className="compare_row" style={dataRowStyle}>
                <div></div>
                <div>
                    <PlayerNameView player={summary1.player} />
                </div>
                <div>
                    <PlayerNameView player={summary2.player} />
                </div>
                <div></div>
            </div>

            <div className="compare_row" style={dataRowStyle}>
                <div>Class</div>
                <div>{summary1.query.classSelection}</div>
                <div>{summary1.query.classSelection}</div>
                <div></div>
            </div>

            <div className="compare_row" style={dataRowStyle}>
                <div>Mode</div>
                <div>{summary1.query.mode}</div>
                <div>{summary1.query.mode}</div>
                <div></div>
            </div>

            <div className="compare_row" style={dataRowStyle}>
                <div>Period</div>
                <div>{createPeriodData(period1)}</div>
                <div>{createPeriodData(period2)}</div>
                <div></div>
            </div>

            <CompareRowDivider label="Games" />

            {sData.map((d) => {
                if (d.isDivider) {
                    return <CompareRowDivider label={d.label} key={d.label} />;
                }

                return (
                    <div
                        className="compare_row"
                        style={dataRowStyle}
                        key={d.label}
                    >
                        <div>{d.label}</div>
                        <div>{d.data0}</div>
                        <div>{d.data1}</div>
                        <CompareRowChangeCellView change={d.change} />
                    </div>
                );
            })}
        </div>
    );
};

const createRow = (label, a, b, formatter) => {
    return {
        label,
        data0: formatter.format(a),
        data1: formatter.format(b),
        change: calculateChange(a, b),
    };
};

const createPeriodData = function (period) {
    if (period.type === SEASON_TYPE) {
        return Season.fromType(period.season).label;
    } else {
        let startMoment = Moment.fromType(period.startMoment);
        let endMoment = Moment.fromType(period.endMoment);
        return `${startMoment.label} to ${endMoment.label}`;
    }
};

const createMedalInfo = function (medals) {
    let total = 0;
    let gold = 0;
    let weRan = 0;
    for (const m of medals) {
        total += m.count;

        if (m.info.isGold) {
            gold += m.count;
        }

        if (m.info.id === "medalStreakAbsurd") {
            weRan += m.count;
        }
    }

    return { total, gold, weRan };
};

const createMapInfo = function (maps0, maps1) {
    let hash = new Map();

    const f = function (maps, index) {
        for (const m of maps) {
            //console.log(m);
            let t = hash.get(m.map.name);

            let prop = `data${index}`;
            if (!t) {
                t = {
                    name: m.map.name,

                    [prop]: {
                        count: m.summary.activityCount,
                        wins: m.summary.wins,
                        complete: m.summary.completed,
                        mercy: m.summary.completionReasonMercy,
                        //kills:m.summary.kills,
                        //assists:m.summary.assists,
                        //deaths:m.summary.deaths,
                    },
                };
            } else {
                if (!t[prop]) {
                    t[prop] = {
                        count: 0,
                        wins: 0,
                        complete: 0,
                        mercy: 0,
                    };
                }

                t[prop].count += m.summary.activityCount;
                t[prop].wins += m.summary.wins;
                t[prop].complete += m.summary.complete;
                t[prop].mercy += m.summary.completionReasonMercy;
            }

            hash.set(t.name, t);
        }
    };

    f(maps0, 0);
    f(maps1, 1);

    return Array.from(hash.values());
};

const formatData = function (s0, s1) {
    let m0 = createMedalInfo(s0.summary.medals);
    let m1 = createMedalInfo(s1.summary.medals);

    let mapInfo = createMapInfo(s0.maps, s1.maps);

    mapInfo = mapInfo.sort((a, b) => {
        let ac = a.data1 ? a.data1.count : 0;
        let bc = b.data1 ? b.data1.count : 0;
        return bc - ac;
    });

    let out = [
        createRow(
            "Games",
            s0.summary.activityCount,
            s1.summary.activityCount,
            INT_FORMATTER
        ),
        createRow(
            "Win %",
            calculateRatio(s0.summary.wins, s0.summary.activityCount),
            calculateRatio(s1.summary.wins, s1.summary.activityCount),
            PERCENT_INT_FORMATTER
        ),
        createRow(
            "Mercy %",
            calculateRatio(
                s0.summary.completionReasonMercy,
                s0.summary.activityCount
            ),
            calculateRatio(
                s1.summary.completionReasonMercy,
                s1.summary.activityCount
            ),
            PERCENT_INT_FORMATTER
        ),
        createRow(
            "Completed %",
            calculateRatio(s0.summary.completed, s0.summary.activityCount),
            calculateRatio(s1.summary.completed, s1.summary.activityCount),
            PERCENT_INT_FORMATTER
        ),

        createDivider("Stats"),

        createRow(
            "K/D",
            calculateKillsDeathsRatio(s0.summary.kills, s0.summary.deaths),
            calculateKillsDeathsRatio(s1.summary.kills, s1.summary.deaths),
            FLOAT_FORMATTER
        ),
        createRow(
            "Efficiency",
            calculateEfficiency(
                s0.summary.kills,
                s0.summary.deaths,
                s0.summary.assists
            ),
            calculateEfficiency(
                s1.summary.kills,
                s1.summary.deaths,
                s1.summary.assists
            ),
            FLOAT_FORMATTER
        ),

        createRow(
            "Kill / g",
            calculateAverage(s0.summary.kills, s0.summary.activityCount),
            calculateAverage(s1.summary.kills, s1.summary.activityCount),
            FLOAT_FORMATTER
        ),
        createRow("Kills", s0.summary.kills, s1.summary.kills, INT_FORMATTER),
        createRow(
            "Assists / g",
            calculateAverage(s0.summary.assists, s0.summary.activityCount),
            calculateAverage(s1.summary.assists, s1.summary.activityCount),
            PERCENT_INT_FORMATTER
        ),
        createRow(
            "Assists",
            s0.summary.assists,
            s1.summary.assists,
            INT_FORMATTER
        ),
        createRow(
            "Defeats / g",
            calculateAverage(
                s0.summary.opponentsDefeated,
                s0.summary.activityCount
            ),
            calculateAverage(
                s1.summary.opponentsDefeated,
                s1.summary.activityCount
            ),
            PERCENT_INT_FORMATTER
        ),
        createRow(
            "Defeats",
            s0.summary.opponentsDefeated,
            s1.summary.opponentsDefeated,
            INT_FORMATTER
        ),
        createRow(
            "Deaths / g",
            calculateAverage(s0.summary.deaths, s0.summary.activityCount),
            calculateAverage(s1.summary.deaths, s1.summary.activityCount),
            FLOAT_FORMATTER
        ),
        createRow(
            "Deaths",
            s0.summary.deaths,
            s1.summary.deaths,
            INT_FORMATTER
        ),

        createDivider("Kill Types"),

        createRow(
            "Weapon Kills",
            calculateRatio(s0.summary.weaponKills, s0.summary.kills),
            calculateRatio(s1.summary.weaponKills, s1.summary.kills),
            PERCENT_INT_FORMATTER
        ),

        createRow(
            "Precision Kills",
            calculateRatio(s0.summary.precision, s0.summary.kills),
            calculateRatio(s1.summary.precision, s1.summary.kills),
            PERCENT_INT_FORMATTER
        ),

        createRow(
            "Melee Kills",
            calculateRatio(s0.summary.meleeKills, s0.summary.kills),
            calculateRatio(s1.summary.meleeKills, s1.summary.kills),
            PERCENT_INT_FORMATTER
        ),

        createRow(
            "Grenade Kills",
            calculateRatio(s0.summary.grenadeKills, s0.summary.kills),
            calculateRatio(s1.summary.grenadeKills, s1.summary.kills),
            PERCENT_INT_FORMATTER
        ),

        createRow(
            "Super Kills",
            calculateRatio(s0.summary.superKills, s0.summary.kills),
            calculateRatio(s1.summary.superKills, s1.summary.kills),
            PERCENT_INT_FORMATTER
        ),

        createDivider("Weapon Type"),

        createRow(
            "Primary Weapon",
            calculateRatio(s0.summary.primaryAmmoKills, s0.summary.weaponKills),
            calculateRatio(s1.summary.primaryAmmoKills, s1.summary.weaponKills),
            PERCENT_INT_FORMATTER
        ),

        createRow(
            "Special Weapon",
            calculateRatio(s0.summary.specialAmmoKills, s0.summary.weaponKills),
            calculateRatio(s1.summary.specialAmmoKills, s1.summary.weaponKills),
            PERCENT_INT_FORMATTER
        ),

        createRow(
            "Heavy Weapon",
            calculateRatio(s0.summary.heavyAmmoKills, s0.summary.weaponKills),
            calculateRatio(s1.summary.heavyAmmoKills, s1.summary.weaponKills),
            PERCENT_INT_FORMATTER
        ),

        createDivider("Medals"),

        createRow(
            "Medals / g",
            calculateAverage(m0.total, s0.summary.activityCount),
            calculateAverage(m1.total, s1.summary.activityCount),
            FLOAT_FORMATTER
        ),

        createRow("Gold Medals", m0.gold, m1.gold, INT_FORMATTER),
        createRow("We Rans", m0.weRan, m1.weRan, INT_FORMATTER),
        createDivider("Maps"),
    ];

    let g = function (d, n) {
        if (!d) {
            return 0;
        }

        return d[n];
    };
    for (const m of mapInfo) {
        //out.push({ label: m.name, data0: "", data1: "", change: undefined });

        out.push(
            createRow(
                m.name,
                calculateRatio(g(m.data0, "count"), s0.summary.activityCount),
                calculateRatio(g(m.data1, "count"), s1.summary.activityCount),
                PERCENT_FORMATTER
            )
        );
    }

    return out;
};

const createDivider = function (label) {
    return { isDivider: true, label: label };
};

export default PlayerCompareView;
