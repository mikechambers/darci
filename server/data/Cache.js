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

class Cache {
    #map;
    constructor() {
        this.#map = new Map();
    }

    add(item, name, lifetime) {
        let o = {
            item: item,
            lifetime: lifetime,
            added: new Date(),
        };
        this.#map.set(name, o);
    }

    get(name) {
        let item = this.#map.get(name);

        if (!item) {
            return;
        }

        let now = new Date();

        let dur = Math.abs(now.getTime() - item.added.getTime());

        if (dur > item.lifetime) {
            this.#map.delete(name);
            return;
        }

        return item.item;
    }

    remove(name) {
        this.#map.delete(name);
    }
}

module.exports = { Cache };
