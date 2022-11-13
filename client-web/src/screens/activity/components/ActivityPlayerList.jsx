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

import ActivityPlayerListItem from "./ActivityPlayerListItem";

const elementStyle = {
    display: "flex",
    flexDirection: "column",
    rowGap: 2,
};
const ActivityPlayerList = (props) => {
    const players = props.players;

    let teamMap = new Map();

    //shouldnt ever have more than 3 fireteams per team
    let colors = ["#29756d", "#ff138f", "#fbf67c"];

    for (const p of players) {
        let fireteam = p.stats.fireteamId;

        if (!teamMap.has(fireteam)) {
            teamMap.set(fireteam, { color: undefined });
        } else {
            let color = teamMap.get(fireteam).color;

            if (!color) {
                teamMap.set(fireteam, { color: colors.pop() });
            }
        }
    }

    players.sort((a, b) => b.stats.score - a.stats.score);

    return (
        <div style={elementStyle}>
            {players.map((player) => {
                return (
                    <ActivityPlayerListItem
                        player={player}
                        key={player.player.memberId}
                        teamColor={teamMap.get(player.stats.fireteamId).color}
                    />
                );
            })}
        </div>
    );
};

export default ActivityPlayerList;
