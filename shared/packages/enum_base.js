class EnumBase {

    #_type;
    #_id;

    constructor(type, id) {
        this._type = type;
        this._id = id;
    }

    get id() {
        return this._id;
    }

    get type() {
        return this._type;
    }

    toString() {
        return this.type;
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
}

module.exports = { EnumBase };
