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

import { CompletionReason, Standing, Mode } from "shared";
import { parseMedalsFromServer, parseWeaponsFromServer } from "../utils/data";
import Player from "./Player";

const { calculateStats } = require("../utils/activity");

const TEAM_NAMES = [
    "Alpha",
    "Bravo",
    "Charlie",
    "Delta",
    "Echo",
    "Foxtrot",
    "Golf",
    "Hotel",
    "India",
    "Juliett",
    "Kilo",
    "Lima",
    "Mike",
    "November",
    "Oscar",
    "Papa",
    "Quebec",
    "Romeo",
    "Sierra",
    "Tango",
    "Uniform",
    "Victor",
    "Whiskey",
    "X-ray",
    "Yankee",
    "Zulu",
];

export default class Activity {
    teams;
    details;
    weapons;

    constructor(data, manifest) {
        let activity = data.activity;

        let map = manifest.getActivityDefinition(activity.referenceId);
        activity.map = map;

        let mode = Mode.fromId(activity.mode);
        let modeInfo = manifest.getModeInfo(mode);
        activity.modeInfo = modeInfo;

        activity.mode = mode;

        let teams = data.teams;

        teams.forEach((team, index) => {
            team.name = TEAM_NAMES[index];
            for (const p of team.players) {
                p.player = Player.fromApi(p.player, manifest);

                //p.stats.standing = Standing.fromId(p.stats.standing);
                //p.stats.completionReason = Standing.fromId(p.stats.completionReason);

                p.stats = calculateStats(p.stats, mode);
                //TODO: get emblem from manifest and set here
                p.stats.extended.medals = parseMedalsFromServer(
                    p.stats.extended.medals,
                    manifest
                );

                p.stats.extended.weapons = parseWeaponsFromServer(
                    p.stats.extended.weapons,
                    manifest
                );
            }
        });

        this.teams = teams;

        //let completionReason = teams[0].players[0].stats.completionReason;
        //let activityDuration = teams[0].players[0].stats.activityDurationSeconds;
        activity.completionReason = this.getActivityStat("completionReason");

        if (!activity.completionReason) {
            activity.completionReason = CompletionReason.UNKNOWN;
        }

        activity.activityDurationSeconds = this.getActivityStat(
            "activityDurationSeconds"
        );

        activity.period = new Date(activity.period);
        this.details = activity;
    }

    getActivityStat(stat) {
        let teams = this.teams;

        for (const team of teams) {
            for (const player of team.players) {
                if (player.stats[stat] !== undefined) {
                    return player.stats[stat];
                }
            }
        }

        return undefined;
    }

    getStandingForMember(memberId) {
        let teams = this.teams;

        for (const team of teams) {
            for (const player of team.players) {
                if (player.player.memberId === memberId) {
                    return player.stats.standing;
                }
            }
        }

        return Standing.UNKNOWN;
    }
}
