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

    let iconStyle = {
        backgroundImage: `url(${item.icon})`,
        width: "64px",
        height: "64px",
        flexShrink: "0",
    };

    return (
        <div style={style}>
            <div style={containerStyle}>
                <div className="weapon_list_icon" style={iconStyle}></div>
                <div id="data_container" style={dataContainerStyle}>
                    <div id="header_containter" style={headerStyle}>
                        <div className="subsection_header">{item.title}</div>
                        <div className="list_subtitle">{item.subtitle}</div>
                    </div>
                    <div id="values_containter" style={valuesStyle}>
                        {item.items.map((stat, i) => {
                            let align =
                                i === item.items.length - 1 ? "right" : "left";
                            return (
                                <StatView
                                    value={stat.value}
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
