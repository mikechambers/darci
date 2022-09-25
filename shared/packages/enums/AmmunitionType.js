const EnumBase = require("./EnumBase");

class AmmunitionType extends EnumBase {
  static NONE = new AmmunitionType("None", 0);
  static PRIMARY = new AmmunitionType("Primary", 1);
  static SPECIAL = new AmmunitionType("Special", 2);
  static HEAVY = new AmmunitionType("Heavy", 3);
  static UNKNOWN = new AmmunitionType("Unknown", 4);

  constructor(type, id, label = undefined) {
    super(type, id, label);
  }

  static fromId(id) {
    let out = super._fromId(AmmunitionType, id);

    if (out != undefined) {
      return out;
    }

    return AmmunitionType.UNKNOWN;
  }

  static fromString(type) {
    let out = super._fromString(AmmunitionType, type);

    if (out != undefined) {
      return out;
    }

    return AmmunitionType.UNKNOWN;
  }
}

module.exports = AmmunitionType;
