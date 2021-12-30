const EnumBase = require("./EnumBase.js");

class Mode extends EnumBase {
    static Unknown = new Mode("Unknown", -1);
    static NONE = new Mode("None", 0);
    //static TITAN = new Mode("Story", 2);
    //static TITAN = new Mode("Strike", 3);
    //static TITAN = new Mode("Raid", 4);
    static ALL_PVP = new Mode("AllPvP", 5);
    //static TITAN = new Mode("Patrol", 6);
    //static TITAN = new Mode("AllPvE", 7);
    //static TITAN = new Mode("Reserved9", 9);
    static CONTROL = new Mode("Control", 10);
    //static TITAN = new Mode("Reserved11", 11);
    static CLASH = new Mode("Clash", 12);
    //static TITAN = new Mode("Reserved13", 13);
    static CRIMSON_DOUBLES = new Mode("CrimsonDoubles", 15);
    //static TITAN = new Mode("Nightfall", 16);
    //static TITAN = new Mode("HeroicNightfall", 17);
    //static TITAN = new Mode("AllStrikes", 18);
    static IRON_BANNER = new Mode("IronBanner", 19);
    //static TITAN = new Mode("Reserved20", 20);
    //static TITAN = new Mode("Reserved21", 21);
    //static TITAN = new Mode("Reserved22", 22);
    //static TITAN = new Mode("Reserved24", 24);
    static ALL_MAYHEM = new Mode("AllMayhem", 25);
    //static TITAN = new Mode("Reserved26", 26);
    //static TITAN = new Mode("Reserved27", 27);
    //static TITAN = new Mode("Reserved28", 28);
    //static TITAN = new Mode("Reserved29", 29);
    //static TITAN = new Mode("Reserved30", 30);
    static SUPREMACY = new Mode("Supremacy", 31);
    static PRIVATE_MATCHES_ALL = new Mode("PrivateMatchesAll", 32);
    static SURVIVAL = new Mode("Survival", 37);
    static COUNTDOWN = new Mode("Countdown", 38);
    static TRIALS_OF_THE_NINE = new Mode("TrialsOfTheNine", 39);
    //static TITAN = new Mode("Social", 40);
    static TRIALS_COUNTDOWN = new Mode("TrialsCountdown", 41);
    static TRIALS_SURVIVAL = new Mode("TrialsSurvival", 42);
    static IRON_BANNER_CONTROL = new Mode("IronBannerControl", 43);
    static IRON_BANNER_CLASH = new Mode("IronBannerClash", 44);
    static IRON_BANNER_SUPREMACY = new Mode("IronBannerSupremacy", 45);
    //static TITAN = new Mode("ScoredNightfall", 46);
    //static TITAN = new Mode("ScoredHeroicNightfall", 47);
    static RUMBLE = new Mode("Rumble", 48);
    static ALL_DOUBLES = new Mode("AllDoubles", 49);
    static DOUBLES = new Mode("Doubles", 50);
    static PRIVATE_MATCHES_CLASH = new Mode("PrivateMatchesClash", 51);
    static PRIVATE_MATCHES_CONTROL = new Mode("PrivateMatchesControl", 52);
    static PRIVATE_MATCHES_SUPREMACY = new Mode("PrivateMatchesSupremacy", 53);
    static PRIVATE_MATCHES_COUNTDOWN = new Mode("PrivateMatchesCountdown", 54);
    static PRIVATE_MATCHES_SURVIVAL = new Mode("PrivateMatchesSurvival", 55);
    static PRIVATE_MATCHES_MAYHEM = new Mode("PrivateMatchesMayhem", 56);
    static PRIVATE_MATCHES_RUMBLE = new Mode("PrivateMatchesRumble", 57);
    //static TITAN = new Mode("HeroicAdventure", 58);
    static SHOWDOWN = new Mode("Showdown", 59);
    static LOCKDOWN = new Mode("Lockdown", 60);
    static SCORCHED = new Mode("Scorched", 61);
    static SCORCHED_TEAM = new Mode("ScorchedTeam", 62);
    //static TITAN = new Mode("Gambit", 63);
    //static TITAN = new Mode("AllPvECompetitive", 64);
    static BREAKTHROUGH = new Mode("Breakthrough", 65);
    //static TITAN = new Mode("BlackArmoryRun", 66);
    static SALVAGE = new Mode("Salvage", 67);
    static IRON_BANNER_SALVAGE = new Mode("IronBannerSalvage", 68);
    static PVP_COMPETITIVE = new Mode("PvPCompetitive", 69);
    static PVP_QUICKPLAY = new Mode("PvPQuickplay", 70);
    static CLASH_QUICKPLAY = new Mode("ClashQuickplay", 71);
    static CLASH_COMPETITIVE = new Mode("ClashCompetitive", 72);
    static CONTROL_QUICKPLAY = new Mode("ControlQuickplay", 73);
    static CONTROL_COMPETITIVE = new Mode("ControlCompetitive", 74);
    //static TITAN = new Mode("GambitPrime", 75);
    //static TITAN = new Mode("Reckoning", 76);
    //static TITAN = new Mode("Menagerie", 77);
    //static TITAN = new Mode("VexOffensive", 78);
    //static TITAN = new Mode("NightmareHunt", 79);
    static ELIMINATION = new Mode("Elimination", 80);
    static MOMENTUM = new Mode("Momentum", 81);
    //static TITAN = new Mode("Dungeon", 82);
    //static TITAN = new Mode("Sundial", 83);
    static TRIALS_OF_OSIRIS = new Mode("TrialsOfOsiris", 84);
    //static TITAN = new Mode("Dares", 85);


    constructor(type, id) {
        super(type, id);
    }

    isPrivate() {
        return this === Mode.PRIVATE_MATCHES_ALL ||
            this === Mode.PRIVATE_MATCHES_CLASH ||
            this === Mode.PRIVATE_MATCHES_CONTROL ||
            this === Mode.PRIVATE_MATCHES_SUPREMACY ||
            this === Mode.PRIVATE_MATCHES_COUNTDOWN ||
            this === Mode.PRIVATE_MATCHES_SURVIVAL ||
            this === Mode.PRIVATE_MATCHES_MAYHEM ||
            this === Mode.PRIVATE_MATCHES_RUMBLE;
    }

    static fromId(id) {
        let out = super._fromString(Mode, id);

        if (out != undefined) {
            return out;
        }

        return this.UNKNOWN;
    }

    static fromString(type) {

        let out = super._fromString(Mode, type);

        if (out != undefined) {
            return out;
        }

        return this.UNKNOWN;
    }

}

module.exports = Mode;