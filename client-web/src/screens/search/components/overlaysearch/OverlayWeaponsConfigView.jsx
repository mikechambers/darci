import React, { useContext, useEffect, useReducer } from "react";
import { GlobalContext } from "../../../../contexts/GlobalContext";
import WeaponSelect from "./WeaponSelect";
import RoundedImageView from "../../../../components/RoundedImageView";

const WEAPON_UPDATED = "weapon";
const SHOW_KILLS_UPDATED = "showKills";
const SHOW_KILLS_GAME_UPDATED = "showKillsGame";
const SHOW_PRECISION_UPDATED = "showPrecision";
const SHOW_ICON_UPDATED = "SHOW_ICON_UPDATED";

const OverlayWeaponsConfigView = (props) => {
    const disabled = props.disabled;
    const onChange = props.onChange;

    const { global, dispatchGlobal } = useContext(GlobalContext);
    const weapons = global.weapons;

    const reducer = (state, action) => {
        let out = { ...state };

        switch (action.type) {
            case WEAPON_UPDATED: {
                out.weapon = action.payload;
                break;
            }
            case SHOW_KILLS_UPDATED: {
                out.showKills = action.payload;
                break;
            }
            case SHOW_KILLS_GAME_UPDATED: {
                out.showKillsGame = action.payload;
                break;
            }
            case SHOW_PRECISION_UPDATED: {
                out.showPrecision = action.payload;
                break;
            }
            case SHOW_ICON_UPDATED: {
                out.showIcon = action.payload;
                break;
            }
            default: {
                console.log(
                    "OverlayWeaponsConfigView : Unknown action : ",
                    action
                );
            }
        }

        return out;
    };

    const [output, dispatch] = useReducer(reducer, {
        weapon: undefined,
        showKills: true,
        showKillsGame: true,
        showPrecision: true,
        showIcon: true,
    });

    useEffect(() => {
        onChange(output);
    }, [output]);

    useEffect(() => {
        if (weapons && weapons.length) {
            dispatch({ type: WEAPON_UPDATED, payload: weapons[0] });
        }
    }, [weapons]);

    const weaponImageContainer = {
        width: "100%",
        alignItems: "flex-end",
    };

    let weaponIconUrl;
    let weaponName;

    if (output.weapon) {
        weaponIconUrl = output.weapon.data.collectionIcon;
        weaponName = output.weapon.data.name;
    }

    const rootStyle = {
        justifyContent: "space-between",
    };
    return (
        <div className="form_column overlay_tab_content" style={rootStyle}>
            <div className="form_column">
                <WeaponSelect
                    options={weapons}
                    selected={output.weapon}
                    disabled={disabled}
                    onChange={(d) =>
                        dispatch({ type: WEAPON_UPDATED, payload: d })
                    }
                />
                {/*
                <div className="form_column">
                    <div className="radio_container">
                        <input
                            type="checkbox"
                            disabled={disabled}
                            id="kills_cb"
                            checked={output.showKills}
                            onChange={(d) =>
                                dispatch({
                                    type: SHOW_KILLS_UPDATED,
                                    payload: d.target.checked,
                                })
                            }
                        />
                        <label htmlFor="kills_cb">Kills</label>
                    </div>
                    <div className="radio_container">
                        <input
                            type="checkbox"
                            disabled={disabled}
                            id="kills_game_cb"
                            checked={output.showKillsGame}
                            onChange={(d) =>
                                dispatch({
                                    type: SHOW_KILLS_GAME_UPDATED,
                                    payload: d.target.checked,
                                })
                            }
                        />
                        <label htmlFor="kills_game_cb">Kills / g</label>
                    </div>
                    <div className="radio_container">
                        <input
                            type="checkbox"
                            disabled={disabled}
                            id="precision_cb"
                            checked={output.showPrecision}
                            onChange={(d) =>
                                dispatch({
                                    type: SHOW_PRECISION_UPDATED,
                                    payload: d.target.checked,
                                })
                            }
                        />
                        <label htmlFor="precision_cb">Precision</label>
                    </div>
                    <div className="radio_container">
                        <input
                            type="checkbox"
                            disabled={disabled}
                            id="icon_cb"
                            checked={output.showIcon}
                            onChange={(d) =>
                                dispatch({
                                    type: SHOW_ICON_UPDATED,
                                    payload: d.target.checked,
                                })
                            }
                        />
                        <label htmlFor="icon_cb">Icon</label>
                    </div>
                </div>
                        */}
            </div>
            <div className="form_row" style={weaponImageContainer}>
                <RoundedImageView
                    width={64}
                    height={64}
                    image={weaponIconUrl}
                />

                <div className="subsection_header">{weaponName}</div>
            </div>
        </div>
    );
};

export default OverlayWeaponsConfigView;
