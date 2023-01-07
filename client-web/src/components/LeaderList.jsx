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
import IndicatorView from "./IndicatorView";

import PlayerNameView from "./PlayerNameView";

const itemWrapperStyleBase = {
    width: 200,
    display: "grid",
    columnGap: 4,
    rowGap: 2,
    alignItems: "center",
};

const valueStyle = {
    display: "flex",
    justifyContent: "flex-end",
};

const rootStyle = {
    display: "flex",
    flexDirection: "column",
    rowGap: 4,
    borderRadius: 4,
    backgroundColor: "var(--color-list-item-background)",
    padding: 8,
};

const LeaderList = (props) => {
    const title = props.title;
    const leaderData = props.leaderData;
    const showTeams = !!props.showTeams;

    let itemWrapperStyle = {
        ...itemWrapperStyleBase,
    };

    itemWrapperStyle.gridTemplateColumns = showTeams
        ? "3px 148px 42px"
        : "151px 42px";

    return (
        <div style={rootStyle}>
            <div className="subsection_header underline">{title}</div>
            <div style={itemWrapperStyle}>
                {leaderData.map((item) => {
                    let teamsDiv = "";
                    if (showTeams) {
                        teamsDiv = (
                            <IndicatorView
                                color={`var(--color-${item.teamName.toLowerCase()}-team)`}
                                title={`${item.teamName} team`}
                            />
                        );
                    }

                    return (
                        <React.Fragment key={item.player.memberId}>
                            {teamsDiv}
                            <PlayerNameView player={item.player} />
                            <div style={valueStyle}>
                                {item.stat.toLocaleString()}
                            </div>
                        </React.Fragment>
                    );
                })}
            </div>
        </div>
    );
};

export default LeaderList;
