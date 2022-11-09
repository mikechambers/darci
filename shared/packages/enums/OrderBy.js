const EnumBase = require("./EnumBase");

class OrderBy extends EnumBase {
  static PERIOD = new OrderBy("Period", "period", "Period");
  static KILLS = new OrderBy("Kills", "kills", "Kills");
  static ASSISTS = new OrderBy("Assists", "assists", "Assists");
  static SCORE = new OrderBy("Score", "score", "Score");
  static OPPONENTS_DEFEATED = new OrderBy(
    "Opponents Defeated",
    "opponentsDefeated",
    "Opponents Defeated"
  );
  static DEATHS = new OrderBy("Deaths", "deaths", "Deaths");

  static PRECISION_KILLS = new OrderBy(
    "Precision Kills",
    "precisionKills",
    "Precision Kills"
  );
  static GRENADE_KILLS = new OrderBy(
    "Grenade Kills",
    "grenadeKills",
    "Grenade Kills"
  );
  static MELEE_KILLS = new OrderBy("Melee Kills", "meleeKills", "Melee Kills");
  static SUPER_KILLS = new OrderBy("Super Kills", "superKills", "Super Kills");
  static MEDALS_EARNED = new OrderBy(
    "Medals Earned",
    "medalsEarned",
    "Medals Earned"
  );

  static UNKNOWN = new OrderBy("Unknown", "unknown", "Unknown");

  constructor(type, id, label = undefined) {
    super(type, id, label);
  }

  static fromId(id) {
    let out = super._fromId(OrderBy, id);

    if (out != undefined) {
      return out;
    }

    return OrderBy.UNKNOWN;
  }

  static fromType(type) {
    let out = super._fromType(OrderBy, type);

    if (out != undefined) {
      return out;
    }

    return OrderBy.UNKNOWN;
  }
}

module.exports = OrderBy;
