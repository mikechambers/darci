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

import { CharacterClassSelection, Moment } from "shared";
import { dateIsToday, dateIsWithinLastWeek } from "../../../core/utils/date";
import React from "react";
import { DateTime } from "luxon";
import { MOMENT_TYPE, SEASON_TYPE } from "../../../core/consts";

const formatCharacterClass = function (classSelection) {
    let out = classSelection.label;

    if (classSelection === CharacterClassSelection.ALL) {
        out = "all classes";
    }

    return out;
};

const getFormatStr = function (d) {
    let out = "cccc 'at' t";
    if (dateIsToday(d)) {
        out = "'Today at' t";
    } else if (dateIsWithinLastWeek(d)) {
        out = "DDD";
    }

    return out;
};

const elementStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    //maxWidth: "720px",
};

const PlayerActivitiesOverview = (props) => {
    const player = props.player;
    const mode = props.mode;
    const startMoment = props.startMoment;
    const endMoment = props.endMoment;
    const momentType =
        props.momentType === MOMENT_TYPE ? MOMENT_TYPE : SEASON_TYPE;

    let classSelection = props.classSelection;

    let playerName = player.bungieDisplayName;
    let playerNameCode = player.bungieDisplayNameCode;

    const f = (m) => {
        let momentDate = m.getDate();
        let f = getFormatStr(momentDate);
        let dt = DateTime.fromJSDate(momentDate);
        let humanMoment = dt.toFormat(f);
        return humanMoment;
    };

    let momentStr;

    if (momentType === SEASON_TYPE) {
        momentStr = `during ${startMoment.label}  
    (${f(startMoment)} to ${f(endMoment)})`;
    } else {
        if (endMoment === Moment.NOW) {
            momentStr = `since ${startMoment.label} (${f(startMoment)})`;
        } else {
            momentStr = `from ${startMoment.label} (${f(startMoment)}) to ${
                endMoment.label
            } (${f(endMoment)})`;
        }
    }
    return (
        <div style={elementStyle}>
            <div className="page_title">
                <span>{playerName}</span>
                <span className="player_name_code">#{playerNameCode}</span>{" "}
            </div>

            <hr />

            <div>
                {mode.label} stats for {formatCharacterClass(classSelection)}{" "}
                {momentStr}
            </div>
        </div>
    );
};

export default PlayerActivitiesOverview;
