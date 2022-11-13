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
import Icon, { PRECISION_ICON } from "./Icon";
import WeaponIcon from "./WeaponIcon";
import WeaponImageView from "./WeaponImageView";
import { SMALL } from "../core/consts";
import { calculatePercent } from "../core/utils";

const rootStyle = {
    width: 365,
    display: "flex",
    flexDirection: "column",
    rowGap: 4,
};

const headerStyle = {
    display: "grid",
    gridTemplateColumns: "244px 35px 35px 39px",
    alignItems: "end",
    columnGap: 4,
};

const weaponEntryStyle = {
    display: "grid",
    gridTemplateColumns: "16px 180px 40px 35px 35px 39px",
    rowGap: 1,
    columnGap: 4,
};

const iconStyle = {
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    marginBottom: 1,
};

const weaponIconStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
};

const ActivityPlayerWeaponsList = (props) => {
    const weapons = props.weapons;

    weapons.sort((a, b) => b.kills - a.kills);

    return (
        <div style={rootStyle}>
            <div style={headerStyle} className="subsection_header underline">
                <div className="subsection_header">Weapons</div>
                <div className="label_small right">kills</div>
                <div className="label_icon" style={iconStyle}>
                    <Icon width="10" icon={PRECISION_ICON} />
                </div>
                <div>&nbsp;</div>
            </div>

            {weapons.map((weapon) => {
                return (
                    <div style={weaponEntryStyle} key={weapon.id}>
                        <div key={weapon.id}>
                            <WeaponImageView weapon={weapon} size={SMALL} />
                        </div>
                        <div className="section_entry overflow">
                            {weapon.item.name}
                        </div>
                        <div style={weaponIconStyle}>
                            <WeaponIcon type={weapon.item.itemSubType} />
                        </div>
                        <div className="right section_entry">
                            {weapon.kills}
                        </div>
                        <div className="right section_entry">
                            {weapon.precision}
                        </div>
                        <div className="right section_entry">
                            {Math.round(
                                calculatePercent(weapon.precision, weapon.kills)
                            )}
                            %
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default ActivityPlayerWeaponsList;
