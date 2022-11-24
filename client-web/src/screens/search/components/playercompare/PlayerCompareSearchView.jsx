import React, { useState } from "react";
import FormValidationMessageView from "./../FormValidationMessageView";
import PlayerCompareConfigView from "./PlayerCompareConfigView";

import { Buffer } from "buffer";
import { useNavigate } from "react-router-dom";
import { serialize } from "../../../../core/utils/data";

const rootStyle = {
    display: "flex",
    gap: "var(--form-section-gap)",
    flexDirection: "column",
};

const configContainerStyle = {
    display: "flex",
    gap: "var(--form-section-gap)",
};

const buttonContainerStyle = {
    display: "flex",
    justifyContent: "flex-end",
};

const PlayerCompareSearchView = (props) => {
    const [validationMessages, setValidationMessages] = useState([]);
    const [item1, setItem1] = useState();
    const [item2, setItem2] = useState();

    const navigate = useNavigate();

    const onChange = function (data, func) {
        let msgs = data.isValid ? [] : [data.validationMessage];

        if (msgs.join("") !== validationMessages.join("")) {
            setValidationMessages(msgs);
        }

        func(data);
    };

    const onClick = function () {
        let data = [];

        for (const d of [item1, item2]) {
            data.push({
                memberId: d.player.memberId,
                characterClass: d.characterClass.type,
                mode: d.mode.type,
                period: {
                    type: d.period.periodType,
                    startMoment: d.period.startMoment.type,
                    endMoment: d.period.endMoment.type,
                    season: d.period.season.type,
                },
            });
        }

        let encoded = serialize(data);
        navigate(`/compare/${encoded}/`);
    };

    return (
        <div style={rootStyle}>
            <div style={configContainerStyle}>
                <PlayerCompareConfigView
                    label="First Item"
                    onChange={(e) => onChange(e, setItem1)}
                />
                <PlayerCompareConfigView
                    label="Second Item"
                    onChange={(e) => onChange(e, setItem2)}
                />
            </div>
            <div style={buttonContainerStyle}>
                <button onClick={onClick}>Compare</button>
            </div>
            <FormValidationMessageView messages={validationMessages} />
        </div>
    );
};

export default PlayerCompareSearchView;
