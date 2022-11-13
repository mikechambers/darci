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

import React, { useState } from "react";
import { FixedSizeList as List } from "react-window";
import PlayerWeaponsDetailListItem from "./PlayerWeaponsDetailListItem";

const elementStyle = {
    width: "422px",
};

const titleStyle = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
};

const ITEM_HEIGHT = 100;
const MAX_HEIGHT = 488;
const PlayerWeaponsDetailList = (props) => {
    let weapons = props.weapons;

    let sortLabels = props.sortLabels;
    let defaultIndex = props.sortIndex ? props.sortIndex : 0;

    let [sortIndex, setSortIndex] = useState(defaultIndex);

    weapons.sort((a, b) => {
        let key = "data";

        if (!b.items[sortIndex][key]) {
            key = "value";
        }

        return b.items[sortIndex][key] - a.items[sortIndex][key];
    });

    const onSortChange = function (e) {
        setSortIndex(e.target.selectedIndex);
    };

    let itemKey = (index, weapons) => weapons[index].id;

    let height = ITEM_HEIGHT * weapons.length;
    if (height > MAX_HEIGHT) {
        height = MAX_HEIGHT;
    }
    return (
        <div style={elementStyle}>
            <div style={titleStyle}>
                <div>
                    <select
                        className="nav_select"
                        value={sortIndex}
                        onChange={onSortChange}
                    >
                        {sortLabels.map((item, index) => {
                            return (
                                <option
                                    key={item}
                                    value={index}
                                    className="nav_option"
                                >
                                    {item}
                                </option>
                            );
                        })}
                    </select>
                </div>
            </div>
            <List
                height={height}
                width={422}
                itemData={weapons}
                itemCount={weapons.length}
                itemSize={ITEM_HEIGHT}
                itemKey={itemKey}
            >
                {PlayerWeaponsDetailListItem}
            </List>
        </div>
    );
};

export default PlayerWeaponsDetailList;
