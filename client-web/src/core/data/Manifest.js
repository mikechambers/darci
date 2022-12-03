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
            icon: "https://www.bungie.net/common/destiny2_content/icons/f3c27772a3d98c91fef127ce32e9f1e0.png",
            collectionIcon:
                "https://www.bungie.net/common/destiny2_content/icons/f3c27772a3d98c91fef127ce32e9f1e0.png",
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
            icon: "https://www.bungie.net/common/destiny2_content/icons/f3c27772a3d98c91fef127ce32e9f1e0.png",
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

    getModeInfo(id) {
        let out = {
            name: "Unknown",
            description: undefined,
            icon: undefined,
            image: undefined,
            id: id,
        };

        let a = this.getActivityDefinition(id);
        if (!a) {
            console.log(
                `Manifest.getModeInfo : Could not find activity definition [${id}]`
            );
            return out;
        }

        if (!this.#manifestData.data.activityModeDefinitions) {
            return out;
        }

        let m =
            this.#manifestData.data.activityModeDefinitions[a.activityModeHash];
        if (!m) {
            console.log(
                `Manifest.getModeInfo : Could not find activity mode definition [${a.activityModeHash}]`
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
            icon: "https://www.bungie.net/common/destiny2_content/icons/f2154b781b36b19760efcb23695c66fe.png",
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
