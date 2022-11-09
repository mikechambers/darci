const EnumBase = require("./EnumBase");

class ItemSubType extends EnumBase {
  static UNKNOWN = new ItemSubType("Unknown", -1);
  static NONE = new ItemSubType("None", 0);
  static AUTO_RIFLE = new ItemSubType("Auto Rifle", 6);
  static SHOTGUN = new ItemSubType("Shotgun", 7);
  static MACHINE_GUN = new ItemSubType("Machine Gun", 8);
  static HAND_CANNON = new ItemSubType("Hand Cannon", 9);
  static ROCKET_LAUNCHER = new ItemSubType("Rocket Launcher", 10);
  static FUSION_RIFLE = new ItemSubType("Fusion Rifle", 11);
  static SNIPER_RIFLE = new ItemSubType("Sniper Rifle", 12);
  static PULSE_RIFLE = new ItemSubType("Pulse Rifle", 13);
  static SCOUT_RIFLE = new ItemSubType("Scout Rifle", 14);
  static SIDEARM = new ItemSubType("Sidearm", 17);
  static SWORD = new ItemSubType("Sword", 18);
  static LINEAR_FUSION_RIFLE = new ItemSubType("Linear Fusion Rifle", 22);
  static GRENADE_LAUNCHER = new ItemSubType("Grenade Launcher", 23);
  static SUBMACHINE_GUN = new ItemSubType("Submachine Gun", 24);
  static TRACE_RIFLE = new ItemSubType("Trace Rifle", 25);
  static BOW = new ItemSubType("Bow", 31);
  static GLAIVE = new ItemSubType("Glaive", 33);

  constructor(type, id, label = undefined) {
    super(type, id, label);
  }

  static fromId(id) {
    let out = super._fromId(ItemSubType, id);

    if (out != undefined) {
      return out;
    }

    return ItemSubType.UNKNOWN;
  }

  static fromType(type) {
    let out = super._fromType(ItemSubType, type);

    if (out != undefined) {
      return out;
    }

    return ItemSubType.UNKNOWN;
  }
}

module.exports = ItemSubType;
