const Mode = require("./packages/enums/mode");
const Moment = require("./packages/enums/moment");
const CharacterClass = require("./packages/enums/character_class");
const EnumBase = require("./packages/enums/enum_base");
const CharacterClassSelection = require("./packages/enums/character_class_selection");
const Standing = require("./packages/enums/standing");
const CompletionReason = require("./packages/enums/completion_reason");

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
    calculateKillsDeathsAssists
};