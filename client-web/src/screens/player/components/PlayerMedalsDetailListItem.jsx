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
    maxHeight: `110px`,
    columnGap: "var(--gap-list-item)",
    itemAlign: "flex-start",
    //gap: "var(--gap-list-item)",
};

const gapStyle = {
    height: "var(--gap-list-item)",
};

const dataContainerStyle = {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
};

const headerStyle = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "flex-start",
};

const valuesStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    gap: "var(--gap-list-item)",
};

const descriptionStyle = {
    overflow: "hidden",
    textOverflow: "ellipsis",
    maxHeight: "50px",
};

const PlayerMedalsDetailListItem = (props) => {
    let medals = props.data.medals;
    let style = props.style;
    let index = props.index;
    let activityCount = props.data.activityCount;

    let item = medals[index];

    let title = item.info.isGold ? "Gold Medal" : "";

    return (
        <div style={style}>
            <div style={containerStyle}>
                <RoundedImageView
                    title={title}
                    image={item.info.icon}
                    width={50}
                    height={50}
                />

                <div id="data_container" style={dataContainerStyle}>
                    <div id="header_containter" style={headerStyle}>
                        <div className="subsection_header">
                            {item.info.name}
                        </div>
                    </div>
                    <div className="section_entry" style={descriptionStyle}>
                        {item.info.description}
                    </div>
                </div>
                <div style={valuesStyle}>
                    <StatView
                        value={item.count}
                        label="count"
                        title="Total medals"
                        align="right"
                    />
                    <StatView
                        value={Math.ceil(activityCount / item.count)}
                        label="games/m"
                        align="right"
                        title="Number of games to get medal."
                    />
                </div>
            </div>
            <div style={gapStyle}>&nbsp;</div>
        </div>
    );
};

export default PlayerMedalsDetailListItem;
