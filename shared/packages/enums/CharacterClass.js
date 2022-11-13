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

class CharacterClass extends EnumBase {
    static TITAN = new CharacterClass("Titan", 0);
    static HUNTER = new CharacterClass("Hunter", 1);
    static WARLOCK = new CharacterClass("Warlock", 2);
    static UNKNOWN = new CharacterClass("Unknown", -1);

    constructor(type, id, label = undefined) {
        super(type, id, label);
    }

    static fromId(id) {
        let out = super._fromId(CharacterClass, id);

        if (out != undefined) {
            return out;
        }

        return CharacterClass.UNKNOWN;
    }

    static fromType(type) {
        let out = super._fromType(CharacterClass, type);

        if (out != undefined) {
            return out;
        }

        return CharacterClass.UNKNOWN;
    }
}

module.exports = CharacterClass;
