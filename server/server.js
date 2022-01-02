const { CharacterClassSelection, Mode, Moment } = require('shared');

const express = require("express");

const ActivityStoreInterface = require("./activity_store_interface.js");
const ManifestInterface = require('./manifest_interface.js');

const DB_PATH = process.env.DCLI_DB_PATH;
const MANIFEST_DB_PATH = process.env.MANIFEST_DB_PATH;
const MANIFEST_INFO_PATH = process.env.MANIFEST_INFO_PATH;

const activityStore = new ActivityStoreInterface(DB_PATH);
const manifestInterface = new ManifestInterface(MANIFEST_DB_PATH, MANIFEST_INFO_PATH);

const app = express();
const port = 3001;
const hostname = "127.0.0.1";

app.get("/", (req, res) => {

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end("Hello World");
});


///player/member_id/class/mode/moment/end-moment/

//can append regex to each one : https://expressjs.com/en/guide/routing.html
app.get("/api/player/:member_id/:characterClass/:mode/:moment/:endMoment?/", (req, res) => {

    //todo: make sure its safe
    let memberId = req.params.member_id;



    let characterClassSelection = CharacterClassSelection.fromString(req.params.characterClass);

    //todo: need to add an all to classes
    //CharacterClassSelection (LastActive and All)
    if (characterClassSelection == characterClassSelection.UNKNOWN) {
        characterClassSelection = CharacterClassSelection.ALL;
    }

    let mode = Mode.fromString(req.params.mode);

    if (mode === Mode.UNKNOWN) {
        mode = Mode.ALL_PVP;
    }

    let moment = Moment.fromString(req.params.moment);

    if (moment === Moment.UNKNOWN) {

    }

    let endMoment = Moment.NOW;
    let activities = activityStore.retrieveActivities(memberId, characterClassSelection, mode, moment.getDate(), endMoment.getDate());

    //query for name, and whether we have synced? maybe only if no activities have returned

    //note: we could get this from the above query.
    let player = activityStore.retrieveMember(memberId);

    //rename retrieveActivitiesSince to retrieveActivities and pass in end moment date
    let query = {
        startDate: moment.getDate(),
        endDate: endMoment.getDate(),
        startMoment: moment.toString(),
        endMoment: endMoment.toString(),
        mode: mode.toString(),
        classSelection: characterClassSelection.toString(),
    }

    let out = {
        query: query,
        player: player,
        activities: activities,
    }


    res.json(out);
});

app.get("/api/players/", (req, res) => {

    let rows = activityStore.retrieveSyncMembers();

    let out = {
        players: rows,
    };

    res.json(out);
});

app.get("/manifest/:version/", (req, res) => {

    //check version verses manifest_info
    //if same, do what?
    //if different, generate new manifest json, and send
    //check timestamp from last generated, and send cached version depending on
    //how old it is

    res.json({});
});

app.listen(port, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});