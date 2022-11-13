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
import Icon, {
    CHEVRONS_DOWN,
    CHEVRONS_UP,
    LEADERBOARD_ICON,
} from "../../../components/Icon";
import ImageView from "../../../components/ImageView";
import WeaponIcon from "../../../components/WeaponIcon";

const elementStyle = {
    display: "flex",
    flexDirection: "column",
    borderRadius: 4,
    backgroundColor: "var(--color-list-item-background)",
    padding: 8,
    height: "min-content",
};

//16
const weaponContainerStyle = {
    display: "grid",
    gridTemplateColumns: "16px 145px 15px 10px",
    columnGap: 10,
    rowGap: 6,
};

const iconStyleBase = {
    width: 16,
    height: 16,
    backgroundSize: "cover",
    borderRadius: 4,
};

const countStyle = {
    font: "var(--light) 12px 'Roboto', sans-serif",
    display: "flex",
    opacity: 0.5,
    alignItems: "center",
    justifyContent: "flex-end",
};

const titleStyle = {
    borderBottom: "1px #ffffff66 solid",
    display: "grid",
    gridTemplateColumns: "161px 25px 10px",
    columnGap: 10,
    marginBottom: 6,
};

const killsStyle = {
    display: "flex",
    opacity: 0.8,
    alignItems: "center",
    justifyContent: "flex-end",
};

const expandedDivStyle = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
};

const chevronStyle = {
    //hack to link up icon on right with text and overcoming
    //the padding in the svg
    marginRight: -3,
};

export const WEAPON = "WEAPON";
export const WEAPON_TYPE = "WEAPON_TYPE";

const ActivityWeaponList = (props) => {
    const title = props.title;
    let weapons = props.weapons;
    let type = props.type ? props.type : WEAPON;

    const [expanded, setExpanded] = useState(false);

    const onExpandedClick = (e) => {
        setExpanded(!expanded);
    };

    let expandedDiv = "";

    if (props.weapons.length >= 5) {
        if (!expanded) {
            expandedDiv = (
                <div
                    title="Expand list"
                    onClick={onExpandedClick}
                    style={expandedDivStyle}
                    className="link icon_link"
                >
                    <Icon
                        icon={CHEVRONS_DOWN}
                        width="14"
                        style={chevronStyle}
                    />
                </div>
            );

            weapons = weapons.slice(0, 5);
        } else {
            expandedDiv = (
                <div
                    title="Collapse list"
                    onClick={onExpandedClick}
                    style={expandedDivStyle}
                    className="link icon_link"
                >
                    <Icon icon={CHEVRONS_UP} width="14" style={chevronStyle} />
                </div>
            );
        }
    }

    return (
        <div style={elementStyle}>
            <div style={titleStyle} className="subection_header">
                <div>{title}</div>
                <div
                    className="label_small"
                    style={killsStyle}
                    title="Total kills for all players"
                >
                    kills
                </div>
                <div style={countStyle}>
                    <Icon
                        icon={LEADERBOARD_ICON}
                        width="12"
                        title="Number of players using the weapon"
                    />
                </div>
            </div>
            <div style={weaponContainerStyle}>
                {weapons.map((data) => {
                    let iconDiv;
                    if (type === WEAPON) {
                        const s = {
                            ...iconStyleBase,
                            backgroundImage: `url(${data.icon})`,
                        };
                        iconDiv = (
                            <ImageView
                                width={16}
                                height={16}
                                image={data.icon}
                            />
                        );
                    } else {
                        iconDiv = (
                            <div>
                                <WeaponIcon
                                    type={data.itemSubType}
                                    width="16"
                                />
                            </div>
                        );
                    }

                    return (
                        <React.Fragment key={data.id}>
                            {iconDiv}
                            <div className="section_entry overflow">
                                {data.name}
                            </div>

                            <div className="section_entry right">
                                {data.kills}
                            </div>

                            <div style={countStyle}>{data.count}</div>
                        </React.Fragment>
                    );
                })}
            </div>
            {expandedDiv}
        </div>
    );
};

export default ActivityWeaponList;
