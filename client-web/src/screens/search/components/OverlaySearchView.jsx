import React, { useContext, useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { Moment } from "shared";
import CharacterClassSelection from "shared/packages/enums/CharacterClassSelection";
import Mode from "shared/packages/enums/Mode";
import CharacterClassSelectionSelect from "../../../components/CharacterClassSelectionSelect";
import ModeSelect from "../../../components/ModeSelect";
import MomentSelect from "../../../components/MomentSelect";
import PlayerSelect from "../../../components/PlayerSelect";
import { GlobalContext } from "../../../contexts/GlobalContext";
import Overlay from "../../../core/enums/Overlay";
import Stat from "../../../core/enums/Stat";
import { serialize } from "../../../core/utils/data";
import OverlaySelect from "./OverlaySelect";
import OverlayStatsConfigView from "./OverlayStatsConfigView";
import OverlayWeaponsConfigView from "./OverlayWeaponsConfigView";

const OverlaySearchView = (props) => {
    const { global, dispatchGlobal } = useContext(GlobalContext);
    const players = global.players;

    const navigate = useNavigate();
    const reducer = (state, action) => {
        let out = { ...state };
        console.log(action);
        switch (action.type) {
            case "stats": {
                break;
            }
        }

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
        stats: [],
    });

    useEffect(() => {
        if (players && players.length) {
            dispatch({ type: "player", payload: players[0] });
        }
    }, [players]);

    const onClick = () => {
        console.log(output);
        let encoded;
        if (output.overlayType === Overlay.WEAPON) {
            encoded = serialize({
                overlayType: Overlay.WEAPON,
                weapon: output.weapon.data.id,
            });

            if (!encoded) {
                return;
            }

            navigate(
                `/overlay/${output.player.memberId}/${output.player.platformId}/${output.characterClass.type}/${output.mode.type}/${output.startMoment.type}/${encoded}/`
            );
        }
    };

    return (
        <div className="form_column">
            <div className="form_row">
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

            <fieldset className="form_column">
                <legend>Display</legend>

                <div className="form_row">
                    <div className="radio_container">
                        <input type="checkbox" id="mode_cb" name="mode_cb" />
                        <label htmlFor="mode_cb">Mode</label>
                    </div>
                    <div className="radio_container">
                        <input type="checkbox" id="mode_cb" name="mode_cb" />
                        <label htmlFor="mode_cb">Moment</label>
                    </div>
                </div>

                <OverlaySelect
                    selected={output.overlayType}
                    onChange={(d) =>
                        dispatch({ type: "overlayType", payload: d })
                    }
                />

                <div className="form_row">
                    <OverlayWeaponsConfigView
                        onChange={(d) =>
                            dispatch({ type: "weapon", payload: d })
                        }
                        disabled={output.overlayType !== Overlay.WEAPON}
                    />

                    <OverlayStatsConfigView
                        onChange={(d) =>
                            dispatch({ type: "stats", payload: d })
                        }
                        disabled={output.overlayType !== Overlay.STATS}
                    />
                </div>
            </fieldset>

            <button onClick={onClick}>Load</button>
        </div>
    );
};

export default OverlaySearchView;
