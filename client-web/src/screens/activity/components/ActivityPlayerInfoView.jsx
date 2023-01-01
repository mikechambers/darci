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

import React from "react";
import { CharacterClass } from "shared";
import { TITAN, WARLOCK } from "shared/packages/enums/CharacterClass";

import EmblemImageView from "../../../components/EmblemImageView";
import Icon, {
    BLANK_ICON,
    getIconForCharacterClass,
    HUNTER_ICON,
    TITAN_ICON,
    WARLOCK_ICON,
} from "../../../components/Icon";
import LightLevelView from "../../../components/LightLevelView";
import PlayerNameView from "../../../components/PlayerNameView";

const elementStyle = {
    display: "flex",
    flexDirection: "row",
    columnGap: 4,
};

const detailsStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    rowGap: 4,
};

const nameStyle = {
    display: "flex",
    flexDirection: "row",
    gap: 4,
    alignItems: "center",
};

const ActivityPlayerInfoView = (props) => {
    const player = props.player;
    const character = player.character;

    let icon = getIconForCharacterClass(player.character.classType);

    return (
        <div style={elementStyle}>
            <div>
                <EmblemImageView emblem={character.emblem} />
            </div>
            <div style={detailsStyle} className="overflow">
                <div style={nameStyle}>
                    <Icon icon={icon} width={14} />
                    <PlayerNameView player={player} />
                </div>
                <LightLevelView level={character.lightLevel} />
            </div>
        </div>
    );
};

export default ActivityPlayerInfoView;
