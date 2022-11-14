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

import { FixedSizeList as List } from "react-window";
import PlayerMedalsDetailListItem from "./PlayerMedalsDetailListItem";
import { useState } from "react";

const elementStyle = {
    width: "422px",
};

const titleStyle = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
};

const ITEM_HEIGHT = 122;
const MAX_HEIGHT = 488;
const PlayerMedalsDetailList = (props) => {
    let medals = props.medals;
    let activityCount = props.activityCount;

    let [sortIndex, setSortIndex] = useState(0);

    let sortCount = (a, b) => {
        return b.count - a.count;
    };

    let sortName = (a, b) => {
        return a.info.name.localeCompare(b.info.name);
    };

    let sortGold = (a, b) => {
        if (b.info.isGold === a.info.isGold) {
            return b.count - a.count;
        }

        if (b.info.isGold && !a.info.isGold) {
            return 1;
        }

        return -1;
    };

    let sortGamesMedal = (a, b) => {
        return activityCount / b.count - activityCount / a.count;
    };

    let sort = sortGold;
    if (sortIndex === 1) {
        sort = sortCount;
    } else if (sortIndex === 2) {
        sort = sortGamesMedal;
    } else if (sortIndex === 3) {
        sort = sortName;
    }

    medals.sort(sort);

    const onSortChange = (e) => {
        setSortIndex(e.target.selectedIndex);
    };

    let itemKey = (index, data) => data.medals[index].id;

    let itemData = { activityCount: activityCount, medals: medals };
    let height = ITEM_HEIGHT * medals.length;
    if (height > MAX_HEIGHT) {
        height = MAX_HEIGHT;
    }

    return (
        <div style={elementStyle}>
            <div style={titleStyle}>
                <div>
                    <select
                        className="nav_select"
                        defaultValue="0"
                        onChange={onSortChange}
                    >
                        <option value="0" className="nav_option">
                            gold medals
                        </option>
                        <option value="1" className="nav_option">
                            count
                        </option>
                        <option value="2" className="nav_option">
                            games until medal
                        </option>
                        <option value="3" className="nav_option">
                            name
                        </option>
                    </select>
                </div>
            </div>
            <List
                height={height}
                width={422}
                itemData={itemData}
                itemCount={medals.length}
                itemSize={ITEM_HEIGHT}
                itemKey={itemKey}
            >
                {PlayerMedalsDetailListItem}
            </List>
        </div>
    );
};

export default PlayerMedalsDetailList;
