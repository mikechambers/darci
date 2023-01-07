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

const { CharacterClassSelection, Mode, Moment } = require("shared");
const path = require("path");
const {
    SERVER_RESPONSE_SUCCESS,
    SERVER_RESPONSE_ERROR,
} = require("shared/packages/consts");
const {
    SERVER_PORT,
    MANIFEST_CHECK_INTERVAL_MS,
    MAX_ACTIVITIES_PAGE_LIMIT,
    DB_PATH,
    MANIFEST_DB_PATH,
    MANIFEST_INFO_PATH,
} = require("./config");

const { ServerError } = require("./errors");

const express = require("express");
var os = require("os");

const ActivityStoreInterface = require("./interfaces/ActivityStoreInterface");
const ManifestInterface = require("./interfaces/ManifestInterface");
const OrderBy = require("shared/packages/enums/OrderBy");

const activityStore = new ActivityStoreInterface(DB_PATH);
const manifestInterface = new ManifestInterface(
    MANIFEST_DB_PATH,
    MANIFEST_INFO_PATH,
    MANIFEST_CHECK_INTERVAL_MS
);

const app = express();

const port = SERVER_PORT;

var hostname = os.hostname();

app.get("/api/player/latest/:memberId", (req, res, next) => {
    let startTime = new Date().getTime();
    let memberId = req.params.memberId;

    let activityId = activityStore.retrieveLastestActivityIdForMember(memberId);

    let out = {
        activityId: activityId,
    };

    const query = {
        memberId: memberId,
        executionTime: new Date().getTime() - startTime,
    };
    out.query = query;

    sendJsonResponse(res, out);
});

app.get("/api/activity/:activityId/", (req, res, next) => {
    let startTime = new Date().getTime();
    let activityId = req.params.activityId;

    let out = activityStore.retrieveActivity(activityId);

    let found = true;
    if (!out) {
        found = false;
        out = {};
    }

    const query = {
        found: found,
        activityId: activityId,
        executionTime: new Date().getTime() - startTime,
    };
    out.query = query;

    sendJsonResponse(res, out);
});

///player/member_id/class/mode/moment/end-moment/
//can append regex to each one : https://expressjs.com/en/guide/routing.html
app.get(
    "/api/player/activities/:member_id/:characterClass/:mode/:startMoment/:endMoment?/",
    (req, res, next) => {
        let startTime = new Date().getTime();

        let orderBy = OrderBy.fromId(req.query.orderby);

        let startMoment = Moment.fromType(req.params.startMoment);

        let memberId = req.params.member_id;

        let characterClassSelection = CharacterClassSelection.fromType(
            req.params.characterClass
        );

        let mode = Mode.fromType(req.params.mode);

        let endMoment =
            req.params.endMoment !== undefined
                ? Moment.fromType(req.params.endMoment)
                : Moment.NOW;

        const startDate = startMoment.getDate();
        const endDate = endMoment.getDate();

        const activities = activityStore.retrieveActivities(
            memberId,
            characterClassSelection,
            mode,
            startDate,
            endDate,
            orderBy
        );

        const player = activityStore.retrieveMember(memberId);

        const query = {
            startDate: startDate,
            endDate: endDate,
            startMoment: startMoment.toString(),
            endMoment: endMoment.toString(),
            mode: mode.toString(),
            classSelection: characterClassSelection.toString(),
            executionTime: new Date().getTime() - startTime,
        };

        const out = {
            query: query,
            player: player,
            activities: activities,
            page: {
                total: activities.length,
                index: 0,
                pageSize: MAX_ACTIVITIES_PAGE_LIMIT,
                packageSize: activities.length,
            },
        };

        sendJsonResponse(res, out);
    }
);

app.get(
    "/api/player/:member_id/:characterClass/:mode/:startMoment/:endMoment?/",
    (req, res, next) => {
        let startTime = new Date().getTime();

        let startMoment = Moment.fromType(req.params.startMoment);

        let memberId = req.params.member_id;
        let characterClassSelection = CharacterClassSelection.fromType(
            req.params.characterClass
        );

        let mode = Mode.fromType(req.params.mode);

        let endMoment =
            req.params.endMoment !== undefined
                ? Moment.fromType(req.params.endMoment)
                : Moment.NOW;

        const startDate = startMoment.getDate();
        const endDate = endMoment.getDate();

        const summary = activityStore.retrieveActivitySummary(
            memberId,
            characterClassSelection,
            mode,
            startDate,
            endDate
        );

        const weapons = activityStore.retrieveWeaponsSummary(
            memberId,
            characterClassSelection,
            mode,
            startDate,
            endDate
        );

        const medals = activityStore.retrieveMedalsSummary(
            memberId,
            characterClassSelection,
            mode,
            startDate,
            endDate
        );

        const maps = activityStore.retrieveMapsSummary(
            memberId,
            characterClassSelection,
            mode,
            startDate,
            endDate
        );

        const meta = activityStore.retrieveMetaWeaponsSummary(
            memberId,
            characterClassSelection,
            mode,
            startDate,
            endDate
        );

        const characterClassMeta =
            activityStore.retrieveCharacterClassMetaSummary(
                memberId,
                characterClassSelection,
                mode,
                startDate,
                endDate
            );

        const player = activityStore.retrieveMember(memberId);

        summary.weapons = weapons;
        summary.medals = medals;

        const query = {
            startDate: startDate,
            endDate: endDate,
            startMoment: startMoment.toString(),
            endMoment: endMoment.toString(),
            mode: mode.toString(),
            classSelection: characterClassSelection.toString(),
            executionTime: new Date().getTime() - startTime,
        };

        const out = {
            query: query,
            player: player,
            summary: summary,
            //activities: activities,
            maps: maps,
            meta: meta,
            characterClassMeta: characterClassMeta,
        };

        sendJsonResponse(res, out);
    }
);

app.get("/api/players/", (req, res, next) => {
    let startTime = new Date().getTime();
    let players = activityStore.retrieveSyncMembers();

    try {
        players.sort((a, b) =>
            a.bungieDisplayName.localeCompare(b.bungieDisplayName)
        );
    } catch (e) {
        console.log("/api/players error sorting", e);
    }

    //TODO: add query data to players return to be standard with other calls

    const out = {
        query: { executionTime: new Date().getTime() - startTime },
        players: players,
    };

    sendJsonResponse(res, out);
});

const manifestNoUpdateData = { updated: false };
app.get("/manifest/:version/", (req, res, next) => {
    //let version = req.params.version ? atob(req.params.version) : undefined;

    let version = req.params.version
        ? Buffer.from(req.params.version).toString("base64")
        : undefined;
    const manifestNeedsUpdating = manifestInterface.hasUpdatedManifest(version);

    let out = manifestNoUpdateData;

    if (manifestNeedsUpdating) {
        out = manifestInterface.manifest;
        out.updated = true;
    }

    sendJsonResponse(res, out);
});

app.use(express.static(path.join(__dirname, "../client-web/build/")));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client-web/build/index.html"));
});

const sendJsonResponse = (res, data) => {
    const out = {
        response: data,
        status: SERVER_RESPONSE_SUCCESS,
    };

    res.json(out);
};

//Error handler
app.use(function (err, req, res, next) {
    console.log("ERROR HANDLER");
    console.error(err.stack);

    let msg = err.message;
    let name = err.name;

    if (!(err instanceof ServerError)) {
        msg = `Server runtime error [${err.name}].`;
        name = ServerError.SERVER_RUNTIME_ERROR;
    }

    const out = {
        response: undefined,
        status: SERVER_RESPONSE_ERROR,
        error: {
            message: msg,
            name: name,
        },
    };

    res.json(out);
});

const init = async () => {
    console.log("Initializing Manifest");
    await manifestInterface.init();

    //will throw if there is a version mismatch between what is expected
    //and what is in db
    activityStore.checkVersion();

    app.listen(port, () => {
        console.log(`Server running at http://${hostname}:${port}/`);
    });
};

init();
