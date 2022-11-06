import { useParams } from "react-router-dom";
import { useFetchActivity } from "../../hooks/remote";

import PageSectionView from "../../components/PageSectionView";
import ScreenNavigationView from "../../components/ScreenNavigationView";
import ActivitySummaryView from "./components/ActivitySummaryView";
import ActivityLeadersView from "./components/ActivityLeadersView";
import ActivityGoldMedalsView from "./components/ActivityGoldMedalsView";
import ActivityWeaponListContainer from "./components/ActivityWeaponsView";
import ActivityTeamDetailsView from "./components/ActivityTeamDetailsView";
import ActivityPlayerEffectivenessView from "./components/ActivityPlayerEffectivenessView";
import LoadingAnimationView from "../../components/LoadingAnimationView";
import { ActivityNotFoundError } from "../../core/errors";

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

  const activityId = params.activityId ? params.activityId : props.activityId;
  //TODO error if no activity id

  const [activity, isLoading, error] = useFetchActivity(activityId);

  if (isLoading) {
    return <LoadingAnimationView message="Loading Activity data." />;
  }

  if (error) {
    if (error instanceof ActivityNotFoundError) {
      return <div>Activity Not Found : {activityId}</div>;
    }

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
      value: "Analysis",
      id: "analysis",
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
        <ActivitySummaryView details={details} teams={teams} />

        <div>
          <PageSectionView
            id="leaders"
            title="Leaderboard"
            description="Top players in activity"
          />
          <ActivityLeadersView players={players} />
        </div>

        <div>
          <PageSectionView
            id="medals"
            title="Gold Medals"
            description="Gold medals"
          />
          <ActivityGoldMedalsView players={players} />
        </div>

        <div>
          <PageSectionView
            id="analysis"
            title="Analysis"
            description="Plot chart showing player effectiveness (kills and deaths relative to efficiency)"
          />
          <ActivityPlayerEffectivenessView teams={teams} />
        </div>

        <div>
          <PageSectionView id="weapons" title="Weapons" description="Weapons" />
          <ActivityWeaponListContainer teams={teams} />
        </div>

        {teams.map((team, index) => {
          let id = "";
          if (!index) {
            id = "players";
          }

          return (
            <div key={team.name} id={id}>
              <PageSectionView
                id={team.name}
                title={`${team.name} Team`}
                description={`${team.name} Team details`}
              />
              <ActivityTeamDetailsView team={team} />
            </div>
          );
        })}

        <div>
          <PageSectionView
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
              <a href={`https://www.bungie.net/en/PGCR/${activityId}`}>
                View game at Bungie
              </a>
            </li>
            <li>
              <a href={`https://crucible.report/pgcr/${activityId}`}>
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
