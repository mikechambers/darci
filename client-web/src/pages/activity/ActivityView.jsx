import { useParams } from "react-router-dom";
import { useFetchActivity } from "../../hooks/remote";

import PageSectionTitle from "../player/components/PageSectionTitle";
import PageViewNavigation from "../player/components/PageViewNavigation";
import ActivityDetails from "./components/ActivityDetails";
import ActivityLeaderBoard from "./components/ActivityLeaderBoard";
import GoldMedalsList from "./components/GoldMedalsList";
import ActivityWeaponListContainer from "./components/ActivityWeaponListContainer";
import TeamSummaryView from "./components/TeamSummaryView";
import TeamDetailsView from "./components/TeamDetailsView";

const pageContainerStyle = {
  minWidth: "720px",
  padding: "0px var(--page-container-padding)",
  background:
    "linear-gradient(180deg, var(--background-color) 0%, rgba(54,54,54,1) 100%)",
};

const gappedStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "30px",
};

const ActivityView = (props) => {
  const params = useParams();
  const activityId = params.activityId;

  const [activity, isLoading, error] = useFetchActivity(activityId);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div>
        An error occured <br />
        {error.toString()}
        <br />
        {error.stack}
      </div>
    );
  }

  const pageLinks = [
    {
      value: "Leaderboard",
      id: "leaders",
    },
    {
      value: "Medals",
      id: "medals",
    },
    {
      value: "Weapons",
      id: "weapons",
    },
    {
      value: "Links",
      id: "links",
    },
  ];

  const details = activity.details;
  const teams = activity.teams;

  //todo: need to test this with rumble
  let players = [];
  for (const t of teams) {
    for (const p of t.players) {
      players.push({
        player: p,
        teamName: t.name,
      });
    }
  }

  return (
    <div style={pageContainerStyle} id="page_nav">
      <div style={gappedStyle}>
        <PageViewNavigation links={pageLinks} />
        <ActivityDetails details={details} teams={teams} />

        <div>
          <PageSectionTitle
            id="leaders"
            title="Leaderboard"
            description="Top players in activity"
          />
          <ActivityLeaderBoard players={players} />
        </div>

        <div>
          <PageSectionTitle
            id="medals"
            title="Gold Medals"
            description="Gold medals"
          />
          <GoldMedalsList players={players} />
        </div>

        <div>
          <PageSectionTitle
            id="weapons"
            title="Weapons"
            description="Weapons"
          />
          <ActivityWeaponListContainer teams={teams} />
        </div>

        <div>
          <PageSectionTitle
            id="insight"
            title="Insight"
            description="Data insight into match"
          />
        </div>

        <div>
          <PageSectionTitle
            id="alpha"
            title="Alpha Team"
            description="Alpha Team details"
          />
          <TeamDetailsView team={teams[0]} />
        </div>

        <div>
          <PageSectionTitle
            id="bravo"
            title="Bravo Team"
            description="Bravo Team details"
          />
        </div>

        <div>
          <PageSectionTitle
            id="links"
            title="Links"
            description="Links to game details on other sites."
          />
          <div>
            <a href={`https://destinytracker.com/destiny-2/pgcr/${activityId}`}>
              Destiny Tracker
            </a>
          </div>
          <div>
            <a href={`https://www.bungie.net/en/PGCR/${params.activityId}`}>
              Bungie PGCR
            </a>
          </div>
          <div>
            <a href={`https://crucible.report/pgcr/${params.activityId}`}>
              Trials Report
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityView;
