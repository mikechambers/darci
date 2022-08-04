import { useParams } from "react-router-dom";
import { useFetchActivity } from "../../hooks/remote";

import PageSectionTitle from "../player/components/PageSectionTitle";
import PageViewNavigation from "../player/components/PageViewNavigation";
import ActivityDetails from "./components/ActivityDetails";
import ActivityLeaderBoard from "./components/ActivityLeaderBoard";
import LeaderList from "./components/LeaderList";

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
      value: "Overview",
      id: "overview",
    },
    {
      value: "Weapons",
      id: "weapons",
    },
    {
      value: "Meta Weapons",
      id: "meta",
    },
    {
      value: "medals",
      id: "medals",
    },
    {
      value: "maps",
      id: "maps",
    },
    {
      value: "games",
      id: "games",
    },
  ];

  const details = activity.details;
  const teams = activity.teams;

  return (
    <div style={pageContainerStyle}>
      <div style={gappedStyle}>
        <PageViewNavigation links={pageLinks} />
        <ActivityDetails details={details} teams={teams} />

        <div>
          <PageSectionTitle
            id="leaders"
            title="Leaderboard"
            description="Top players in activity"
          />
          <ActivityLeaderBoard teams={teams} />
        </div>

        <div>Activity Id : {activityId}</div>
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
      </div>
    </div>
  );
};

export default ActivityView;
