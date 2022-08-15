class EnumBase {
  #_type;
  #_id;
  #_label;

  constructor(type, id, label = undefined) {
    this._type = type;
    this._id = id;
    this._label = label;
  }

  get id() {
    return this._id;
  }

  get type() {
    return this._type;
  }

  static _fromId(classType, id) {
    let properties = Object.getOwnPropertyNames(classType);

    for (let p of properties) {
      if (p === "prototype" || p === "length" || p === "name") {
        continue;
      }

      let o = classType[p];

      if (!(o instanceof classType)) {
        continue;
      }

      if (id === o.id) {
        return o;
      }
    }

    return undefined;
  }

  static _fromString(classType, type) {
    if (!type) {
      return undefined;
    }
    let n = type.toUpperCase();
    let properties = Object.getOwnPropertyNames(classType);

    for (let p of properties) {
      let o = classType[p];

      if (!(o instanceof classType)) {
        continue;
      }

      if (n === o.type.toUpperCase()) {
        return o;
      }
    }
    return undefined;
  }

  get label() {
    if (!this._label) {
      return this._type;
    }

    return this._label;
  }

  toString() {
    return this._type;
  }
}

module.exports = EnumBase;
