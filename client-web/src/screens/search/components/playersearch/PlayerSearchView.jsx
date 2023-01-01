import React from "react";
import { useContext, useEffect, useState } from "react";
import { Mode, OrderBy } from "shared";
import CharacterClassSelectionSelect from "../../../../components/CharacterClassSelectionSelect";
import ModeSelect from "../../../../components/ModeSelect";
import OrderBySelect from "../../../../components/OrderBySelect";
import PlayerSelect from "../../../../components/PlayerSelect";

import { GlobalContext } from "../../../../contexts/GlobalContext";
import { createPlayerUrl } from "../../../../core/utils";
import { useNavigate } from "react-router-dom";
import CharacterClassSelection from "shared/packages/enums/CharacterClassSelection";
import PeriodSearchConfigView from "../PeriodSearchConfigView";
import FormValidationMessageView from "../FormValidationMessageView";

const formContainerStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "var(--form-section-gap)",
};

const formSectionStyle = {
    display: "flex",
    gap: "var(--form-section-gap)",
};

const PlayerSearchView = (props) => {
    const { global, dispatchGlobal } = useContext(GlobalContext);
    const players = global.players;

    const [orderBy, setOrderBy] = useState(OrderBy.PERIOD);
    const [player, setPlayer] = useState();
    const [characterClass, setCharacterClass] = useState(
        CharacterClassSelection.ALL
    );
    const [mode, setMode] = useState(Mode.ALL_PVP);

    const [period, setPeriod] = useState();

    const [validationMessages, setValidationMessages] = useState([]);

    let navigate = useNavigate();

    useEffect(() => {
        if (players && players.length) {
            setPlayer(players[0]);
        }
    }, [players]);

    const onPeriodChange = function (p) {
        let msgs = p.isValid ? [] : [p.validationMessage];

        if (msgs.join("") !== validationMessages.join("")) {
            setValidationMessages(msgs);
        }

        setPeriod(p);
    };

    const onPlayerSelectChange = function (p) {
        setPlayer(p);
    };

    const onClassSelectChange = function (c) {
        setCharacterClass(c);
    };

    const onModeSelectChange = function (m) {
        setMode(m);
    };

    const onOrderBySelectChange = function (m) {
        setOrderBy(m);
    };

    const validate = function () {
        return period.isValid;
    };

    const onSearchClick = function () {
        if (!validate()) {
            return;
        }
        let url = createPlayerUrl({
            player,
            characterClass,
            mode,
            periodType: period.periodType,
            startMoment: period.startMoment,
            endMoment: period.endMoment,
            season: period.season,
            orderBy,
        });

        navigate(url);
    };

    return (
        <div style={formContainerStyle}>
            <div style={formSectionStyle}>
                <PlayerSelect
                    label="player"
                    onChange={onPlayerSelectChange}
                    players={players}
                />
                <CharacterClassSelectionSelect
                    label="class"
                    onChange={onClassSelectChange}
                    selected={CharacterClassSelection.ALL}
                />
            </div>

            <ModeSelect
                label="Mode"
                onChange={onModeSelectChange}
                selected={Mode.ALL_PVP}
            />
            <PeriodSearchConfigView onChange={onPeriodChange} />

            <div style={formSectionStyle}>
                <OrderBySelect
                    label="Sort By"
                    selected={orderBy}
                    onChange={onOrderBySelectChange}
                />
            </div>
            <button onClick={onSearchClick}>View</button>
            <FormValidationMessageView messages={validationMessages} />
        </div>
    );
};

export default PlayerSearchView;
