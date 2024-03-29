import React, { useContext, useEffect, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Moment } from "shared";
import CharacterClassSelection from "shared/packages/enums/CharacterClassSelection";
import Mode from "shared/packages/enums/Mode";
import CharacterClassSelectionSelect from "../../../../components/CharacterClassSelectionSelect";
import ColorInput from "../../../../components/ColorInput";
import ModeSelect from "../../../../components/ModeSelect";
import MomentSelect from "../../../../components/MomentSelect";
import PlayerSelect from "../../../../components/PlayerSelect";
import RangeInput from "../../../../components/RangeInput";
import { GlobalContext } from "../../../../contexts/GlobalContext";
import Overlay from "../../../../core/enums/Overlay";
import { serialize } from "../../../../core/utils/data";
import OverlayHistoryConfigView from "./OverlayHistoryConfigView";
import OverlayLoadoutConfigView from "./OverlayLoadoutConfigView";
import OverlayStatsConfigView from "./OverlayStatsConfigView";
import OverlayWeaponsConfigView from "./OverlayWeaponsConfigView";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import OverlayTrialsConfigView from "./OverlayTrialsConfig";

const PLAYER_UPDATED = "PLAYER_UPDATED";
const MODE_UPDATED = "MODE_UPDATED";
const OVERLAY_TYPE_UPDATED = "OVERLAY_TYPE_UPDATED";
const CHARACTER_CLASS_UPDATED = "CHARACTER_CLASS_UPDATED";
const MOMENT_UPDATED = "MOMENT_UPDATED";
const WEAPON_UPDATED = "WEAPON_UPDATED";
const STATS_UPDATED = "STATS_UPDATED";
const SHOW_MODE_UPDATED = "SHOW_MODE_UPDATED";
const SHOW_MOMENT_UPDATED = "SHOW_MOMENT_UPDATED";
const FONT_COLOR_UPDATED = "FONT_COLOR_UPDATED";
const BACKGROUND_COLOR_UPDATED = "BACKGROUND_COLOR_UPDATED";
const BACKGROUND_TRANSPARENCY_UPDATED = "BACKGROUND_TRANSPARENCY_UPDATED";
const HISTORY_UPDATED = "HISTORY_UPDATED";
const LOADOUT_UPDATED = "LOADOUT_UPDATED";
const TRIALS_UPDATED = "TRIALS_UPDATED";

const overlayInfoStyle = {
    minWidth: 400,
};

const OverlaySearchView = (props) => {
    const { global, dispatchGlobal } = useContext(GlobalContext);
    const players = global.players;

    const navigate = useNavigate();
    const reducer = (state, action) => {
        let out = { ...state };

        switch (action.type) {
            case PLAYER_UPDATED: {
                out.player = action.payload;
                break;
            }
            case MODE_UPDATED: {
                out.mode = action.payload;
                break;
            }
            case OVERLAY_TYPE_UPDATED: {
                out.overlayType = action.payload;
                break;
            }
            case CHARACTER_CLASS_UPDATED: {
                out.characterClass = action.payload;
                break;
            }
            case MOMENT_UPDATED: {
                out.startMoment = action.payload;
                break;
            }
            case WEAPON_UPDATED: {
                out.weapon = action.payload;
                break;
            }
            case STATS_UPDATED: {
                out.stats = action.payload;
                break;
            }
            case SHOW_MODE_UPDATED: {
                out.showMode = action.payload;
                break;
            }
            case FONT_COLOR_UPDATED: {
                out.fontColor = action.payload;
                break;
            }
            case BACKGROUND_COLOR_UPDATED: {
                out.backgroundColor = action.payload;
                break;
            }
            case SHOW_MOMENT_UPDATED: {
                out.showMode = action.payload;
                break;
            }
            case BACKGROUND_TRANSPARENCY_UPDATED: {
                out.backgroundTransparency = action.payload;
                break;
            }
            case HISTORY_UPDATED: {
                out.history = action.payload;
                break;
            }
            case LOADOUT_UPDATED: {
                out.loadout = action.payload;
                break;
            }
            case TRIALS_UPDATED: {
                out.trials = action.payload;
                break;
            }
            default: {
                console.log("OverlaySearchView unknown action:", action);
            }
        }

        return out;
    };

    const [output, dispatch] = useReducer(reducer, {
        player: undefined,
        mode: Mode.ALL_PVP,
        overlayType: Overlay.LOADOUT,
        characterClass: CharacterClassSelection.ALL,
        startMoment: Moment.DAILY,
        weapon: undefined,
        stats: [],
        showMode: true,
        showMoment: true,
        fontColor: "#FFFFFF",
        backgroundColor: "#000000",
        backgroundTransparency: 75,
        history: undefined,
        loadout: undefined,
        trials: undefined,
    });

    const [url, setUrl] = useState("");

    useEffect(() => {
        if (players && players.length) {
            dispatch({ type: PLAYER_UPDATED, payload: players[0] });
        }
    }, [players]);

    useEffect(() => {
        if (!output.player) {
            return;
        }

        if (!output.weapon || !output.weapon.weapon) {
            return;
        }

        const u = `${window.location.origin}${createUrl()}`;

        setUrl(u);
    }, [output]);

    const createUrl = () => {
        //converts 0 to 100 to 2 digit hex
        const f = (n) => {
            n = Math.round(n * 2.55);

            let hex = n.toString(16);

            if (hex.length === 1) {
                hex = `${hex}${hex}`;
            }

            return hex;
        };

        const backgroundColor = `${output.backgroundColor}${f(
            output.backgroundTransparency
        )}`;

        let out = {
            backgroundColor: backgroundColor,
            fontColor: output.fontColor,
            overlayType: output.overlayType.type,
            showMode: output.showMode,
            showMoment: output.showMoment,
            stats: undefined,
            weapon: undefined,
        };

        switch (output.overlayType) {
            case Overlay.WEAPON: {
                out.weapon = {
                    id: output.weapon.weapon.data.id,
                    showKills: output.weapon.showKills,
                    showKillsGame: output.weapon.showKillsGame,
                    showPrecision: output.weapon.showPrecision,
                    showIcon: output.weapon.showIcon,
                };
                break;
            }
            case Overlay.STATS: {
                let s = output.stats.map((s) => s.type);
                out.stats = s;
                break;
            }
            case Overlay.HISTORY: {
                out.history = output.history;
                break;
            }
            case Overlay.LOADOUT: {
                out.loadout = output.loadout;
                break;
            }
            case Overlay.TRIALS: {
                out.trials = output.trials;
                break;
            }
            default: {
                console.log(
                    "OverlaySearchView unknown Overlay type.",
                    output.overlayType
                );
                return;
            }
        }

        let encoded = serialize(out);

        return `/overlay/${output.player.memberId}/${output.player.platformId}/${output.characterClass.type}/${output.mode.type}/${output.startMoment.type}/${encoded}/`;
    };

    const onClick = () => {
        let url = createUrl();

        navigate(url);
    };

    return (
        <div className="form_column">
            <div className="form_row">
                <PlayerSelect
                    label="player"
                    onChange={(d) =>
                        dispatch({ type: PLAYER_UPDATED, payload: d })
                    }
                    players={players}
                    selected={output.player}
                />
                <CharacterClassSelectionSelect
                    disabled={output.overlayType === Overlay.TRIALS}
                    label="class"
                    onChange={(d) =>
                        dispatch({ type: CHARACTER_CLASS_UPDATED, payload: d })
                    }
                    selected={output.characterClass}
                />

                <ModeSelect
                    disabled={output.overlayType === Overlay.TRIALS}
                    label="Mode"
                    onChange={(d) =>
                        dispatch({ type: MODE_UPDATED, payload: d })
                    }
                    selected={output.mode}
                />
                <MomentSelect
                    disabled={output.overlayType === Overlay.TRIALS}
                    label="Start Moment"
                    selected={output.startMoment}
                    onChange={(d) =>
                        dispatch({ type: MOMENT_UPDATED, payload: d })
                    }
                />
            </div>

            <fieldset className="form_column" style={overlayInfoStyle}>
                <legend>Info to Display</legend>

                <Tabs
                    forceRenderTabPanel={true}
                    onSelect={(index) => {
                        let type;

                        switch (index) {
                            case 0: {
                                type = Overlay.LOADOUT;
                                break;
                            }
                            case 1: {
                                type = Overlay.WEAPON;
                                break;
                            }
                            case 2: {
                                type = Overlay.STATS;
                                break;
                            }
                            case 3: {
                                type = Overlay.HISTORY;
                                break;
                            }
                            case 4: {
                                type = Overlay.TRIALS;
                                break;
                            }
                            default: {
                                console.log(
                                    "OverlaySearchView Unknown Tab index / type.",
                                    index
                                );
                            }
                        }

                        dispatch({
                            type: OVERLAY_TYPE_UPDATED,
                            payload: type,
                        });
                    }}
                >
                    <TabList>
                        <Tab>Loadout</Tab>
                        <Tab>Weapon</Tab>
                        <Tab>Stats</Tab>
                        <Tab>History</Tab>
                        <Tab>Trials</Tab>
                    </TabList>
                    <TabPanel>
                        <OverlayLoadoutConfigView
                            disabled={output.overlayType !== Overlay.LOADOUT}
                            onChange={(d) =>
                                dispatch({ type: LOADOUT_UPDATED, payload: d })
                            }
                        />
                    </TabPanel>
                    <TabPanel>
                        <OverlayWeaponsConfigView
                            onChange={(d) =>
                                dispatch({ type: WEAPON_UPDATED, payload: d })
                            }
                            disabled={output.overlayType !== Overlay.WEAPON}
                        />
                    </TabPanel>
                    <TabPanel>
                        <OverlayStatsConfigView
                            onChange={(d) =>
                                dispatch({ type: STATS_UPDATED, payload: d })
                            }
                            disabled={output.overlayType !== Overlay.STATS}
                        />
                    </TabPanel>
                    <TabPanel>
                        <OverlayHistoryConfigView
                            onChange={(d) =>
                                dispatch({ type: HISTORY_UPDATED, payload: d })
                            }
                            disabled={output.overlayType !== Overlay.HISTORY}
                        />
                    </TabPanel>
                    <TabPanel>
                        <OverlayTrialsConfigView
                            onChange={(d) =>
                                dispatch({ type: TRIALS_UPDATED, payload: d })
                            }
                            disabled={output.overlayType !== Overlay.TRIALS}
                        />
                    </TabPanel>
                </Tabs>
                {/*
                <div className="form_row">
                    <div className="radio_container">
                        <input
                            type="checkbox"
                            id="mode_cb"
                            name="mode_cb"
                            defaultChecked={output.showMode}
                            onClick={(e) =>
                                dispatch({
                                    type: SHOW_MODE_UPDATED,
                                    payload: e.target.checked,
                                })
                            }
                        />
                        <label htmlFor="mode_cb">Mode</label>
                    </div>
                    <div className="radio_container">
                        <input
                            type="checkbox"
                            id="mode_cb"
                            name="mode_cb"
                            defaultChecked={output.showMoment}
                            onClick={(e) =>
                                dispatch({
                                    type: SHOW_MOMENT_UPDATED,
                                    payload: e.target.checked,
                                })
                            }
                        />
                        <label htmlFor="mode_cb">Moment</label>
                    </div>
                </div>
                        */}

                <ColorInput
                    color={output.fontColor}
                    onChange={(e) =>
                        dispatch({
                            type: FONT_COLOR_UPDATED,
                            payload: e,
                        })
                    }
                    label="Text Color"
                />

                <fieldset className="form_column">
                    <legend>Background</legend>

                    <ColorInput
                        color={output.backgroundColor}
                        onChange={(e) =>
                            dispatch({
                                type: BACKGROUND_COLOR_UPDATED,
                                payload: e,
                            })
                        }
                        label="Color"
                    />

                    <RangeInput
                        min={0}
                        max={100}
                        value={output.backgroundTransparency}
                        onChange={(e) =>
                            dispatch({
                                type: BACKGROUND_TRANSPARENCY_UPDATED,
                                payload: e,
                            })
                        }
                        label="Transparency"
                    />
                </fieldset>
            </fieldset>

            <textarea
                rows="5"
                cols="10"
                autoComplete="off"
                readOnly={true}
                value={url}
                id="url-area"
            />

            <div className="form_row">
                <button
                    onClick={() =>
                        navigator.clipboard.writeText(
                            document.getElementById("url-area").value
                        )
                    }
                >
                    Copy
                </button>
                <button onClick={onClick}>Load</button>
            </div>
        </div>
    );
};

export default OverlaySearchView;
