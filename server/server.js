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
  PLAYERS_ROW_CACHE_LIFETIME,
} = require("./config");

const { ServerError } = require("./errors");

const { Cache } = require("./data/Cache");

const express = require("express");
var os = require("os");

const ActivityStoreInterface = require("./interfaces/ActivityStoreInterface");
const ManifestInterface = require("./interfaces/ManifestInterface");
const { timeStamp } = require("console");

const cache = new Cache();

const activityStore = new ActivityStoreInterface(DB_PATH);
const manifestInterface = new ManifestInterface(
  MANIFEST_DB_PATH,
  MANIFEST_INFO_PATH,
  MANIFEST_CHECK_INTERVAL_MS
);

const app = express();

const port = SERVER_PORT;

var hostname = os.hostname();

/*
app.get("/", (req, res, next) => {
  sendJsonResponse(res, {});
});
*/

app.get("/api/activity/:activityId/", (req, res, next) => {
  let startTime = new Date().getTime();
  let activityId = req.params.activityId;

  let out = activityStore.retrieveActivity(activityId);

  const query = {
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
    let startMoment = Moment.fromString(req.params.startMoment);

    let memberId = req.params.member_id;

    let characterClassSelection = CharacterClassSelection.fromString(
      req.params.characterClass
    );

    let mode = Mode.fromString(req.params.mode);

    let endMoment =
      req.params.endMoment !== undefined
        ? Moment.fromString(req.params.endMoment)
        : Moment.NOW;

    const startDate = startMoment.getDate();
    const endDate = endMoment.getDate();

    const activities = activityStore.retrieveActivities(
      memberId,
      characterClassSelection,
      mode,
      startDate,
      endDate
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

    let startMoment = Moment.fromString(req.params.startMoment);

    let memberId = req.params.member_id;
    let characterClassSelection = CharacterClassSelection.fromString(
      req.params.characterClass
    );

    let mode = Mode.fromString(req.params.mode);

    let endMoment =
      req.params.endMoment !== undefined
        ? Moment.fromString(req.params.endMoment)
        : Moment.NOW;

    const startDate = startMoment.getDate();
    const endDate = endMoment.getDate();

    console.log("startMoment", startMoment, startDate);
    console.log("endMoment", endMoment, endDate);
    console.log("mode", mode);
    console.log("characterClassSelection", characterClassSelection);
    console.log("memberId", memberId);

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
    };

    sendJsonResponse(res, out);
  }
);

const PLAYERS_ROW_CACHE = "PLAYERS_ROW_CACHE";
app.get("/api/players/", (req, res, next) => {
  //let startTime = new Date().getTime();
  let rows = cache.get(PLAYERS_ROW_CACHE);

  if (!rows) {
    rows = activityStore.retrieveSyncMembers();

    try {
      rows.sort((a, b) =>
        a.bungieDisplayName.localeCompare(b.bungieDisplayName)
      );
    } catch (e) {
      console.log("/api/players error sorting", e);
    }

    cache.add(rows, PLAYERS_ROW_CACHE, PLAYERS_ROW_CACHE_LIFETIME);
  }

  //TODO: add query data to players return to be standard with other calls

  let out = {
    players: rows,
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
