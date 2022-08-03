import { CompletionReason, Standing, Mode } from "shared";
import Player from "./Player";

const { calculateStats } = require("../utils/activity");

const TEAM_NAMES = [
  "Alpha",
  "Bravo",
  "Charlie",
  "Delta",
  "Echo",
  "Foxtrot",
  "Golf",
  "Hotel",
  "India",
  "Juliett",
  "Kilo",
  "Lima",
  "Mike",
  "November",
  "Oscar",
  "Papa",
  "Quebec",
  "Romeo",
  "Sierra",
  "Tango",
  "Uniform",
  "Victor",
  "Whiskey",
  "X-ray",
  "Yankee",
  "Zulu",
];

export default class Activity {
  teams;
  details;
  weapons;

  //team weapons
  //team summary

  //highest over stats

  constructor(data, manifest) {
    let activity = data.activity;

    let map = manifest.getActivityDefinition(activity.referenceId);
    activity.map = map;

    let modeInfo = manifest.getModeInfo(activity.directorActivityHash);
    activity.modeInfo = modeInfo;

    let mode = Mode.fromId(activity.mode);
    activity.mode = mode;

    let teams = data.teams;

    teams.forEach((team, index) => {
      team.name = TEAM_NAMES[index];
      for (const p of team.players) {
        p.player = Player.fromApi(p.player, manifest);

        //p.stats.standing = Standing.fromId(p.stats.standing);
        //p.stats.completionReason = Standing.fromId(p.stats.completionReason);

        p.stats = calculateStats(p.stats, mode);
        //TODO: get emblem from manifest and set here
      }
    });

    this.teams = teams;
    activity.period = new Date(activity.period);
    this.details = activity;
  }

  getCompletionReason(memberId = undefined) {
    let teams = this.teams;

    for (const team of teams) {
      for (const player of team.players) {
        //if memberId is not specified, and the completion reason is known
        //return the completion reason
        if (
          !memberId &&
          player.stats.completionReason !== CompletionReason.UNKNOWN
        ) {
          return player.stats.completionReason;
        }

        if (player.player.memberId === memberId) {
          return player.stats.standing;
        }
      }
    }

    return CompletionReason.UNKNOWN;
  }

  getStandingForMember(memberId) {
    let teams = this.teams;

    for (const team of teams) {
      for (const player of team.players) {
        if (player.player.memberId === memberId) {
          return player.stats.standing;
        }
      }
    }

    return Standing.UNKNOWN;
  }
}
