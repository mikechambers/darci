import React, { useContext, useEffect, useReducer } from "react";
import { GlobalContext } from "../../../contexts/GlobalContext";
import WeaponSelect from "./WeaponSelect";
import RoundedImageView from "../../../components/RoundedImageView";

const WEAPON = "weapon";
const SHOW_KILLS = "showKills";
const SHOW_KILLS_GAME = "showKillsGame";
const SHOW_PRECISION = "showPrecision";

const OverlayWeaponsConfigView = (props) => {
    const disabled = props.disabled;
    const onChange = props.onChange;

    const { global, dispatchGlobal } = useContext(GlobalContext);
    const weapons = global.weapons;

    const reducer = (state, action) => {
        let out = { ...state };

        switch (action.type) {
            case WEAPON: {
                out.weapon = action.payload;
                break;
            }
            case SHOW_KILLS: {
                out.showKills = action.payload;
                break;
            }
            case SHOW_KILLS_GAME: {
                out.showKillsGame = action.payload;
                break;
            }
            case SHOW_PRECISION: {
                out.showPrecision = action.payload;
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
    });

    useEffect(() => {
        onChange(output);
    }, [output]);

    useEffect(() => {
        if (weapons && weapons.length) {
            dispatch({ type: "weapon", payload: weapons[0] });
        }
    }, [weapons]);

    return (
        <fieldset>
            <legend>Weapon</legend>
            <WeaponSelect
                options={weapons}
                selected={output.weapon}
                disabled={disabled}
                onChange={(d) => dispatch({ type: WEAPON, payload: d })}
            />
            <div className="radio_container">
                <input
                    type="checkbox"
                    id="kills_cb"
                    checked={output.showKills}
                    onChange={(d) =>
                        dispatch({
                            type: SHOW_KILLS,
                            payload: d.target.checked,
                        })
                    }
                />
                <label htmlFor="kills_cb">Kills</label>
            </div>
            <div className="radio_container">
                <input
                    type="checkbox"
                    id="kills_game_cb"
                    checked={output.showKillsGame}
                    onChange={(d) =>
                        dispatch({
                            type: SHOW_KILLS_GAME,
                            payload: d.target.checked,
                        })
                    }
                />
                <label htmlFor="kills_game_cb">Kills / g</label>
            </div>
            <div className="radio_container">
                <input
                    type="checkbox"
                    id="precision_cb"
                    checked={output.showPrecision}
                    onChange={(d) =>
                        dispatch({
                            type: SHOW_PRECISION,
                            payload: d.target.checked,
                        })
                    }
                />
                <label htmlFor="precision_cb">Precision</label>
            </div>
            <div>
                <RoundedImageView width={64} height={64} />
            </div>
        </fieldset>
    );
};

export default OverlayWeaponsConfigView;
