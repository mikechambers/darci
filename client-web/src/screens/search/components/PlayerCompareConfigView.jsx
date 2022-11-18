import { useContext, useEffect, useReducer, useState } from "react";
import { Mode } from "shared";
import CharacterClassSelection from "shared/packages/enums/CharacterClassSelection";
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

    const reducer = (state, action) => {
        let out = { ...state };
        out[action.type] = action.payload;
        return out;
    };

    const [output, dispatch] = useReducer(reducer, {
        player: undefined,
        mode: Mode.ALL_PVP,
        period: undefined,
        characterClass: CharacterClassSelection.ALL,
    });

    useEffect(() => {
        if (players && players.length) {
            dispatch({ type: "player", payload: players[0] });
        }
    }, [players]);

    useEffect(() => {
        onChange(output);
    }, [output]);

    return (
        <fieldset style={formContainerStyle}>
            <legend>{label}</legend>
            <div style={formSectionStyle}>
                <PlayerSelect
                    label="player"
                    onChange={(d) => dispatch({ type: "player", payload: d })}
                    players={players}
                />
                <CharacterClassSelectionSelect
                    label="class"
                    onChange={(d) =>
                        dispatch({ type: "characterClass", payload: d })
                    }
                    selected={output.characterClass}
                />
            </div>

            <ModeSelect
                label="Mode"
                onChange={(d) => dispatch({ type: "mode", payload: d })}
                selected={output.mode}
            />
            <PeriodSearchConfigView
                onChange={(d) => dispatch({ type: "period", payload: d })}
            />
        </fieldset>
    );
};

export default PlayerCompareConfigView;
