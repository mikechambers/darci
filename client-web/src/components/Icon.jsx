/* MIT License
 *
 * Copyright (c) 2023 Mike Chambers
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

import { ReactComponent as PrecisionIcon } from "./images/precision_icon.svg";
import { ReactComponent as GrenadeIcon } from "./images/grenade_icon.svg";
import { ReactComponent as MeleeIcon } from "./images/melee_icon.svg";
import { ReactComponent as SuperIcon } from "./images/super_icon.svg";
import { ReactComponent as BlankIcon } from "./images/blank_icon.svg";
import { ReactComponent as DestinyLogo } from "./images/destiny_logo.svg";

import { ReactComponent as AboutIcon } from "./images/tabler/about_icon.svg";
import { ReactComponent as PlayerIcon } from "./images/tabler/player_icon.svg";
import { ReactComponent as LeaderboardIcon } from "./images/tabler/leaderboard_icon.svg";
import { ReactComponent as SearchIcon } from "./images/tabler/search_icon.svg";

import { ReactComponent as ChevronsDown } from "./images/tabler/chevrons-down.svg";
import { ReactComponent as ChevronsUp } from "./images/tabler/chevrons-up.svg";
import { ReactComponent as Alert } from "./images/tabler/alert-triangle.svg";

import { ReactComponent as CloseIcon } from "./images/tabler/square-x.svg";
import { ReactComponent as DownloadIcon } from "./images/tabler/file-download.svg";

import { ReactComponent as Hunter } from "./images/hunter.svg";
import { ReactComponent as Warlock } from "./images/warlock.svg";
import { ReactComponent as Titan } from "./images/titan.svg";
import { CharacterClass } from "shared";

export const PRECISION_ICON = "PRECISION_ICON";
export const GRENADE_ICON = "GRENADE_ICON";
export const MELEE_ICON = "MELEE_ICON";
export const SUPER_ICON = "SUPER_ICON";
export const BLANK_ICON = "BLANK_ICON";
export const DESTINY_LOGO = "DESTINY_LOGO";

export const ABOUT_ICON = "ABOUT_ICON";
export const PLAYER_ICON = "PLAYER_ICON";
export const LEADERBOARD_ICON = "LEADERBOARD_ICON";
export const SEARCH_ICON = "SEARCH_ICON";

export const CHEVRONS_DOWN = "CHEVRONS_DOWN";
export const CHEVRONS_UP = "CHEVRONS_UP";

export const CLOSE_ICON = "CLOSE_ICON";
export const DOWNLOAD_ICON = "DOWNLOAD_ICON";

export const ALERT_ICON = "ALERT_ICON";

export const HUNTER_ICON = "HUNTER_ICON";
export const TITAN_ICON = "TITAN_ICON";
export const WARLOCK_ICON = "WARLOCK_ICON";

const Icon = (props) => {
    let icon = props.icon;
    let width = props.width ? props.width : 10;
    let style = props.style;
    let title = props.title ? props.title : "";

    let out;
    switch (icon) {
        case HUNTER_ICON:
            out = (
                <Hunter
                    title="Hunter"
                    width={width}
                    height={width}
                    style={style}
                />
            );
            break;

        case WARLOCK_ICON:
            out = (
                <Warlock
                    title="Warlock"
                    width={width}
                    height={width}
                    style={style}
                />
            );
            break;

        case TITAN_ICON:
            out = (
                <Titan
                    title="Titan"
                    width={width}
                    height={width}
                    style={style}
                />
            );
            break;
        case CLOSE_ICON:
            out = (
                <CloseIcon
                    title={title}
                    width={width}
                    height={width}
                    style={style}
                />
            );
            break;

        case DOWNLOAD_ICON:
            out = (
                <DownloadIcon
                    title={title}
                    width={width}
                    height={width}
                    style={style}
                />
            );
            break;

        case PRECISION_ICON:
            out = (
                <PrecisionIcon
                    title={title}
                    width={width}
                    height={width}
                    style={style}
                />
            );
            break;
        case GRENADE_ICON:
            out = (
                <GrenadeIcon
                    title={title}
                    width={width}
                    height={width}
                    style={style}
                />
            );
            break;
        case MELEE_ICON:
            out = (
                <MeleeIcon
                    title={title}
                    width={width}
                    height={width}
                    style={style}
                />
            );
            break;
        case SUPER_ICON:
            out = (
                <SuperIcon
                    title={title}
                    width={width}
                    height={width}
                    style={style}
                />
            );
            break;
        case DESTINY_LOGO:
            out = (
                <DestinyLogo
                    title={title}
                    width={width}
                    height={width}
                    style={style}
                />
            );
            break;
        case ABOUT_ICON:
            out = (
                <AboutIcon
                    title={title}
                    width={width}
                    height={width}
                    style={style}
                />
            );
            break;
        case PLAYER_ICON:
            out = (
                <PlayerIcon
                    title={title}
                    width={width}
                    height={width}
                    style={style}
                />
            );
            break;
        case LEADERBOARD_ICON:
            out = (
                <LeaderboardIcon
                    title={title}
                    width={width}
                    height={width}
                    style={style}
                />
            );
            break;
        case SEARCH_ICON:
            out = (
                <SearchIcon
                    title={title}
                    width={width}
                    height={width}
                    style={style}
                />
            );
            break;
        case CHEVRONS_DOWN:
            out = (
                <ChevronsDown
                    title={title}
                    width={width}
                    height={width}
                    style={style}
                />
            );
            break;
        case CHEVRONS_UP:
            out = (
                <ChevronsUp
                    title={title}
                    width={width}
                    height={width}
                    style={style}
                />
            );
            break;
        case ALERT_ICON:
            out = (
                <Alert
                    className="pulse"
                    title={title}
                    width={width}
                    height={width}
                    style={style}
                />
            );
            break;
        case BLANK_ICON:
        //fall through
        default:
            out = (
                <BlankIcon
                    style={style}
                    title={title}
                    width={width}
                    height={width}
                />
            );
    }

    return out;
};

export const getIconForCharacterClass = function (characterClass) {
    let icon;
    switch (characterClass) {
        case CharacterClass.HUNTER: {
            icon = HUNTER_ICON;
            break;
        }
        case CharacterClass.TITAN: {
            icon = TITAN_ICON;
            break;
        }
        case CharacterClass.WARLOCK: {
            icon = WARLOCK_ICON;
            break;
        }
        default: {
            icon = BLANK_ICON;
        }
    }

    return icon;
};

export default Icon;
