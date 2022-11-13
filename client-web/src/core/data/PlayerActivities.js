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

import { Mode } from "shared";
import { calculateStats } from "../utils/activity";
import { parseMedalsFromServer, parseWeaponsFromServer } from "../utils/data";
import Player from "./Player";

class PlayerActivities {
    activities = [];
    player;

    constructor(options = {}) {
        this.activities = options.activities;
        this.player = options.player;
    }

    static fromApi(data, manifest) {
        let activities = data.activities.map((a) => {
            let out = {};

            out.player = Player.fromApi(a.player, manifest);

            out.activity = a.activity;
            out.activity.map = manifest.getActivityDefinition(
                a.activity.referenceId
            );
            let modeInfo = manifest.getActivityDefinition(
                a.activity.directorActivityHash
            );

            out.activity.modeInfo = modeInfo;
            out.activity.mode = Mode.fromId(a.activity.mode);

            out.stats = calculateStats(a.stats, out.activity.mode);

            out.stats.extended.medals = parseMedalsFromServer(
                a.stats.extended.medals,
                manifest
            );

            out.stats.extended.weapons = parseWeaponsFromServer(
                a.stats.extended.weapons,
                manifest
            );

            return out;
        });

        const player = Player.fromApi(data.player);

        return new PlayerActivities({ activities, player });
    }
}

export default PlayerActivities;
