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

const Mode = require("./packages/enums/Mode");
const Moment = require("./packages/enums/Moment");
const CharacterClass = require("./packages/enums/CharacterClass");
const EnumBase = require("./packages/enums/EnumBase");
const CharacterClassSelection = require("./packages/enums/CharacterClassSelection");
const Standing = require("./packages/enums/Standing");
const CompletionReason = require("./packages/enums/CompletionReason");
const ItemSubType = require("./packages/enums/ItemSubType");
const AmmunitionType = require("./packages/enums/AmmunitionType");
const Season = require("./packages/enums/Season");
const OrderBy = require("./packages/enums/OrderBy");

const {
    calculateEfficiency,
    calculateKillsDeathsRatio,
    calculateKillsDeathsAssists,
    calculateRatio,
} = require("./packages/utils");

module.exports = {
    OrderBy: OrderBy,
    EnumBase: EnumBase,
    Mode: Mode,
    Moment: Moment,
    Season: Season,
    CharacterClass: CharacterClass,
    CharacterClassSelection: CharacterClassSelection,
    Standing: Standing,
    CompletionReason: CompletionReason,
    calculateEfficiency,
    calculateKillsDeathsRatio,
    calculateKillsDeathsAssists,
    calculateRatio,
    ItemSubType: ItemSubType,
    AmmunitionType: AmmunitionType,
};
