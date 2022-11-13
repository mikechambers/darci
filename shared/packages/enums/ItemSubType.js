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

const EnumBase = require("./EnumBase");

class ItemSubType extends EnumBase {
    static UNKNOWN = new ItemSubType("Unknown", -1);
    static NONE = new ItemSubType("None", 0);
    static AUTO_RIFLE = new ItemSubType("Auto Rifle", 6);
    static SHOTGUN = new ItemSubType("Shotgun", 7);
    static MACHINE_GUN = new ItemSubType("Machine Gun", 8);
    static HAND_CANNON = new ItemSubType("Hand Cannon", 9);
    static ROCKET_LAUNCHER = new ItemSubType("Rocket Launcher", 10);
    static FUSION_RIFLE = new ItemSubType("Fusion Rifle", 11);
    static SNIPER_RIFLE = new ItemSubType("Sniper Rifle", 12);
    static PULSE_RIFLE = new ItemSubType("Pulse Rifle", 13);
    static SCOUT_RIFLE = new ItemSubType("Scout Rifle", 14);
    static SIDEARM = new ItemSubType("Sidearm", 17);
    static SWORD = new ItemSubType("Sword", 18);
    static LINEAR_FUSION_RIFLE = new ItemSubType("Linear Fusion Rifle", 22);
    static GRENADE_LAUNCHER = new ItemSubType("Grenade Launcher", 23);
    static SUBMACHINE_GUN = new ItemSubType("Submachine Gun", 24);
    static TRACE_RIFLE = new ItemSubType("Trace Rifle", 25);
    static BOW = new ItemSubType("Bow", 31);
    static GLAIVE = new ItemSubType("Glaive", 33);

    constructor(type, id, label = undefined) {
        super(type, id, label);
    }

    static fromId(id) {
        let out = super._fromId(ItemSubType, id);

        if (out != undefined) {
            return out;
        }

        return ItemSubType.UNKNOWN;
    }

    static fromType(type) {
        let out = super._fromType(ItemSubType, type);

        if (out != undefined) {
            return out;
        }

        return ItemSubType.UNKNOWN;
    }
}

module.exports = ItemSubType;
