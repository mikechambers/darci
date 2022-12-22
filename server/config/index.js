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

const SERVER_PORT = 8080;
const MANIFEST_CHECK_INTERVAL_MS = 1000 * 60 * 60; //check once an hour
const MAX_ACTIVITIES_PAGE_LIMIT = 50;
const PLAYERS_ROW_CACHE_LIFETIME = 1000 * 60 * 60; //1 hour

const PLAYER_START_BUFFER = 30; //seconds
const DB_SCHEMA_VERSION = 10;

const DB_PATH = process.env.DCLI_DB_PATH;
const MANIFEST_DB_PATH = process.env.MANIFEST_DB_PATH;
const MANIFEST_INFO_PATH = process.env.MANIFEST_INFO_PATH;

module.exports = {
    SERVER_PORT,
    MANIFEST_CHECK_INTERVAL_MS,
    MAX_ACTIVITIES_PAGE_LIMIT,
    DB_PATH,
    MANIFEST_DB_PATH,
    MANIFEST_INFO_PATH,
    PLAYER_START_BUFFER,
    DB_SCHEMA_VERSION,
    PLAYERS_ROW_CACHE_LIFETIME,
};
