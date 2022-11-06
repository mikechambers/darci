import { useParams } from "react-router-dom";
import RefreshStatusView from "../../components/RefreshStatusView";
import { LATEST_ACTIVITY_REFRESH_INTERVAL } from "../../core/consts";
import { useFetchLatestActivityIdForMember } from "../../hooks/remote";
import ActivityView from "../activity";

const LatestView = (props) => {
  let params = useParams();
  let memberId = params.memberId;

  let [activityId, isLoading, loadError] = useFetchLatestActivityIdForMember(
    LATEST_ACTIVITY_REFRESH_INTERVAL,
    memberId
  );

  if (!activityId) {
    return <div>Loading...</div>;
  }

  const rootStyle = {
    maxWidth: "var(--page-max-width)",
  };
  const refreshWrapperStyle = {
    padding: "var(--padding-page-container)",
  };

  return (
    <div style={rootStyle}>
      <div style={refreshWrapperStyle}>
        <RefreshStatusView
          lastUpdate={new Date()}
          refreshInterval={LATEST_ACTIVITY_REFRESH_INTERVAL}
          align="left"
        />
      </div>
      <ActivityView activityId={activityId} />
    </div>
  );
};

export default LatestView;
