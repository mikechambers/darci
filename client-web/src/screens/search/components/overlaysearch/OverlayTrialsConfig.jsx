import React, { useEffect, useReducer } from "react";

const SHOW_PASSAGE_UPDATED = "SHOW_PASSAGE_UPDATED";
const SHOW_WINS_UPDATED = "SHOW_WINS_UPDATED";
const SHOW_MERCY_UPDATED = "SHOW_MERCY_UPDATED";
const SHOW_WEEKLY_FLAWLESS = "SHOW_WEEKLY_FLAWLESS";

const reducer = (state, action) => {
    let out = { ...state };

    switch (action.type) {
        case SHOW_PASSAGE_UPDATED: {
            out.showPassageName = action.payload;
            break;
        }
        case SHOW_WINS_UPDATED: {
            out.showPassageWins = action.payload;
            break;
        }
        case SHOW_MERCY_UPDATED: {
            out.showHasMercy = action.payload;
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
        showPassageName: true,
        showPassageWins: true,
        showHasMercy: true,
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
                    checked={output.showPassageName}
                    onChange={(d) =>
                        dispatch({
                            type: SHOW_PASSAGE_UPDATED,
                            payload: d.target.checked,
                        })
                    }
                />
                <label htmlFor="passage_cb">Show Current Passage</label>
            </div>
            <div className="radio_container">
                <input
                    disabled={disabled}
                    type="checkbox"
                    id="wins_cb"
                    checked={output.showPassageWins}
                    onChange={(d) =>
                        dispatch({
                            type: SHOW_WINS_UPDATED,
                            payload: d.target.checked,
                        })
                    }
                />
                <label htmlFor="wins_cb">Show Passage Wins</label>
            </div>
            <div className="radio_container">
                <input
                    disabled={disabled}
                    type="checkbox"
                    id="mercy_cb"
                    checked={output.showHasMercy}
                    onChange={(d) =>
                        dispatch({
                            type: SHOW_MERCY_UPDATED,
                            payload: d.target.checked,
                        })
                    }
                />
                <label htmlFor="mercy_cb">Show Mercy Status</label>
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
