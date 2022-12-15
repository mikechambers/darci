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

import { Season } from "shared";

export const FLOAT_DECIMAL_PRECISION = 2;
export const DESTINY_API_KEY = process.env.REACT_APP_DESTINY_API_KEY;
export const DATA_REFRESH_INTERVAL = 30 * 1000; //Every 30 seconds
export const MANIFEST_CHECK_INTERVAL = 60 * 1000 * 60; //60 minutes

export const PLAYER_VIEW_REFRESH_INTERVAL = 30 * 1000;
export const LATEST_ACTIVITY_REFRESH_INTERVAL = 30 * 1000;

export const LEFT = "LEFT";
export const RIGHT = "RIGHT";
export const CENTER = "CENTER";

export const SMALL = "SMALL";
export const MEDIUM = "MEDIUM";
export const LARGE = "LARGE";

export const MOMENT_TYPE = "m";
export const SEASON_TYPE = "s";

export const CURRENT_SEASON = Season.SEASON_OF_THE_SERAPH;
