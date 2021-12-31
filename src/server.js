const CharacterClassSelection = require("./CharacterClassSelection.js");

const express = require("express");
const Database = require('better-sqlite3');
const Mode = require("./Mode.js");
const Moment = require("./Moment.js");
const ActivityStoreInterface = require("./ActivityStoreInterface.js");

const db = new Database('/Users/mesh/Library/Application Support/dcli/dcli.sqlite3',
    { readonly: true, verbose: console.log });

const activityStore = new ActivityStoreInterface(db);

const app = express();
const port = 3000;
const hostname = "127.0.0.1";
let counter = 0;

app.get("/", (req, res) => {

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end("Hello World");
});

///player/member_id/class/mode/moment/end-moment/

//can append regex to each one : https://expressjs.com/en/guide/routing.html
app.get("/player/:member_id/:characterClass/:mode/:moment/:endMoment?/", (req, res) => {

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

    console.log(characterClassSelection);
    console.log(mode);
    console.log(moment.getDate());

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

app.get("/players/", (req, res) => {

    let rows = activityStore.retrieveSyncMembers();

    let out = JSON.stringify(rows);

    res.json(out);
});

app.listen(port, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});