import ListView from "../../components/ListView";
import PageSectionView from "../../components/PageSectionView";

const rootStyle = {
  height: "100%",
  padding: "0px var(--padding-page-container)",
  display: "flex",
  flexDirection: "column",
  gap: "30px",
};

const modes = [
  "AllPvP",
  "Control",
  "Clash",
  "CrimsonDoubles",
  "IronBanner",
  "Mayhem",
  "Supremacy",
  "PrivateMatchesAll",
  "Survival",
  "Countdown",
  "TrialsOfTheNine",
  "TrialsCountdown",
  "TrialsSurvival",
  "IronBannerControl",
  "IronBannerClash",
  "IronBannerSupremacy",
  "Rumble",
  "AllDoubles",
  "Showdown",
  "Lockdown",
  "Scorched",
  "ScorchedTeam",
  "Breakthrough",
  "Salvage",
  "IronBannerSalvage",
  "Competitive",
  "Quickplay",
  "ClashQuickplay",
  "ClashCompetitive",
  "ControlQuickplay",
  "ControlCompetitive",
  "Elimination",
  "Momentum",
  "TrialsOfOsiris",
  "Rift",
  "ZoneControl",
  "IronBannerRift",
];

const moments = [
  "Daily",
  "Weekend",
  "Weekly",
  "Day",
  "Week",
  "Month",
  "AllTime",
  "Launch",
  "RedWar",
  "CurseOfOsiris",
  "Warmind",
  "SeasonOfTheOutlaw",
  "SeasonOfTheForge",
  "SeasonOfTheDrifter",
  "SeasonOfOpulence",
  "SeasonOfTheUndying",
  "SeasonOfDawn",
  "SeasonOfTheWorthy",
  "SeasonOfArrivals",
  "SeasonOfTheHunt",
  "SeasonOfTheChosen",
  "SeasonOfTheSplicer",
  "SeasonOfTheLost",
  "SeasonOfTheRisen",
  "WitchQueen",
  "SeasonOfTheHaunted",
  "SeasonOfThePlunder",
];

const seasons = [
  "RedWar",
  "CurseOfOsiris",
  "Warmind",
  "SeasonOfTheOutlaw",
  "SeasonOfTheForge",
  "SeasonOfTheDrifter",
  "SeasonOfOpulence",
  "SeasonOfTheUndying",
  "SeasonOfDawn",
  "SeasonOfTheWorthy",
  "SeasonOfArrivals",
  "SeasonOfTheHunt",
  "SeasonOfTheChosen",
  "SeasonOfTheSplicer",
  "SeasonOfTheLost",
  "SeasonOfTheRisen",
  "SeasonOfTheHaunter",
  "SeasonOfPlunder",
];

const classes = ["All", "Hunter", "Titan", "Warlock"];

const configListStyle = {
  display: "flex",
  gap: "36px",
};

const AboutView = (props) => {
  return (
    <div style={rootStyle}>
      <div>
        <p>
          darci is a self hosted platform for aggregating, viewing and analyzing
          Destiny 2 PVP stats.
        </p>
        <p>
          {" "}
          Its is built around the concept of players modes, and moments. While
          the UI exposes a number of options for modes and moments, it is also
          possible to manually enter modes and moments not exposed by the UI.
        </p>
      </div>
      <PageSectionView title="URL Formats" />
      <div>
        <p className="list_subtitle">Specify Start and End Moment</p>

        <p>
          <code>
            /player/[PLAYER_MEMBER_ID]/[PLAYER_PLATFORM]/[CLASS]/[MODE]/m/[FROM_MOMENT]/[TO_MOMENT]/
          </code>
        </p>
        <p>End moment is optional, and defaults to the current time.</p>
      </div>
      <div>
        <p className="list_subtitle">Specify Season</p>

        <p>
          <code>
            /player/[PLAYER_MEMBER_ID]/[PLAYER_PLATFORM]/[CLASS]/s/[SEASON]
          </code>
        </p>
      </div>

      <PageSectionView title="URL Options" />
      <div style={configListStyle}>
        <ListView items={classes} title="Class" />
        <ListView items={modes} title="Modes" />
        <ListView items={moments} title="Moments" />
        <ListView items={seasons} title="Seasons" />
      </div>

      <PageSectionView title="About" />
      <p>
        darci is currently under development, and is
        <a href="https://github.com/mikechambers/dcli">available </a> under a{" "}
        <a href="https://github.com/mikechambers/darci/blob/main/LICENSE.md">
          MIT Open Source License
        </a>
        .
      </p>
      <p>
        If you run into an issue, or have suggestions or feature requests please
        <a href="https://github.com/mikechambers/darci/issues">
          log an issue
        </a>{" "}
        or share on the{" "}
        <a href="https://discord.gg/TEDQy65hhn">darci discord</a>.
      </p>
      <p>
        Created by <a href="http://www.mikechambers.com">Mike Chambers</a>. [
        <a href="https://twitter.com/mesh">Twitter</a>] | [
        <a href="https://github.com/mikechambers/">Github</a>]
      </p>
    </div>
  );
};

export default AboutView;
