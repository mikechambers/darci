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

import PlayerNameView from "./PlayerNameView";

const rootStyle = {
    padding: "2px 4px",
    borderRadius: 4,
    display: "flex",
    alignItems: "flex-start",
    columnGap: 4,
};

const ActivityPlayerEffectivenessTooltip = (props) => {
    const data = props.data;
    const color = props.color;

    const player = data.player;
    const deaths = data.y;
    const kills = data.x;
    const eff = data.z;

    let colorStyle = {
        backgroundColor: color,
    };

    return (
        <div className="nivo_tooltip" style={rootStyle}>
            <div style={colorStyle} className="tooltip_color_swatch"></div>
            <div>
                <PlayerNameView player={player} />
                <div>
                    <div className="label_small label_dark">
                        KILLS : {kills}
                    </div>
                    <div className="label_small label_dark">
                        DEATHS : {deaths}
                    </div>
                    <div className="label_small label_dark">
                        EFF : {eff.toFixed(2)}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ActivityPlayerEffectivenessTooltip;
