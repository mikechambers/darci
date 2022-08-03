import { useParams } from "react-router-dom";
import { useFetchActivity } from "../../hooks/remote";
import PageViewNavigation from "../player/components/PageViewNavigation";

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

  return (
    <div style={pageContainerStyle}>
      <div style={gappedStyle}>
        <PageViewNavigation links={pageLinks} />
        <h2>Activity</h2>
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
