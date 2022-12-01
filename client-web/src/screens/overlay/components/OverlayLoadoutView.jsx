import React, { useContext } from "react";
import { Moment } from "shared";
import AmmunitionType from "shared/packages/enums/AmmunitionType";
import { GlobalContext } from "../../../contexts/GlobalContext";
import { PLAYER_VIEW_REFRESH_INTERVAL } from "../../../core/consts";
import { useQuery } from "../../../hooks/browser";
import { useFetchPlayerSummary } from "../../../hooks/remote";
import OverlayWeaponItem from "./OverlayWeaponItem";

const rootStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "var(--overlay-padding)",
};

const OverlayLoadoutView = (props) => {
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

    if (!playerSummary || playerSummaryLoadError) {
        return "";
    }

    if (!manifest) {
        return "";
    }

    let divs = [];

    if (config.showPrimary || config.showSecondPrimary) {
        let primaries = playerSummary.summary.weapons.filter(
            (e) => e.item.ammunitionType === AmmunitionType.PRIMARY
        );

        if (config.showPrimary) {
            divs.push(primaries[0]);
        }

        if (config.showSecondPrimary) {
            divs.push(primaries[1]);
        }
    }

    if (config.showSpecial || config.showSecondSpecial) {
        let specials = playerSummary.summary.weapons.filter(
            (e) => e.item.ammunitionType === AmmunitionType.SPECIAL
        );

        if (config.showSpecial) {
            divs.push(specials[0]);
        }

        if (config.showSecondSpecial) {
            divs.push(specials[1]);
        }
    }

    if (config.showHeavy) {
        const heavyWeapon = playerSummary.summary.weapons.find(
            (e) => e.item.ammunitionType === AmmunitionType.HEAVY
        );
        divs.push(heavyWeapon);
    }

    return (
        <div style={rootStyle}>
            {divs.map((weapon, index) => {
                let id = index;
                if (weapon) {
                    id = weapon.id;
                }

                return (
                    <OverlayWeaponItem
                        key={id}
                        showIcon={true}
                        showPrecision={true}
                        showKills={true}
                        showKillsGame={true}
                        weaponId={id}
                        weapons={playerSummary.summary.weapons}
                    />
                );
            })}
        </div>
    );
};

export default OverlayLoadoutView;
