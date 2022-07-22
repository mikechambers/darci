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
  let activityId = req.params.activityId;

  let out = activityStore.retrieveActivity(activityId);

  sendJsonResponse(res, out);
});

///player/member_id/class/mode/moment/end-moment/
//can append regex to each one : https://expressjs.com/en/guide/routing.html
app.get(
  "/api/player/:member_id/:characterClass/:mode/:moment/:endMoment?/",
  (req, res, next) => {
    let memberId = req.params.member_id;

    let characterClassSelection = CharacterClassSelection.fromString(
      req.params.characterClass
    );

    //todo: need to add an all to classes
    //CharacterClassSelection (LastActive and All)
    if (characterClassSelection == characterClassSelection.UNKNOWN) {
      characterClassSelection = CharacterClassSelection.ALL;
    }

    let mode = Mode.fromString(req.params.mode);

    //todo: error out if mode or moment are unknown
    if (mode === Mode.UNKNOWN) {
      mode = Mode.ALL_PVP;
    }

    let moment = Moment.fromString(req.params.moment);

    if (moment === Moment.UNKNOWN) {
      moment = Moment.DAILY;
    }

    const endMoment = Moment.NOW;
    const activityData = activityStore.retrieveActivities(
      memberId,
      characterClassSelection,
      mode,
      moment.getDate(),
      endMoment.getDate()
    );

    const activities = activityData.activities;
    const meta = activityData.meta;

    const summary = activityStore.summarizeActivities(activities);
    const maps = activityStore.summarizeMaps(activities);

    //query for name, and whether we have synced? maybe only if no activities have returned

    //note: we could get this from the above query.
    const player = activityStore.retrieveMember(memberId);

    //rename retrieveActivitiesSince to retrieveActivities and pass in end moment date
    const query = {
      startDate: moment.getDate(),
      endDate: endMoment.getDate(),
      startMoment: moment.toString(),
      endMoment: endMoment.toString(),
      mode: mode.toString(),
      classSelection: characterClassSelection.toString(),
    };

    const length = activities.length;
    if (activities.length > MAX_ACTIVITIES_PAGE_LIMIT) {
      //note this remove items from the array
      activities.splice(MAX_ACTIVITIES_PAGE_LIMIT);
    }

    //TODO: right now, we return medal and weapon data for each activity, but dont use it
    //we could delete it here, so we dont have to send the data.

    const out = {
      query: query,
      player: player,
      activities: activities,
      meta: meta,
      summary: summary,
      maps: maps,
      page: {
        total: length,
        index: 0,
        pageSize: MAX_ACTIVITIES_PAGE_LIMIT,
        packageSize: activities.length,
      },
    };

    sendJsonResponse(res, out);
  }
);

app.get("/api/players/", (req, res, next) => {
  let rows = activityStore.retrieveSyncMembers();

  let out = {
    players: rows,
  };

  sendJsonResponse(res, out);
});

const manifestNoUpdateData = { updated: false };
app.get("/manifest/:version/", (req, res, next) => {
  let version = req.params.version ? atob(req.params.version) : undefined;
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
