import React, { useEffect, useReducer } from "react";

const SHOW_PRIMARY_UPDATED = "SHOW_PRIMARY_UPDATED";
const SHOW_PRIMARY_SECOND_UPDATED = "SHOW_PRIMARY_SECOND_UPDATED";
const SHOW_SPECIAL_UPDATED = "SHOW_SPECIAL_UPDATED";
const SHOW_SPECIAL_SECOND_UPDATED = "SHOW_SPECIAL_SECOND_UPDATED";
const SHOW_HEAVY_UPDATED = "SHOW_HEAVY_UPDATED";

const OverlayLoadoutConfigView = (props) => {
    const disabled = props.disabled;
    const onChange = props.onChange;

    const reducer = (state, action) => {
        let out = { ...state };

        switch (action.type) {
            case SHOW_PRIMARY_UPDATED: {
                out.showPrimary = action.payload;
                break;
            }
            case SHOW_SPECIAL_UPDATED: {
                out.showSpecial = action.payload;
                break;
            }
            case SHOW_PRIMARY_SECOND_UPDATED: {
                out.showSecondPrimary = action.payload;
                break;
            }
            case SHOW_SPECIAL_SECOND_UPDATED: {
                out.showSecondSpecial = action.payload;
                break;
            }
            case SHOW_HEAVY_UPDATED: {
                out.showHeavy = action.payload;
                break;
            }
            default: {
                console.log(
                    "OverlayLoadoutConfigView : Unknown action : ",
                    action
                );
            }
        }

        return out;
    };

    const [output, dispatch] = useReducer(reducer, {
        showPrimary: true,
        showSpecial: true,
        showSecondPrimary: false,
        showSecondSpecial: false,
        showHeavy: false,
    });

    useEffect(() => {
        onChange(output);
    }, [output]);

    return (
        <fieldset>
            <legend>Loadout</legend>
            <div className="form_column">
                <div className="radio_container">
                    <input
                        disabled={disabled}
                        type="checkbox"
                        id="primary_cb"
                        checked={output.showPrimary}
                        onChange={(d) =>
                            dispatch({
                                type: SHOW_PRIMARY_UPDATED,
                                payload: d.target.checked,
                            })
                        }
                    />
                    <label htmlFor="primary_cb">Top Primary Weapon</label>
                </div>
                <div className="radio_container">
                    <input
                        disabled={disabled}
                        type="checkbox"
                        id="primary_second_cb"
                        checked={output.showSecondPrimary}
                        onChange={(d) =>
                            dispatch({
                                type: SHOW_PRIMARY_SECOND_UPDATED,
                                payload: d.target.checked,
                            })
                        }
                    />
                    <label htmlFor="primary_second_cb">
                        Second Primary Weapon
                    </label>
                </div>
                <div className="radio_container">
                    <input
                        disabled={disabled}
                        type="checkbox"
                        id="special_cb"
                        checked={output.showSpecial}
                        onChange={(d) =>
                            dispatch({
                                type: SHOW_SPECIAL_UPDATED,
                                payload: d.target.checked,
                            })
                        }
                    />
                    <label htmlFor="special_cb">Top Special Weapon</label>
                </div>
                <div className="radio_container">
                    <input
                        disabled={disabled}
                        type="checkbox"
                        id="special_second_cb"
                        checked={output.showSecondSpecial}
                        onChange={(d) =>
                            dispatch({
                                type: SHOW_SPECIAL_SECOND_UPDATED,
                                payload: d.target.checked,
                            })
                        }
                    />
                    <label htmlFor="special_second_cb">
                        Second Special Weapon
                    </label>
                </div>
                <div className="radio_container">
                    <input
                        disabled={disabled}
                        type="checkbox"
                        id="heavy_cb"
                        checked={output.showHeavy}
                        onChange={(d) =>
                            dispatch({
                                type: SHOW_HEAVY_UPDATED,
                                payload: d.target.checked,
                            })
                        }
                    />
                    <label htmlFor="heavy_cb">Top Heavy Weapon</label>
                </div>
            </div>
        </fieldset>
    );
};

export default OverlayLoadoutConfigView;
