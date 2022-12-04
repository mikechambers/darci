import React from "react";
import { createDivider, createRow } from "./PlayerCompareView";

import {
    calculateRatio,
    calculateAverage,
    calculateEfficiency,
    calculateKillsDeathsRatio,
} from "shared/packages/utils";

import CompareSectionView from "./CompareSectionView";
import {
    formatFloat,
    formatInt,
    formatPercentInt,
} from "../../../core/utils/string";

const CompareStatSectionView = (props) => {
    const summary1 = props.summary1;
    const summary2 = props.summary2;

    let data = formatData(summary1, summary2);

    return <CompareSectionView data={data} id="stats" />;
};

const createMedalInfo = function (medals) {
    let total = 0;
    let gold = 0;
    let weRan = 0;
    let unyielding = 0;
    for (const m of medals) {
        total += m.count;

        if (m.info.isGold) {
            gold += m.count;
        }

        if (m.info.id === "medalStreakAbsurd") {
            weRan += m.count;
        } else if (m.info.id === "medalStreak10x") {
            unyielding += m.count;
        }
    }

    return { total, gold, weRan, unyielding };
};

const formatData = function (s0, s1) {
    let m0 = createMedalInfo(s0.summary.medals);
    let m1 = createMedalInfo(s1.summary.medals);

    let out = [
        createRow(
            "K/D",
            calculateKillsDeathsRatio(s0.summary.kills, s0.summary.deaths),
            calculateKillsDeathsRatio(s1.summary.kills, s1.summary.deaths),
            formatFloat
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
            formatFloat
        ),

        createRow(
            "Kill / g",
            calculateAverage(s0.summary.kills, s0.summary.activityCount),
            calculateAverage(s1.summary.kills, s1.summary.activityCount),
            formatFloat
        ),

        createRow(
            "Assists / g",
            calculateAverage(s0.summary.assists, s0.summary.activityCount),
            calculateAverage(s1.summary.assists, s1.summary.activityCount),
            formatFloat
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
            formatFloat
        ),

        createRow(
            "Deaths / g",
            calculateAverage(s0.summary.deaths, s0.summary.activityCount),
            calculateAverage(s1.summary.deaths, s1.summary.activityCount),
            formatFloat
        ),

        createDivider("Kill Types"),

        createRow(
            "Weapon Kills",
            calculateRatio(s0.summary.weaponKills, s0.summary.kills),
            calculateRatio(s1.summary.weaponKills, s1.summary.kills),
            formatPercentInt
        ),

        createRow(
            "Precision Kills",
            calculateRatio(s0.summary.precision, s0.summary.kills),
            calculateRatio(s1.summary.precision, s1.summary.kills),
            formatPercentInt
        ),

        createRow(
            "Melee Kills",
            calculateRatio(s0.summary.meleeKills, s0.summary.kills),
            calculateRatio(s1.summary.meleeKills, s1.summary.kills),
            formatPercentInt
        ),

        createRow(
            "Grenade Kills",
            calculateRatio(s0.summary.grenadeKills, s0.summary.kills),
            calculateRatio(s1.summary.grenadeKills, s1.summary.kills),
            formatPercentInt
        ),

        createRow(
            "Super Kills",
            calculateRatio(s0.summary.superKills, s0.summary.kills),
            calculateRatio(s1.summary.superKills, s1.summary.kills),
            formatPercentInt
        ),

        createDivider("Weapon Types"),

        createRow(
            "Primary Weapon",
            calculateRatio(s0.summary.primaryAmmoKills, s0.summary.weaponKills),
            calculateRatio(s1.summary.primaryAmmoKills, s1.summary.weaponKills),
            formatPercentInt
        ),

        createRow(
            "Special Weapon",
            calculateRatio(s0.summary.specialAmmoKills, s0.summary.weaponKills),
            calculateRatio(s1.summary.specialAmmoKills, s1.summary.weaponKills),
            formatPercentInt
        ),

        createRow(
            "Heavy Weapon",
            calculateRatio(s0.summary.heavyAmmoKills, s0.summary.weaponKills),
            calculateRatio(s1.summary.heavyAmmoKills, s1.summary.weaponKills),
            formatPercentInt
        ),

        createDivider("Medals"),

        createRow(
            "Medals / g",
            calculateAverage(m0.total, s0.summary.activityCount),
            calculateAverage(m1.total, s1.summary.activityCount),
            formatFloat
        ),

        createRow("Gold Medals", m0.gold, m1.gold, formatInt),

        createRow(
            "Gold Medals / g",
            calculateAverage(m0.gold, s0.summary.activityCount),
            calculateAverage(m1.gold, s1.summary.activityCount),
            formatFloat
        ),

        createRow("We Ran ...", m0.weRan, m1.weRan, formatInt),

        createRow(
            "We Ran... / g",
            calculateAverage(m0.weRan, s0.summary.activityCount),
            calculateAverage(m1.weRan, s1.summary.activityCount),
            formatFloat
        ),

        createRow("Unyielding", m0.unyielding, m1.unyielding, formatInt),
        createRow(
            "Unyielding / g",
            calculateAverage(m0.unyielding, s0.summary.activityCount),
            calculateAverage(m1.unyielding, s1.summary.activityCount),
            formatFloat
        ),

        createRow(
            "Unyielding / We Ran...",
            calculateRatio(m0.unyielding, m0.weRan),
            calculateRatio(m1.unyielding, m1.weRan),
            formatFloat
        ),
    ];

    return out;
};

export default CompareStatSectionView;
