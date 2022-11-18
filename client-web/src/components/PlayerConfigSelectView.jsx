/* MIT License
 *
 * Copyright (c) 2022 Mike Chambers
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import { CharacterClassSelection, Mode, Moment } from "shared";
import React, { useContext, useEffect } from "react";
import { useLocalStorage } from "@mantine/hooks";
import Player from "../core/data/Player";
import CharacterClassSelectionSelect from "./CharacterClassSelectionSelect";
import ModeSelect from "./ModeSelect";
import MomentSelect from "./MomentSelect";
import PlayerSelect from "./PlayerSelect";
import { GlobalContext } from "../contexts/GlobalContext";
import { createPlayerUrl } from "../core/utils";
import { MOMENT_TYPE } from "../core/consts";

const PlayerConfigSelectView = (props) => {
    const style = props.style;
    const onUpdate = props.onUpdate;
    const maxLabelLength = props.maxLabelLength ? props.maxLabelLength : 100;

    const { global, dispatchGlobal } = useContext(GlobalContext);
    const players = global.players;

    const [characterClass, setCharacterClassSelection] = useLocalStorage({
        key: "config-class-type",
        defaultValue: CharacterClassSelection.ALL,
        serialize: (value) => {
            return value.type;
        },
        deserialize: (localStorageValue) => {
            if (!localStorageValue) {
                return;
            }
            return CharacterClassSelection.fromType(localStorageValue);
        },
    });

    const [mode, setMode] = useLocalStorage({
        key: "config-mode",
        defaultValue: Mode.ALL_PVP,
        serialize: (value) => {
            return value.type;
        },
        deserialize: (localStorageValue) => {
            if (!localStorageValue) {
                return;
            }
            return Mode.fromType(localStorageValue);
        },
    });

    const [moment, setMoment] = useLocalStorage({
        key: "config-moment",
        defaultValue: Moment.WEEK,
        serialize: (value) => {
            return value.type;
        },
        deserialize: (localStorageValue) => {
            if (!localStorageValue) {
                return;
            }
            return Moment.fromType(localStorageValue);
        },
    });

    const [player, setPlayer] = useLocalStorage({
        key: "config-player",

        //this is a hack, since we cant have it return undefined
        defaultValue: undefined,
        serialize: (value) => {
            return value.toJson();
        },
        deserialize: (localStorageValue) => {
            if (!localStorageValue) {
                return undefined;
            }

            return Player.fromJson(localStorageValue);
        },
    });

    useEffect(() => {
        if (players && players.length) {
            if (!player) {
                setPlayer(players[0]);
            }
        }
    }, [players]);

    let classOnChange = function (e) {
        setCharacterClassSelection(e);
    };

    let modeOnChange = function (e) {
        setMode(e);
    };

    let momentOnChange = function (e) {
        setMoment(e);
    };

    let playerOnChange = function (e) {
        setPlayer(e);
    };

    let onClick = function (e) {
        let url = createPlayerUrl({
            player: player,
            characterClass,
            mode,
            periodType: MOMENT_TYPE,
            startMoment: moment,
        });

        if (onClick) {
            onUpdate(url);
        }
    };

    let s = {
        ...style,
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
        columnGap: "6px",
        justifyContent: "flex-start",
    };

    return (
        <div style={s}>
            <PlayerSelect
                players={players}
                onChange={playerOnChange}
                selected={player}
                maxLabelLength={maxLabelLength}
            />

            <CharacterClassSelectionSelect
                onChange={classOnChange}
                selected={characterClass}
                maxLabelLength={maxLabelLength}
            />
            <ModeSelect
                onChange={modeOnChange}
                selected={mode}
                maxLabelLength={maxLabelLength}
            />
            <MomentSelect
                onChange={momentOnChange}
                selected={moment}
                maxLabelLength={maxLabelLength}
            />

            <button onClick={onClick}>View</button>
        </div>
    );
};

export default PlayerConfigSelectView;
