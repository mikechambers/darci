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

const { ItemSubType, AmmunitionType } = require("shared");

//hard coded from Manifest from DestinyPresentationNodeDefinition
//if they change, then we can add them to our own manifest data on the server
export const UNKNOWN_ICON_URL =
    "https://www.bungie.net/common/destiny2_content/icons/f3c27772a3d98c91fef127ce32e9f1e0.png";
export const HUNTER_ICON_URL =
    "https://www.bungie.net/common/destiny2_content/icons/e7324e8c29c5314b8bce166ff167859d.png";
export const TITAN_ICON_URL =
    "https://www.bungie.net/common/destiny2_content/icons/8956751663b4394cd41076f93d2dd0d6.png";
export const WARLOCK_ICON_URL =
    "https://www.bungie.net/common/destiny2_content/icons/bf7b2848d2f5fbebbf350d418b8ec148.png";

class Manifest {
    #manifestData;

    #trialsPassageIds = [];

    constructor(manifestData) {
        this.#manifestData = manifestData;

        for (const value of Object.values(
            this.#manifestData.data.trialsPassageItemDefinitions
        )) {
            if (value.id) {
                this.#trialsPassageIds.push(value.id);
            }
        }
    }

    getWeapons() {
        return this.#manifestData.data.weaponItemDefinition;
    }

    getWeaponDefinition(id) {
        let out = {
            name: "Unknown",
            itemType: undefined,
            itemSubType: ItemSubType.UNKNOWN,
            id: id,
            icon: UNKNOWN_ICON_URL,
            collectionIcon: UNKNOWN_ICON_URL,
            ammunitionType: AmmunitionType.UNKNOWN,
            screenshot: undefined,
        };

        if (!this.#manifestData.data.weaponItemDefinition) {
            return out;
        }

        let d = this.#manifestData.data.weaponItemDefinition[id];

        if (!d) {
            return out;
        }

        out = Object.assign(out, d);
        /*
        out = {
            ...out,
            ...d,
        };
        */

        out.itemSubType = ItemSubType.fromId(d.itemSubType);
        out.icon = d.icon;
        out.screenshot = d.screenshot;
        out.ammunitionType = AmmunitionType.fromId(d.ammunitionType);

        return out;
    }

    getActivityDefinition(id) {
        let out = {
            name: "Unknown",
            image: undefined,
            directActivityModeHash: undefined,
            id: id,
        };

        if (!this.#manifestData.data.activityDefinition) {
            return out;
        }

        let d = this.#manifestData.data.activityDefinition[id];

        if (!d) {
            return out;
        }

        out = Object.assign(out, d);

        return out;
    }

    getTrialsPassageDefinition(id) {
        let out = {
            name: "Unknown",
            description: undefined,
            icon: UNKNOWN_ICON_URL,
            id: id,
        };

        if (!this.#manifestData.data.trialsPassageItemDefinitions) {
            return out;
        }

        let d = this.#manifestData.data.trialsPassageItemDefinitions[id];

        out = Object.assign(out, d);

        return !d ? out : d;
    }

    get trialsPassageIds() {
        return this.#trialsPassageIds;
    }

    getEmblemDefinition(id) {
        let out = {
            id: id,
            name: "Unknown",
            icon: undefined,
            secondaryIcon: undefined,
            secondaryOverlay: undefined,
            secondarySpecial: undefined,
        };

        if (!this.#manifestData.data.emblemDefinitions) {
            return out;
        }

        let e = this.#manifestData.data.emblemDefinitions[id];

        if (!e) {
            return out;
        }

        out = {
            ...e,
            icon: e.icon,
            secondaryIcon: e.secondaryIcon,
            secondaryOverlay: e.secondaryOverlay,
            secondarySpecial: e.secondarySpecial,
        };
        return out;
    }

    getModeInfo(mode) {
        let out = {
            name: "Unknown",
            description: undefined,
            icon: undefined,
            image: undefined,
            id: undefined,
            mode: mode,
        };

        let m = this.#manifestData.data.activityModeDefinitions[mode.id];

        if (!m) {
            console.log(
                `Manifest.getModeInfo : Could not find activity mode definition [${mode.label}]`
            );

            return out;
        }

        out = Object.assign(out, m);

        return out;
    }

    getMedalDefinition(id) {
        let out = {
            name: "Unknown",
            description: undefined,
            icon: UNKNOWN_ICON_URL,
            isGold: false,
            id: id,
        };

        if (!this.#manifestData.data.medalDefinitions) {
            return out;
        }

        let m = this.#manifestData.data.medalDefinitions[id];

        if (!m) {
            return out;
        }

        out = Object.assign(out, m);
        return out;
    }
}

export default Manifest;
