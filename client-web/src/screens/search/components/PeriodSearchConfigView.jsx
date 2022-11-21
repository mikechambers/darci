import React, { useEffect, useState } from "react";
import { Moment } from "shared";
import { CURRENT_SEASON, MOMENT_TYPE, SEASON_TYPE } from "../../../core/consts";
import MomentSelect from "../../../components/MomentSelect";
import SeasonSelect from "../../../components/SeasonSelect";
import { reducer } from "../../../core/utils/data";
import { getRandomInt } from "../../../core/utils/math";

const PeriodSearchConfigView = (props) => {
    const onChange = props.onChange;

    const moment_radio_id = "moment_radio" + getRandomInt(0, 1000000);
    const season_radio_id = "season_radio" + getRandomInt(0, 1000000);
    const period_group_name = "period" + getRandomInt(0, 1000000);

    const [output, setOutput] = useState({
        startMoment: CURRENT_SEASON.startMoment,
        endMoment: Moment.NOW,
        season: CURRENT_SEASON,
        periodType: MOMENT_TYPE,
        isValid: true,
        validationMessage: undefined,
    });

    const isValid = function (periodType, startMoment, endMoment) {
        //only need to validate right now if period is set to MOMENT_TYPE
        if (periodType === SEASON_TYPE) {
            return true;
        }
        return endMoment.getDate() > startMoment.getDate();
    };

    const onItemChange = function (type, data) {
        let s = reducer(output, type, data);

        if (
            type === "startMoment" ||
            type === "endMoment" ||
            type === "periodType"
        ) {
            let valid = isValid(s.periodType, s.startMoment, s.endMoment);

            s = reducer(s, "isValid", valid);
            s = reducer(
                s,
                "validationMessage",
                !valid ? "Start Moment must be before End Moment" : undefined
            );
        }

        setOutput(s);
    };

    useEffect(() => {
        onChange(output);
    }, [output]);

    return (
        <fieldset className="form_column">
            <legend>Period</legend>
            <div className="form_row">
                <div className="radio_container">
                    <input
                        type="radio"
                        value={MOMENT_TYPE}
                        name={period_group_name}
                        id={moment_radio_id}
                        onClick={(e) => {
                            onItemChange("periodType", e.target.value);
                        }}
                        defaultChecked={output.periodType === MOMENT_TYPE}
                    />
                    <label htmlFor={moment_radio_id}>Moments</label>
                </div>
                <div className="radio_container">
                    <input
                        type="radio"
                        value={SEASON_TYPE}
                        name={period_group_name}
                        id={season_radio_id}
                        onClick={(e) => {
                            onItemChange("periodType", e.target.value);
                        }}
                        defaultChecked={output.periodType === SEASON_TYPE}
                    />
                    <label htmlFor={season_radio_id}>Season</label>
                </div>
            </div>
            <div className="form_row">
                <MomentSelect
                    label="Start Moment"
                    onChange={(e) => {
                        onItemChange("startMoment", e);
                    }}
                    selected={output.startMoment}
                    disabled={output.periodType !== MOMENT_TYPE}
                />
                <MomentSelect
                    label="End Moment"
                    onChange={(e) => {
                        onItemChange("endMoment", e);
                    }}
                    selected={output.endMoment}
                    disabled={output.periodType !== MOMENT_TYPE}
                />
            </div>

            <div>
                <SeasonSelect
                    label="Season"
                    selected={output.season}
                    onChange={(e) => {
                        onItemChange("season", e);
                    }}
                    disabled={output.periodType !== SEASON_TYPE}
                />
            </div>
        </fieldset>
    );
};

export default PeriodSearchConfigView;
