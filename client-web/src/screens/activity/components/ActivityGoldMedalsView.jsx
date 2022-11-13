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

import Medal from "../../../components/Medal";
import { MEDIUM } from "../../../core/consts";

const elementStyle = {
    display: "grid",
    gridTemplateColumns: "min-content min-content min-content",
    gap: 36,
    flexWrap: "wrap",
};

const medalEntryStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 8,
};

const playerEntryStyle = {
    display: "flex",
    flexDirection: "column",
    gap: 8,
    width: 200,
};

const teamStyle = {
    width: 3,
    height: 14,
    //margin: 2,
};

const headerStyle = {
    display: "flex",
    flexDirection: "row",
    columnGap: 4,
    rowGap: 2,
    alignItems: "center",
    borderBottom: "1px #ffffff66 solid",
};

const ActivityGoldMedalsView = (props) => {
    const players = props.players;

    let goldMedals = [];

    for (const p of players) {
        let g = [];
        let total = 0;
        for (const m of p.player.stats.extended.medals) {
            if (m.info.isGold) {
                total += m.count;
                g.push(m);
            }
        }

        if (g.length) {
            g.sort((a, b) => b.count - a.count);
            goldMedals.push({
                player: p.player,
                teamName: p.teamName,
                total: total,
                goldMedals: g,
            });
        }
    }

    goldMedals.sort((a, b) => b.total - a.total);

    if (!goldMedals.length) {
        return <div>No Gold Medals in match</div>;
    }

    return (
        <div style={elementStyle}>
            {goldMedals.map((item) => {
                return (
                    <div
                        style={playerEntryStyle}
                        key={item.player.player.memberId}
                    >
                        <div style={headerStyle}>
                            <div
                                style={teamStyle}
                                className={`${item.teamName.toLowerCase()}_team`}
                            ></div>
                            <div
                                className="player_name_large"
                                title={item.player.player.getFullName()}
                            >
                                {item.player.player.bungieDisplayName}
                                <span className="player_name_code_large">
                                    #{item.player.player.bungieDisplayNameCode}
                                </span>
                            </div>
                        </div>

                        {item.goldMedals.map((medal) => {
                            return (
                                <div
                                    style={medalEntryStyle}
                                    key={medal.info.id}
                                >
                                    <Medal
                                        medal={medal.info}
                                        count={medal.count}
                                        size={MEDIUM}
                                    />
                                    <div>{medal.info.name}</div>
                                </div>
                            );
                        })}
                    </div>
                );
            })}
        </div>
    );
};

export default ActivityGoldMedalsView;
