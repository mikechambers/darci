import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RefreshStatusView from "../../components/RefreshStatusView";
import { LATEST_ACTIVITY_REFRESH_INTERVAL } from "../../core/consts";
import { useFetchLatestActivityIdForMember } from "../../hooks/remote";
import ActivityView from "../activity";

const LatestView = (props) => {
  let params = useParams();
  let memberId = params.memberId;

  let [activityData, isLoading, loadError] = useFetchLatestActivityIdForMember(
    LATEST_ACTIVITY_REFRESH_INTERVAL,
    memberId
  );

  let activityId = activityData ? activityData.activityId : undefined;

  const [lastUpdate, setLastUpdate] = useState();
  useEffect(() => {
    setLastUpdate(new Date());
  }, [activityData]);

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
          lastUpdate={lastUpdate}
          refreshInterval={LATEST_ACTIVITY_REFRESH_INTERVAL}
          align="left"
        />
      </div>
      <ActivityView activityId={activityId} />
    </div>
  );
};

export default LatestView;
