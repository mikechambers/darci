import React, { useContext, useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { Moment } from "shared";
import CharacterClassSelection from "shared/packages/enums/CharacterClassSelection";
import Mode from "shared/packages/enums/Mode";
import CharacterClassSelectionSelect from "../../../components/CharacterClassSelectionSelect";
import ModeSelect from "../../../components/ModeSelect";
import MomentSelect from "../../../components/MomentSelect";
import PlayerSelect from "../../../components/PlayerSelect";
import { GlobalContext } from "../../../contexts/GlobalContext";
import Overlay from "../../../core/enums/Overlay";
import Stat from "../../../core/enums/Stat";
import { serialize } from "../../../core/utils/data";
import OverlaySelect from "./OverlaySelect";
import OverlayStatsConfigView from "./OverlayStatsConfigView";
import StatSelect from "./StatSelect";
import WeaponSelect from "./WeaponSelect";

const formColumnStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "var(--form-section-gap)",
    width: "min-content",
};

const formRowStyle = {
    display: "flex",
    gap: "var(--form-section-gap)",
    width: "min-content",
};

const OverlaySearchView = (props) => {
    const { global, dispatchGlobal } = useContext(GlobalContext);
    const players = global.players;
    const weapons = global.weapons;

    const navigate = useNavigate();
    const reducer = (state, action) => {
        let out = { ...state };

        switch (action.type) {
            case "stat": {
                break;
            }
        }

        out[action.type] = action.payload;
        return out;
    };

    const [output, dispatch] = useReducer(reducer, {
        player: undefined,
        mode: Mode.ALL_PVP,
        overlayType: Overlay.WEAPON,
        characterClass: CharacterClassSelection.ALL,
        startMoment: Moment.DAILY,
        weapon: undefined,
        stats: [Stat.KD],
    });

    useEffect(() => {
        if (players && players.length) {
            dispatch({ type: "player", payload: players[0] });
        }
    }, [players]);

    useEffect(() => {
        if (weapons && weapons.length) {
            dispatch({ type: "weapon", payload: weapons[0] });
        }
    }, [weapons]);

    const onClick = () => {
        let encoded;
        if (output.overlayType === Overlay.WEAPON) {
            encoded = serialize({
                overlayType: Overlay.WEAPON,
                weapon: output.weapon.data.id,
            });

            if (!encoded) {
                return;
            }

            navigate(
                `/overlay/${output.player.memberId}/${output.player.platformId}/${output.characterClass.type}/${output.mode.type}/${output.startMoment.type}/${encoded}/`
            );
        }
    };

    return (
        <div className="form_column">
            <div className="form_row">
                <PlayerSelect
                    label="player"
                    onChange={(d) => dispatch({ type: "player", payload: d })}
                    players={players}
                    selected={output.player}
                />
                <CharacterClassSelectionSelect
                    label="class"
                    onChange={(d) =>
                        dispatch({ type: "characterClass", payload: d })
                    }
                    selected={output.characterClass}
                />

                <ModeSelect
                    label="Mode"
                    onChange={(d) => dispatch({ type: "mode", payload: d })}
                    selected={output.mode}
                />
                <MomentSelect
                    label="Start Moment"
                    selected={output.startMoment}
                    onChange={(d) =>
                        dispatch({ type: "startMoment", payload: d })
                    }
                />
            </div>

            <fieldset className="form_column">
                <legend>Display</legend>

                <div className="form_row">
                    <div className="radio_container">
                        <input type="checkbox" id="mode_cb" name="mode_cb" />
                        <label htmlFor="mode_cb">Mode</label>
                    </div>
                    <div className="radio_container">
                        <input type="checkbox" id="mode_cb" name="mode_cb" />
                        <label htmlFor="mode_cb">Moment</label>
                    </div>
                </div>

                <OverlaySelect
                    selected={output.overlayType}
                    onChange={(d) =>
                        dispatch({ type: "overlayType", payload: d })
                    }
                />

                <div className="form_row">
                    <fieldset>
                        <legend>Weapon</legend>
                        <WeaponSelect
                            options={weapons}
                            selected={output.weapon}
                            disabled={output.overlayType !== Overlay.WEAPON}
                            onChange={(d) =>
                                dispatch({ type: "weapon", payload: d })
                            }
                        />
                        <div className="radio_container">
                            <input
                                type="checkbox"
                                id="mode_cb"
                                name="mode_cb"
                            />
                            <label htmlFor="mode_cb">Kills</label>
                        </div>
                        <div className="radio_container">
                            <input
                                type="checkbox"
                                id="mode_cb"
                                name="mode_cb"
                            />
                            <label htmlFor="mode_cb">Kills / g</label>
                        </div>
                        <div className="radio_container">
                            <input
                                type="checkbox"
                                id="mode_cb"
                                name="mode_cb"
                            />
                            <label htmlFor="mode_cb">Precision</label>
                        </div>
                    </fieldset>

                    <OverlayStatsConfigView
                        onChange={() => {}}
                        disabled={output.overlayType !== Overlay.STATS}
                    />
                </div>
            </fieldset>

            <button onClick={onClick}>Load</button>
        </div>
    );
};

export default OverlaySearchView;
