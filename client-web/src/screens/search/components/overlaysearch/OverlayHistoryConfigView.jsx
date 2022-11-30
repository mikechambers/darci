import React, { useEffect, useReducer } from "react";
import RangeInput from "../../../../components/RangeInput";

const COUNT_UPDATED = "COUNT_UPDATED";
const SHOW_TITLE_UPDATED = "SHOW_TITLE_UPDATED";

const OverlayHistoryConfigView = (props) => {
    const onChange = props.onChange;
    const disabled = props.disabled;

    const reducer = (state, action) => {
        let out = { ...state };

        switch (action.type) {
            case COUNT_UPDATED: {
                out.count = action.payload;
                break;
            }
            case SHOW_TITLE_UPDATED: {
                out.showTitle = action.payload;
                break;
            }
            default: {
                console.log(
                    "OverlayHistoryConfigView : Unknown action : ",
                    action
                );
            }
        }

        return out;
    };

    const [output, dispatch] = useReducer(reducer, {
        count: 10,
        showTitle: true,
    });

    useEffect(() => {
        onChange(output);
    }, [output]);

    return (
        <fieldset className="form_column">
            <legend>Game History</legend>

            <RangeInput
                min={1}
                max={25}
                step={1}
                value={output.count}
                onChange={(d) =>
                    dispatch({
                        type: COUNT_UPDATED,
                        payload: d,
                    })
                }
                label="Games"
                disabled={disabled}
            />
            <div className="form_column">
                <div className="radio_container">
                    <input
                        disabled={disabled}
                        type="checkbox"
                        id="show_title_cb"
                        checked={output.showTitle}
                        onChange={(d) =>
                            dispatch({
                                type: SHOW_TITLE_UPDATED,
                                payload: d.target.checked,
                            })
                        }
                    />
                    <label htmlFor="show_title_cb" className="cb_label">
                        Display Title
                    </label>
                </div>
            </div>
        </fieldset>
    );
};

export default OverlayHistoryConfigView;
