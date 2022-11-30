import React from "react";
import { Standing } from "shared";
import SwatchView from "../../../components/SwatchView";

const ActivitySwatchView = (props) => {
    const activity = props.activity;

    const color =
        activity.stats.standing === Standing.DEFEAT
            ? "var(--color-loss)"
            : "var(--color-win)";

    return <SwatchView width={16} height={16} color={color} radius={20} />;
};

export default ActivitySwatchView;
