import React, { useEffect, useReducer } from "react";
import Stat from "../../../core/enums/Stat";
import StatSelect from "./StatSelect";

const statRowStyle = {
    columnGap: "2px",
    alignItems: "center",
};
const OverlayStatsConfigView = (props) => {
    const disabled = props.disabled;
    const onChange = props.onChange;

    const reducer = (state, action) => {
        let out = { ...state };
        let payload = action.payload;

        switch (action.type) {
            case "stat": {
                out.stats[payload.index].stat = payload.stat;
                break;
            }
            case "checked": {
                out.stats[payload.index].checked = payload.checked;
                break;
            }
            default: {
                console.log(
                    "OverlayStatsConfigView : Unknown action : ",
                    action
                );
            }
        }

        return out;
    };

    const [output, dispatch] = useReducer(reducer, {
        stats: [
            { checked: true, stat: Stat.WIN_PERCENT },
            { checked: true, stat: Stat.DEFEATS },
            { checked: true, stat: Stat.KD },
            { checked: true, stat: Stat.EFFICIENCY },
            { checked: false, stat: Stat.DEATHS },
        ],
    });

    useEffect(() => {
        let out = output.stats
            .filter((item) => item.checked)
            .map((item) => item.stat);
        onChange(out);
    }, [output]);

    return (
        <fieldset className="form_column">
            <legend>Stats</legend>
            {output.stats.map((item, index) => {
                return (
                    <div key={index} className="form_row" style={statRowStyle}>
                        <input
                            type="checkbox"
                            id="mode_cb"
                            name="mode_cb"
                            disabled={disabled}
                            checked={item.checked}
                            onChange={(d) =>
                                dispatch({
                                    type: "checked",
                                    payload: {
                                        checked: d.target.checked,
                                        index: index,
                                    },
                                })
                            }
                        />
                        <StatSelect
                            disabled={disabled}
                            label={`Stat ${index + 1}`}
                            selected={item.stat}
                            onChange={(d) =>
                                dispatch({
                                    type: "stat",
                                    payload: {
                                        stat: d,
                                        index: index,
                                    },
                                })
                            }
                        />
                    </div>
                );
            })}
        </fieldset>
    );
};

export default OverlayStatsConfigView;
