import { useParams } from "react-router-dom";
import { useFetchActivity } from "../../hooks/remote";

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

  return (
    <main style={{ padding: "1rem 0" }}>
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
    </main>
  );
};

export default ActivityView;
