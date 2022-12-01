import React, { useContext } from "react";
import RoundedImageView from "../../../components/RoundedImageView";
import { GlobalContext } from "../../../contexts/GlobalContext";

import {
    FLOAT_FORMATTER,
    INT_FORMATTER,
    PERCENT_INT_FORMATTER,
} from "../../../core/utils/string";
import { calculateAverage, calculateRatio } from "shared/packages/utils";
import OverlayStatView from "./OverlayStatView";

const rootStyle = {
    display: "flex",
    flexDirection: "column",
    gap: 4,
};

const OverlayWeaponItem = (props) => {
    const showKills = props.showKills;
    const showKillsGame = props.showKillsGame;
    const showPrecision = props.showPrecision;
    const showIcon = props.showIcon;
    const weaponId = props.weaponId;
    const weapons = props.weapons;

    const { global, dispatchGlobal } = useContext(GlobalContext);
    const manifest = global.manifest;

    const weapon = manifest.getWeaponDefinition(weaponId);

    const weaponData = weapons.find((e) => e.id === weaponId);

    if (!manifest) {
        return "";
    }

    let kills = 0;
    let count = 0;
    let precision = 0;
    if (weaponData) {
        kills = weaponData.kills;
        count = weaponData.count;
        precision = weaponData.precision;
    }

    const iconDiv = showIcon ? (
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

    if (showKills) {
        data.push({
            label: kills === 1 ? "Kill" : "Kills",
            value: kills,
            formatter: INT_FORMATTER,
        });
    }

    if (showKillsGame) {
        data.push({
            label: "Kills / g",
            value: calculateAverage(kills, count),
            formatter: FLOAT_FORMATTER,
        });
    }

    if (showPrecision) {
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

export default OverlayWeaponItem;
