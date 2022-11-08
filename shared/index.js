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

const {
  calculateEfficiency,
  calculateKillsDeathsRatio,
  calculateKillsDeathsAssists,
  calculateRatio,
} = require("./packages/utils");

module.exports = {
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
