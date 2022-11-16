import React, { useContext, useEffect, useState } from "react";
import { CharacterClassSelection, Mode, OrderBy } from "shared";
import CharacterClassSelectionSelect from "../../../components/CharacterClassSelectionSelect";
import ModeSelect from "../../../components/ModeSelect";
import PlayerSelect from "../../../components/PlayerSelect";
import { GlobalContext } from "../../../contexts/GlobalContext";
import { reducer } from "../../../core/utils/data";
import PeriodSearchConfigView from "./PeriodSearchConfigView";

const formContainerStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "var(--form-section-gap)",
};

const formSectionStyle = {
    display: "flex",
    gap: "var(--form-section-gap)",
};

const PlayerCompareConfigView = (props) => {
    const label = props.label;
    const onChange = props.onChange;

    const { global, dispatchGlobal } = useContext(GlobalContext);
    const players = global.players;

    const [output, setOutput] = useState({
        player: undefined,
        mode: Mode.ALL_PVP,
        period: undefined,
        characterClass: CharacterClassSelection.ALL,
    });

    useEffect(() => {
        if (players && players.length) {
            let s = reducer(output, "player", players[0]);
            setOutput(s);
        }
    }, [players]);

    useEffect(() => {
        onChange(output);
    }, [output]);

    const onItemChange = function (type, data) {
        let s = reducer(output, type, data);
        setOutput(s);
    };

    return (
        <fieldset style={formContainerStyle}>
            <legend>{label}</legend>
            <div style={formSectionStyle}>
                <PlayerSelect
                    label="player"
                    onChange={(d) => onItemChange("player", d)}
                    players={players}
                />
                <CharacterClassSelectionSelect
                    label="class"
                    onChange={(d) => onItemChange("characterClass", d)}
                    selected={output.characterClass}
                />
            </div>

            <ModeSelect
                label="Mode"
                onChange={(d) => onItemChange("mode", d)}
                selected={output.mode}
            />
            <PeriodSearchConfigView
                onChange={(d) => onItemChange("period", d)}
            />
        </fieldset>
    );
};

export default PlayerCompareConfigView;
