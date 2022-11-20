import React, { useContext, useReducer } from "react";
import { Moment } from "shared";
import CharacterClassSelection from "shared/packages/enums/CharacterClassSelection";
import Mode from "shared/packages/enums/Mode";
import CharacterClassSelectionSelect from "../../../components/CharacterClassSelectionSelect";
import ModeSelect from "../../../components/ModeSelect";
import MomentSelect from "../../../components/MomentSelect";
import PlayerSelect from "../../../components/PlayerSelect";
import { GlobalContext } from "../../../contexts/GlobalContext";
import Overlay from "../../../core/enums/Overlay";
import OverlaySelect from "./OverlaySelect";
import WeaponSelect from "./WeaponSelect";

const formContainerStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "var(--form-section-gap)",
};

const formSectionStyle = {
    display: "flex",
    gap: "var(--form-section-gap)",
};

const OverlaySearchView = (props) => {
    const { global, dispatchGlobal } = useContext(GlobalContext);
    const players = global.players;

    const reducer = (state, action) => {
        console.log(action);
        let out = { ...state };
        out[action.type] = action.payload;
        return out;
    };

    const [output, dispatch] = useReducer(reducer, {
        player: undefined,
        mode: Mode.ALL_PVP,
        overlayType: Overlay.WEAPON,
        characterClass: CharacterClassSelection.ALL,
        startMoment: Moment.DAILY,
        weapon: undefined,
    });

    const onClick = () => {
        if (output.overlayType === Overlay.WEAPON) {
            console.log(output.weapon);
        }
    };

    return (
        <div style={formContainerStyle}>
            <legend></legend>
            <div style={formSectionStyle}>
                <PlayerSelect
                    label="player"
                    onChange={(d) => dispatch({ type: "player", payload: d })}
                    players={players}
                    selected={output.player}
                />
                <CharacterClassSelectionSelect
                    label="class"
                    onChange={(d) =>
                        dispatch({ type: "characterClass", payload: d })
                    }
                    selected={output.characterClass}
                />

                <ModeSelect
                    label="Mode"
                    onChange={(d) => dispatch({ type: "mode", payload: d })}
                    selected={output.mode}
                />
                <MomentSelect
                    label="Start Moment"
                    selected={output.startMoment}
                    onChange={(d) =>
                        dispatch({ type: "startMoment", payload: d })
                    }
                />
            </div>
            <OverlaySelect
                selected={output.overlayType}
                onChange={(d) => dispatch({ type: "overlayType", payload: d })}
            />
            <fieldset>
                <legend>Weapon</legend>
                <WeaponSelect
                    selected={output.weapon}
                    disabled={output.overlayType !== Overlay.WEAPON}
                    onChange={(d) => dispatch({ type: "weapon", payload: d })}
                />
            </fieldset>
            <button onClick={onClick}>Load</button>
        </div>
    );
};

export default OverlaySearchView;
