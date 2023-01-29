import { LEFT, RIGHT } from "../consts";
import ExportData from "./ExportData";

class TableData extends ExportData {
    static JSON = "JSON";

    #headers;
    #data;

    constructor(type) {
        super(type);
        this.#data = [];
        this.#headers = [];
    }

    addHeader(label, align = LEFT) {
        this.#headers.push({ label, align });
    }

    addRow(row) {
        this.#data.push(row);
    }

    export() {}

    toString() {
        return this.export();
    }
}
