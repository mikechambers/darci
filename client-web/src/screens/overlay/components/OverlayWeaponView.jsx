import React, { useContext } from "react";
import { GlobalContext } from "../../../contexts/GlobalContext";
import RoundedImageView from "../../../components/RoundedImageView";
import OverlayStatView from "./OverlayStatView";
import { useFetchPlayerSummary } from "../../../hooks/remote";
import { PLAYER_VIEW_REFRESH_INTERVAL } from "../../../core/consts";
import { Moment } from "shared";
import { useQuery } from "../../../hooks/browser";
import {
    FLOAT_FORMATTER,
    INT_FORMATTER,
    PERCENT_FORMATTER,
    PERCENT_INT_FORMATTER,
} from "../../../core/utils/string";
import { calculateAverage, calculateRatio } from "shared/packages/utils";

const rootStyle = {
    display: "flex",
    flexDirection: "column",
    gap: 4,
};

const OverlayWeaponView = (props) => {
    const memberId = props.memberId;
    const mode = props.mode;
    const startMoment = props.startMoment;
    const characterClass = props.characterClass;
    const refreshInterval = props.refreshInterval
        ? props.refreshInterval
        : PLAYER_VIEW_REFRESH_INTERVAL;

    const config = props.config;

    const { global, dispatchGlobal } = useContext(GlobalContext);
    const manifest = global.manifest;

    const query = useQuery();

    let [playerSummary, isPlayerSummaryLoading, playerSummaryLoadError] =
        useFetchPlayerSummary({
            refreshInterval,
            memberId,
            mode,
            startMoment,
            endMoment: Moment.NOW,
            characterClass,
            hash: query.get("fr"),
        });

    if (!playerSummary) {
        return "";
    }

    if (!manifest) {
        return "";
    }

    const weaponData = playerSummary.summary.weapons.find(
        (e) => e.id === config.id
    );

    let kills = 0;
    let count = 0;
    let precision = 0;
    if (weaponData) {
        kills = weaponData.kills;
        count = weaponData.count;
        precision = weaponData.precision;
    }

    const weapon = manifest.getWeaponDefinition(config.id);

    const iconDiv = config.showIcon ? (
        <RoundedImageView
            width={50}
            height={50}
            image={weapon.collectionIcon}
        />
    ) : (
        ""
    );

    let data = [];

    data.push({
        label: count === 1 ? "Game" : "Games",
        value: count,
        formatter: INT_FORMATTER,
    });

    if (config.showKills) {
        data.push({
            label: kills === 1 ? "Kill" : "Kills",
            value: kills,
            formatter: INT_FORMATTER,
        });
    }

    if (config.showKillsGame) {
        data.push({
            label: "Kills / g",
            value: calculateAverage(kills, count),
            formatter: FLOAT_FORMATTER,
        });
    }

    if (config.showPrecision) {
        data.push({
            label: "Precision",
            value: calculateRatio(precision, kills),
            formatter: PERCENT_INT_FORMATTER,
        });
    }

    return (
        <div style={rootStyle}>
            <div className="overlay_title">{weapon.name}</div>
            <div className="overlay_list_row">
                <div>{iconDiv}</div>
                {data.map((d) => {
                    return (
                        <OverlayStatView
                            key={d.label}
                            label={d.label}
                            value={d.value}
                            formatter={d.formatter}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default OverlayWeaponView;
