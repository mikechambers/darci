import React from "react";
import { createDivider, createRow } from "./PlayerCompareView";

import {
    calculateRatio,
    calculateAverage,
    calculateEfficiency,
    calculateKillsDeathsRatio,
} from "shared/packages/utils";

import {
    FLOAT_FORMATTER,
    INT_FORMATTER,
    PERCENT_INT_FORMATTER,
} from "../../../core/utils/string";
import CompareSectionView from "./CompareSectionView";

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
        //createRow("Kills", s0.summary.kills, s1.summary.kills, INT_FORMATTER),
        createRow(
            "Assists / g",
            calculateAverage(s0.summary.assists, s0.summary.activityCount),
            calculateAverage(s1.summary.assists, s1.summary.activityCount),
            FLOAT_FORMATTER
        ),
        /*
        createRow(
            "Assists",
            s0.summary.assists,
            s1.summary.assists,
            INT_FORMATTER
        ),*/
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
            FLOAT_FORMATTER
        ),
        /*createRow(
            "Defeats",
            s0.summary.opponentsDefeated,
            s1.summary.opponentsDefeated,
            INT_FORMATTER
        ),*/
        createRow(
            "Deaths / g",
            calculateAverage(s0.summary.deaths, s0.summary.activityCount),
            calculateAverage(s1.summary.deaths, s1.summary.activityCount),
            FLOAT_FORMATTER
        ),
        /*createRow(
            "Deaths",
            s0.summary.deaths,
            s1.summary.deaths,
            INT_FORMATTER
        ),*/

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

        createDivider("Weapon Types"),

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

        createRow(
            "Gold Medals / g",
            calculateAverage(m0.gold, s0.summary.activityCount),
            calculateAverage(m1.gold, s1.summary.activityCount),
            FLOAT_FORMATTER
        ),

        createRow("We Ran ...", m0.weRan, m1.weRan, INT_FORMATTER),

        createRow(
            "We Ran... / g",
            calculateAverage(m0.weRan, s0.summary.activityCount),
            calculateAverage(m1.weRan, s1.summary.activityCount),
            FLOAT_FORMATTER
        ),

        createRow("Unyielding", m0.unyielding, m1.unyielding, INT_FORMATTER),
        createRow(
            "Unyielding / g",
            calculateAverage(m0.unyielding, s0.summary.activityCount),
            calculateAverage(m1.unyielding, s1.summary.activityCount),
            FLOAT_FORMATTER
        ),

        createRow(
            "Unyielding / We Ran...",
            calculateRatio(m0.unyielding, m0.weRan),
            calculateRatio(m1.unyielding, m1.weRan),
            FLOAT_FORMATTER
        ),
    ];

    return out;
};

export default CompareStatSectionView;
