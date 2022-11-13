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

import { calculateEfficiency, calculateKillsDeathsRatio } from "shared";
import CompactMedalsList from "../../../components/CompactMedalsList";
import StatusView from "../../../components/StatusView";
import ActivityPlayerStatsView from "./ActivityPlayerStatsView";
import PlayerInfoView from "./ActivityPlayerInfoView";
import { SMALL } from "../../../core/consts";

const rootStyle = {
    display: "grid",
    gridTemplateColumns: "6px 218px 370px 20px auto",
    flexDirection: "row",
    alignItems: "center",
    columnGap: 6,
    //justifyContent: "center",
};

const statusViewStyle = {
    display: "flex",
    justifyContent: "center",
};

//todo
const teamStyleBase = {
    height: "100%",
    borderRadius: "var(--radius-border) 0px 0px var(--radius-border)",
};

const ActivityPlayerListItemHeader = (props) => {
    const player = props.player;
    const onClick = props.onClick;
    const teamColor = props.teamColor;

    let className = props.onClick
        ? "list_item_header link"
        : "list_item_header";

    const data = [
        { value: player.stats.score, label: "score" },
        { value: player.stats.kills, label: "kills" },
        { value: player.stats.assists, label: "assists" },
        { value: player.stats.opponentsDefeated, label: "defeats" },
        { value: player.stats.deaths, label: "deaths" },
        {
            value: calculateKillsDeathsRatio(
                player.stats.kills,
                player.stats.deaths
            ).toFixed(2),
            label: "kd",
        },
        {
            value: calculateEfficiency(
                player.stats.kills,
                player.stats.deaths,
                player.stats.assists
            ).toFixed(2),
            label: "eff",
        },
    ];

    const handleOnClick = (e) => {
        if (!onClick) {
            return;
        }

        onClick(e);
    };

    const goldMedals = player.stats.extended.medals.filter(
        (m) => m.info.isGold
    );

    let teamStyleColor = teamColor ? teamColor : "#00000000";

    const teamStyle = {
        ...teamStyleBase,
        backgroundColor: teamStyleColor,
    };

    return (
        <div className={className} style={rootStyle} onClick={handleOnClick}>
            <div style={teamStyle} title="Fireteam"></div>
            <PlayerInfoView player={player} />
            <ActivityPlayerStatsView data={data} />
            <div style={statusViewStyle}>
                <StatusView
                    completed={player.stats.completed}
                    joinedLate={player.stats.joinedLate}
                />
            </div>
            <CompactMedalsList medals={goldMedals} size={SMALL} />
        </div>
    );
};

export default ActivityPlayerListItemHeader;
