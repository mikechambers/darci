/* MIT License
 *
 * Copyright (c) 2023 Mike Chambers
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
import EnumBase from "shared/packages/enums/EnumBase";

class Stat extends EnumBase {
    static KD = new Stat("KD", "kd", "K/D");
    static EFFICIENCY = new Stat("Efficiency", "efficiency", "Efficiency");
    static KILLS = new Stat("Kills", "kills", "Kills");
    static DEATHS = new Stat("Deaths", "deaths", "Deaths");
    static DEFEATS = new Stat("Defeats", "defeats", "Defeats");
    static ASSISTS = new Stat("Assists", "assists", "Assists");
    static ACTIVITY_COUNT = new Stat(
        "ActivityCount",
        "activityCount",
        "Activity Count"
    );
    static WINS = new Stat("Wins", "wins", "Wins");
    static LOSSES = new Stat("Losses", "losses", "Losses");
    static WIN_PERCENT = new Stat("WinPercent", "winPercent", "Win Percent");

    static KILLS_GAME = new Stat("KillsGame", "killsGame", "Kills / g");
    static ASSISTS_GAME = new Stat("AssistsGame", "assistsGame", "Assists / g");
    static DEATHS_GAME = new Stat("DeathsGame", "deathsGame", "Deaths / g");
    static DEFEATS_GAME = new Stat("DefeatsGame", "defeatsGame", "Defeats / g");

    static MELEES = new Stat("Melees", "melees", "Melees");
    static MELEES_GAME = new Stat("MeleesGame", "meleesGame", "Melees / g");
    static SUPERS = new Stat("Supers", "supers", "Supers");
    static SUPERS_GAME = new Stat("SupersGame", "supersGame", "Supers / g");
    static GRENADES = new Stat("Grenades", "grenades", "Grenades");
    static GRENADES_GAME = new Stat(
        "GrenadesGame",
        "grenadesGame",
        "Grenades / g"
    );

    //ACTIVITY_COUNT, WINS, LOSSES, WIN %

    static UNKNOWN = new Stat("Unknown", "unknown", "Unknown");

    constructor(type, id, label = undefined) {
        super(type, id, label);
    }

    static fromId(id) {
        let out = super._fromId(Stat, id);

        if (out !== undefined) {
            return out;
        }

        return Stat.UNKNOWN;
    }

    static fromType(type) {
        let out = super._fromType(Stat, type);

        if (out !== undefined) {
            return out;
        }

        return Stat.UNKNOWN;
    }
}

export default Stat;
