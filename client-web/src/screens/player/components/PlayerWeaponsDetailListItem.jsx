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
import RoundedImageView from "../../../components/RoundedImageView";

import StatView from "../../../components/StatView";

const containerStyle = {
    display: "flex",
    backgroundColor: "var(--color-list-item-background)",
    borderRadius: "var(--radius-border)",
    padding: "12px",
    //gap: "var(--gap-list-item)",
};

const gapStyle = {
    width: "var(--gap-list-item)",
};

const dataContainerStyle = {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    marginLeft: "12px",
};

const headerStyle = {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "flex-end",
};

const valuesStyle = {
    display: "flex",
    justifyContent: "space-between",
};

const PlayerWeaponsDetailListItem = (props) => {
    let weapons = props.data;
    let style = props.style;
    let index = props.index;

    let item = weapons[index];

    return (
        <div style={style}>
            <div style={containerStyle}>
                <RoundedImageView
                    height={64}
                    width={64}
                    image={item.weapon.icon}
                />
                <div id="data_container" style={dataContainerStyle}>
                    <div style={headerStyle}>
                        <div className="subsection_header">
                            {item.weapon.name}
                        </div>
                        <div className="list_subtitle">
                            {item.weapon.itemSubType.label}
                        </div>
                    </div>
                    <div style={valuesStyle}>
                        {item.items.map((stat, i) => {
                            console.log(stat);
                            let align =
                                i === item.items.length - 1 ? "right" : "left";
                            return (
                                <StatView
                                    value={stat.formatter(stat.value)}
                                    label={stat.label}
                                    align={align}
                                    key={stat.label}
                                />
                            );
                        })}
                    </div>
                </div>
            </div>
            <div style={gapStyle}></div>
        </div>
    );
};

export default PlayerWeaponsDetailListItem;
