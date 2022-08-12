import { useParams } from "react-router-dom";
import { useFetchActivity } from "../../hooks/remote";

import PageSectionTitle from "../../components/PageSectionTitle";
import ScreenNavigationView from "../../components/ScreenNavigationView";
import ActivityDetails from "./components/ActivityDetails";
import ActivityLeaderBoard from "./components/ActivityLeaderBoard";
import GoldMedalsList from "./components/GoldMedalsList";
import ActivityWeaponListContainer from "./components/ActivityWeaponListContainer";
import TeamDetailsView from "./components/TeamDetailsView";

const pageContainerStyle = {
  minWidth: "720px",
  padding: "0px var(--padding-page-container)",
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
      value: "Players",
      id: "players",
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
        <ScreenNavigationView links={pageLinks} />
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

        {teams.map((team, index) => {
          let id = "";
          if (!index) {
            id = "players";
          }

          return (
            <div key={team.name} id={id}>
              <PageSectionTitle
                id={team.name}
                title={`${team.name} Team`}
                description={`${team.name} Team details`}
              />
              <TeamDetailsView team={team} />
            </div>
          );
        })}

        <div>
          <PageSectionTitle
            id="links"
            title="Links"
            description="Links to game details on other sites."
          />

          <ul>
            <li>
              <a
                href={`https://destinytracker.com/destiny-2/pgcr/${activityId}`}
              >
                View Game on Destiny Tracker
              </a>
            </li>
            <li>
              <a href={`https://www.bungie.net/en/PGCR/${params.activityId}`}>
                View game at Bungie
              </a>
            </li>
            <li>
              <a href={`https://crucible.report/pgcr/${params.activityId}`}>
                View Game on Trials Report
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ActivityView;
