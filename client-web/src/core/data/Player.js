/* MIT License
 *
 * Copyright (c) 2023 Mike Chambers
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

import Character from "./Character";

class Player {
    memberId;
    bungieDisplayNameCode;
    platformId;
    characters;
    character;

    constructor(options = {}) {
        this.memberId = options.memberId;
        this.bungieDisplayName = options.bungieDisplayName;
        this.bungieDisplayNameCode = options.bungieDisplayNameCode;
        this.platformId = options.platformId;
        this.characters = options.characters;
        this.character = options.character;
    }

    getFullName() {
        return `${this.bungieDisplayName}#${this.bungieDisplayNameCode}`;
    }

    get label() {
        return this.getFullName();
    }

    static fromApi(data, manifest) {
        let chars = [];
        for (const c of data.characters) {
            chars.push(Character.fromApi(c, manifest));
        }

        let out = new Player({
            memberId: data.memberId,
            bungieDisplayName: data.bungieDisplayName,
            bungieDisplayNameCode: data.bungieDisplayNameCode,
            platformId: data.platformId,
            characters: chars,
            character: chars[0],
        });

        return out;
    }

    static fromJson(json) {
        if (!json) {
            return;
        }

        let options = JSON.parse(json);

        let out = new Player({
            memberId: options.memberId,
            bungieDisplayName: options.bungieDisplayName,
            bungieDisplayNameCode: options.bungieDisplayNameCode,
            platformId: options.platformId,
            characters: options,
        });

        return out;
    }

    toJson() {
        let out = {
            memberId: this.memberId,
            bungieDisplayName: this.bungieDisplayName,
            bungieDisplayNameCode: this.bungieDisplayNameCode,
            platformId: this.platformId,
        };

        let json = JSON.stringify(out);

        return json;
    }

    toString() {
        return this.getFullName();
    }

    get value() {
        return this.label;
    }
}

export default Player;
