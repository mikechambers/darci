import React, { useContext, useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { Moment } from "shared";
import CharacterClassSelection from "shared/packages/enums/CharacterClassSelection";
import Mode from "shared/packages/enums/Mode";
import CharacterClassSelectionSelect from "../../../../components/CharacterClassSelectionSelect";
import ModeSelect from "../../../../components/ModeSelect";
import MomentSelect from "../../../../components/MomentSelect";
import PlayerSelect from "../../../../components/PlayerSelect";
import { GlobalContext } from "../../../../contexts/GlobalContext";
import Overlay from "../../../../core/enums/Overlay";
import { serialize } from "../../../../core/utils/data";
import OverlayStatsConfigView from "./OverlayStatsConfigView";
import OverlayWeaponsConfigView from "./OverlayWeaponsConfigView";

const PLAYER_UPDATED = "PLAYER_UPDATED";
const MODE_UPDATED = "MODE_UPDATED";
const OVERLAY_TYPE_UPDATED = "OVERLAY_TYPE_UPDATED";
const CHARACTER_CLASS_UPDATED = "CHARACTER_CLASS_UPDATED";
const MOMENT_UPDATED = "MOMENT_UPDATED";
const WEAPON_UPDATED = "WEAPON_UPDATED";
const STATS_UPDATED = "STATS_UPDATED";
const SHOW_MODE_UPDATED = "SHOW_MODE_UPDATED";
const SHOW_MOMENT_UPDATED = "SHOW_MOMENT_UPDATED";

const OverlaySearchView = (props) => {
    const { global, dispatchGlobal } = useContext(GlobalContext);
    const players = global.players;

    const navigate = useNavigate();
    const reducer = (state, action) => {
        let out = { ...state };

        switch (action.type) {
            case PLAYER_UPDATED: {
                out.player = action.payload;
                break;
            }
            case MODE_UPDATED: {
                out.mode = action.payload;
                break;
            }
            case OVERLAY_TYPE_UPDATED: {
                out.overlayType = action.payload;
                break;
            }
            case CHARACTER_CLASS_UPDATED: {
                out.characterClass = action.payload;
                break;
            }
            case MOMENT_UPDATED: {
                out.moment = action.payload;
                break;
            }
            case WEAPON_UPDATED: {
                out.weapon = action.weapon;
                break;
            }
            case STATS_UPDATED: {
                out.stats = action.payload;
                break;
            }
            case SHOW_MODE_UPDATED: {
                out.showMode = action.payload;
                break;
            }
            case SHOW_MOMENT_UPDATED: {
                out.showMode = action.payload;
                break;
            }
            default: {
                console.log("OverlaySearchView unknown action:", action);
            }
        }

        return out;
    };

    const [output, dispatch] = useReducer(reducer, {
        player: undefined,
        mode: Mode.ALL_PVP,
        overlayType: Overlay.WEAPON,
        characterClass: CharacterClassSelection.ALL,
        startMoment: Moment.DAILY,
        weapon: undefined,
        stats: [],
        showMode: true,
        showMoment: true,
    });

    useEffect(() => {
        if (players && players.length) {
            dispatch({ type: PLAYER_UPDATED, payload: players[0] });
        }
    }, [players]);

    const onClick = () => {
        console.log(output);
        let encoded;
        if (output.overlayType === Overlay.WEAPON) {
            encoded = serialize({
                overlayType: Overlay.WEAPON,
                weapon: output.weapon.data.id,
            });

            if (!encoded) {
                return;
            }

            return;
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
                    onChange={(d) =>
                        dispatch({ type: PLAYER_UPDATED, payload: d })
                    }
                    players={players}
                    selected={output.player}
                />
                <CharacterClassSelectionSelect
                    label="class"
                    onChange={(d) =>
                        dispatch({ type: CHARACTER_CLASS_UPDATED, payload: d })
                    }
                    selected={output.characterClass}
                />

                <ModeSelect
                    label="Mode"
                    onChange={(d) =>
                        dispatch({ type: MODE_UPDATED, payload: d })
                    }
                    selected={output.mode}
                />
                <MomentSelect
                    label="Start Moment"
                    selected={output.startMoment}
                    onChange={(d) =>
                        dispatch({ type: MOMENT_UPDATED, payload: d })
                    }
                />
            </div>

            <fieldset className="form_column">
                <legend>Info to Display</legend>

                <div className="form_row">
                    <div className="radio_container">
                        <input
                            type="radio"
                            value={Overlay.WEAPON.type}
                            name="overlay_type_group"
                            id="weapon_radio_id"
                            onClick={(e) =>
                                dispatch({
                                    type: OVERLAY_TYPE_UPDATED,
                                    payload: Overlay.fromType(e.target.value),
                                })
                            }
                            defaultChecked={
                                output.overlayType === Overlay.WEAPON
                            }
                        />
                        <label htmlFor="weapon_radio_id">Weapon</label>
                    </div>
                    <div className="radio_container">
                        <input
                            type="radio"
                            value={Overlay.STATS.type}
                            name="overlay_type_group"
                            id="stats_radio_id"
                            onClick={(e) =>
                                dispatch({
                                    type: OVERLAY_TYPE_UPDATED,
                                    payload: Overlay.fromType(e.target.value),
                                })
                            }
                            defaultChecked={
                                output.overlayType === Overlay.STATS
                            }
                        />
                        <label htmlFor="stats_radio_id">Stats</label>
                    </div>
                </div>

                <div className="form_row">
                    <OverlayWeaponsConfigView
                        onChange={(d) =>
                            dispatch({ type: WEAPON_UPDATED, payload: d })
                        }
                        disabled={output.overlayType !== Overlay.WEAPON}
                    />

                    <OverlayStatsConfigView
                        onChange={(d) =>
                            dispatch({ type: STATS_UPDATED, payload: d })
                        }
                        disabled={output.overlayType !== Overlay.STATS}
                    />
                </div>
                <div className="form_row">
                    <div className="radio_container">
                        <input
                            type="checkbox"
                            id="mode_cb"
                            name="mode_cb"
                            defaultChecked={output.showMode}
                            onClick={(e) =>
                                dispatch({
                                    type: SHOW_MODE_UPDATED,
                                    payload: e.target.checked,
                                })
                            }
                        />
                        <label htmlFor="mode_cb">Mode</label>
                    </div>
                    <div className="radio_container">
                        <input
                            type="checkbox"
                            id="mode_cb"
                            name="mode_cb"
                            defaultChecked={output.showMoment}
                            onClick={(e) =>
                                dispatch({
                                    type: SHOW_MOMENT_UPDATED,
                                    payload: e.target.checked,
                                })
                            }
                        />
                        <label htmlFor="mode_cb">Moment</label>
                    </div>
                </div>
            </fieldset>

            <button onClick={onClick}>Load</button>
        </div>
    );
};

export default OverlaySearchView;
