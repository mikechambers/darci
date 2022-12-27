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

import { AmmunitionType, CharacterClass } from "shared";
import ClassMetaSummaryList from "../../screens/player/components/ClassMetaSummaryList";
import Manifest, {
    HUNTER_ICON_URL,
    TITAN_ICON_URL,
    UNKNOWN_ICON_URL,
    WARLOCK_ICON_URL,
} from "./Manifest";
import Player from "./Player";

const {
    parseMedalsFromServer,
    parseWeaponsFromServer,
} = require("../utils/data");

class PlayerSummary {
    summary;
    meta;
    player;
    query;
    maps;
    characterClassMeta;

    constructor(options = {}) {
        this.summary = options.summary;
        this.meta = options.meta;
        this.player = options.player;
        this.query = options.query;
        this.maps = options.maps;
        this.characterClassMeta = options.characterClassMeta;
    }

    static fromApi(data, manifest) {
        let summary = data.summary;
        let query = data.query;

        let player = Player.fromApi(data.player, manifest);

        let meta = data.meta;
        let maps = data.maps;

        //this is in case we cant load a manifest for some reason
        if (!manifest) {
            manifest = new Manifest();
        }

        summary.weapons = parseWeaponsFromServer(summary.weapons, manifest);
        summary.medals = parseMedalsFromServer(summary.medals, manifest);
        meta = parseWeaponsFromServer(meta, manifest);

        let characterClassMeta = [];

        for (const m of data.characterClassMeta) {
            const characterClass = CharacterClass.fromId(m.classId);

            let icon;

            switch (characterClass) {
                case CharacterClass.HUNTER: {
                    icon = HUNTER_ICON_URL;
                    break;
                }
                case CharacterClass.TITAN: {
                    icon = TITAN_ICON_URL;
                    break;
                }
                case CharacterClass.WARLOCK: {
                    icon = WARLOCK_ICON_URL;
                    break;
                }
                default: {
                    icon = UNKNOWN_ICON_URL;
                }
            }

            characterClassMeta.push({
                characterClass,
                count: m.count,
                wins: m.wins,
                icon: icon,
            });
        }

        summary.weaponKills = 0;
        summary.specialAmmoKills = 0;
        summary.primaryAmmoKills = 0;
        summary.heavyAmmoKills = 0;
        summary.unknownAmmoKills = 0;

        for (const w of summary.weapons) {
            const kills = w.kills;
            summary.weaponKills += kills;

            switch (w.item.ammunitionType) {
                case AmmunitionType.PRIMARY: {
                    summary.primaryAmmoKills += kills;
                    break;
                }
                case AmmunitionType.SPECIAL: {
                    summary.specialAmmoKills += kills;
                    break;
                }
                case AmmunitionType.HEAVY: {
                    summary.heavyAmmoKills += kills;
                    break;
                }
                default: {
                    summary.unknownAmmoKills += kills;
                }
            }
        }

        for (const m of maps) {
            let map = manifest.getActivityDefinition(m.referenceId);
            m.map = map;
        }

        return new PlayerSummary({
            meta,
            summary,
            player,
            query,
            maps,
            characterClassMeta,
        });
    }
}

export default PlayerSummary;
