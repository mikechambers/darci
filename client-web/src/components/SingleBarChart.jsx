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

import { ResponsiveBar } from "@nivo/bar";
import NivoTooltip from "./NivoTooltip";

const rootStyle = {
    width: "100%",
    height: 50,
};

const SingleBarChart = (props) => {
    const data = props.data;

    let keys = [];

    let d = { d: "d" };

    for (const item of data) {
        d[item.label] = item.value;
        keys.push(item.label);
    }

    return (
        <div id="foo" style={rootStyle}>
            <ResponsiveBar
                data={[d]}
                keys={keys}
                indexBy="d"
                animate={false}
                borderRadius={4}
                margin={{ top: 0, right: 12, bottom: 0, left: 12 }}
                minValue={0}
                maxValue={100}
                layout="horizontal"
                valueScale={{ type: "linear" }}
                indexScale={{ type: "band", round: true }}
                colors={{ scheme: "paired" }}
                defs={[
                    {
                        id: "dots",
                        type: "patternDots",
                        background: "inherit",
                        color: "#38bcb2",
                        size: 4,
                        padding: 1,
                        stagger: true,
                    },
                    {
                        id: "lines",
                        type: "patternLines",
                        background: "inherit",
                        color: "#eed312",
                        rotation: -45,
                        lineWidth: 6,
                        spacing: 10,
                    },
                ]}
                fill={[
                    {
                        match: {
                            id: "fries",
                        },
                        id: "dots",
                    },
                    {
                        match: {
                            id: "sandwich",
                        },
                        id: "lines",
                    },
                ]}
                borderColor={{
                    from: "color",
                    modifiers: [["darker", 1.6]],
                }}
                axisTop={null}
                axisRight={null}
                axisBotton={null}
                axisLeft={null}
                enableGridY={false}
                theme={{
                    tooltip: {
                        container: {
                            color: "#333333",
                        },
                    },
                }}
                labelSkipWidth={12}
                labelSkipHeight={12}
                labelTextColor={{
                    from: "color",
                    modifiers: [["darker", 1.6]],
                }}
                role="application"
                isFocusable={true}
                ariaLabel=""
                label={function (e) {
                    return e.formattedValue + "%";
                }}
                tooltip={(e) => {
                    return (
                        <NivoTooltip
                            label={e.id}
                            value={`${e.formattedValue}%`}
                            color={e.color}
                        />
                    );
                }}
            />
        </div>
    );
};

export default SingleBarChart;
