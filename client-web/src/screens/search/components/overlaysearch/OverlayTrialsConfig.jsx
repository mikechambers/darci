import React, { useEffect, useReducer } from "react";

const SHOW_PASSAGE_UPDATED = "SHOW_PASSAGE_UPDATED";
const SHOW_WEEKLY_FLAWLESS = "SHOW_WEEKLY_FLAWLESS";

const reducer = (state, action) => {
    let out = { ...state };

    switch (action.type) {
        case SHOW_PASSAGE_UPDATED: {
            out.showCardInfo = action.payload;
            break;
        }
        case SHOW_WEEKLY_FLAWLESS: {
            out.showWeeklyFlawlessCount = action.payload;
            break;
        }
        default: {
            console.log("OverlayTrialsConfigView : Unknown action : ", action);
        }
    }

    return out;
};

const OverlayTrialsConfigView = (props) => {
    const disabled = props.disabled;
    const onChange = props.onChange;

    const [output, dispatch] = useReducer(reducer, {
        showCardInfo: true,
        showWeeklyFlawlessCount: true,
    });

    useEffect(() => {
        onChange(output);
    }, [output]);

    return (
        <div className="form_column overlay_tab_content">
            <div className="radio_container">
                <input
                    disabled={disabled}
                    type="checkbox"
                    id="passage_cb"
                    checked={output.showCardInfo}
                    onChange={(d) =>
                        dispatch({
                            type: SHOW_PASSAGE_UPDATED,
                            payload: d.target.checked,
                        })
                    }
                />
                <label htmlFor="passage_cb">Show Current Card Info</label>
            </div>

            <div className="radio_container">
                <input
                    disabled={disabled}
                    type="checkbox"
                    id="weekly_flawless_cb"
                    checked={output.showWeeklyFlawlessCount}
                    onChange={(d) =>
                        dispatch({
                            type: SHOW_WEEKLY_FLAWLESS,
                            payload: d.target.checked,
                        })
                    }
                />
                <label htmlFor="weekly_flawless_cb">
                    Show Weekly Flawless Count
                </label>
            </div>
        </div>
    );
};

export default OverlayTrialsConfigView;
