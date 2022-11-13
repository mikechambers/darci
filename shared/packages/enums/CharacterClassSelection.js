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
const CharacterClass = require("./CharacterClass");

class CharacterClassSelection extends EnumBase {
    static TITAN = new CharacterClassSelection("Titan", 0);
    static HUNTER = new CharacterClassSelection("Hunter", 1);
    static WARLOCK = new CharacterClassSelection("Warlock", 2);
    static LAST_ACTIVE = new CharacterClassSelection("Last Active", 3);
    static ALL = new CharacterClassSelection("All", 4);
    static UNKNOWN = new CharacterClassSelection("Unknown", -1);

    static LAST_ACTIVE_PARAM = "lastactive";

    constructor(type, id, label = undefined) {
        super(type, id, label);
    }

    getCharacterClass() {
        if (this === CharacterClassSelection.TITAN) {
            return CharacterClass.TITAN;
        }

        if (this === CharacterClassSelection.HUNTER) {
            return CharacterClass.HUNTER;
        }

        if (this === CharacterClassSelection.WARLOCK) {
            return CharacterClass.WARLOCK;
        }

        return CharacterClass.UNKNOWN;
    }

    static fromId(id) {
        let out = super._fromId(CharacterClassSelection, id);

        if (out != undefined) {
            return out;
        }

        return CharacterClassSelection.UNKNOWN;
    }

    static fromType(type) {
        if (!type) {
            return undefined;
        }
        if (type.toUpperCase() == this.LAST_ACTIVE_PARAM.toUpperCase()) {
            return this.LAST_ACTIVE;
        }

        let out = super._fromType(CharacterClassSelection, type);

        if (out != undefined) {
            return out;
        }

        return CharacterClassSelection.UNKNOWN;
    }
}

module.exports = CharacterClassSelection;
