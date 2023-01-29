import { LEFT, RIGHT } from "../../consts";

export default class ExportData {
    static MARKDOWN = "MARKDOWN";
    static CSV = "CSV";
    static JSON = "JSON";
    static TEXT = "TEXT";

    #headers;
    #rows;

    constructor(type, data) {
        this.#rows = [];
        this.#headers = [];
    }

    addHeader(label, align = LEFT) {
        this.#headers.push({ label, align });
    }

    //row is an array of values
    addRow(row) {
        this.#rows.push(row);
    }

    exportMarkdown() {
        //TODO: Need to escape | in the data with \|

        let headers = this.#headers.reduce((acc, cur) => {
            return `${acc}|${cur.label}`;
        }, "");

        let layout = this.#headers.reduce((acc, cur) => {
            let t = ":---";
            if (cur.align === RIGHT) {
                t = "---:";
            }

            return `${acc}|${t}`;
        }, "");

        if (this.#headers.length) {
            headers += "|\n";
            layout += "|\n";
        }

        let rows = this.#rows.reduce((acc, cur) => {
            return `${acc}|${cur.join("|")}|\n`;
        }, "");

        return `${headers}${layout}${rows}`;
    }

    export(type) {
        if (type === ExportData.MARKDOWN) {
            return this.exportMarkdown();
        }
    }
}
