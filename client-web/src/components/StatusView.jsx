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

import { ReactComponent as JoinedLateIcon } from "./images/tabler/joined_late_icon.svg";
import { ReactComponent as JoinedLateLeftEarlyIcon } from "./images/tabler/joined_late_left_early_icon.svg";

const rotateStyle = { transform: "rotate(180deg)" };
const StatusView = (props) => {
    const joinedLate = props.joinedLate;
    const completed = props.completed;

    const dimension = props.dimension ? props.dimension : 18;

    let statusIcon = <div></div>;
    if (!completed) {
        statusIcon = (
            <JoinedLateIcon
                style={rotateStyle}
                width={dimension}
                height={dimension}
                title="Left game before completion"
            />
        );
    }

    if (joinedLate) {
        statusIcon = (
            <JoinedLateIcon
                width={dimension}
                height={dimension}
                title="Joined game in progress"
            />
        );
    }

    if (!completed && joinedLate) {
        statusIcon = (
            <JoinedLateLeftEarlyIcon
                width={dimension}
                height={dimension}
                title="Joined game in progress and left before completion"
            />
        );
    }

    return statusIcon;
};

export default StatusView;
