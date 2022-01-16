const Mode = require("./packages/enums/Mode");
const Moment = require("./packages/enums/Moment");
const CharacterClass = require("./packages/enums/CharacterClass");
const EnumBase = require("./packages/enums/EnumBase");
const CharacterClassSelection = require("./packages/enums/CharacterClassSelection");
const Standing = require("./packages/enums/Standing");
const CompletionReason = require("./packages/enums/CompletionReason");
const ItemSubType = require("./packages/enums/ItemSubType");

const { calculateEfficiency,
    calculateKillsDeathsRatio,
    calculateKillsDeathsAssists } = require('./packages/utils');

module.exports = {
    EnumBase: EnumBase,
    Mode: Mode,
    Moment: Moment,
    CharacterClass: CharacterClass,
    CharacterClassSelection: CharacterClassSelection,
    Standing: Standing,
    CompletionReason: CompletionReason,
    calculateEfficiency,
    calculateKillsDeathsRatio,
    calculateKillsDeathsAssists,
    ItemSubType: ItemSubType,
};