import React, { useEffect, useState } from "react";
import ActivityInfoView from "../../../../components/ActivityInfoView";

import ErrorContainerView from "../../../../components/ErrorContainerView";
import LoadingAnimationView from "../../../../components/LoadingAnimationView";
import NoActivityImage from "./images/pvp_no_activity.jpg";
import RefreshStatusView from "../../../../components/RefreshStatusView";

import { useFetchPlayerProfile } from "../../../../hooks/remote";
import CurrentActivityView from "./CurrentActivityView";
import CompExperienceView from "./CompExperienceView";

const rootStyle = {
    width: 780,
    height: 120,
    display: "flex",
    flexDirection: "column",
    gap: 4,
    justifyContent: "flex-end",
};

const refreshStyle = {
    display: "flex",
    flexDirection: "column",
    height: 2,
    width: "100%",
};

const backgroundStyleBase = {
    height: "100%",
    width: "100%",
    backgroundSize: "cover",
    backgroundPosition: "center",
    borderRadius: 4,
};

const PlayerProfileView = (props) => {
    const memberId = props.memberId;
    const platformId = props.platformId;

    const refreshInterval = 10 * 1000;

    const [profile, isLoading, error] = useFetchPlayerProfile(
        refreshInterval,
        memberId,
        platformId
    );

    const [lastUpdate, setLastUpdate] = useState();

    useEffect(() => {
        setLastUpdate(new Date());
    }, [profile]);

    if (isLoading) {
        return <LoadingAnimationView message="Loading Player data." />;
    }

    if (error) {
        return <ErrorContainerView errors={[error]} />;
    }

    const currentActivity = profile.currentActivity;

    return (
        <div style={rootStyle}>
            <CurrentActivityView currentActivity={currentActivity} />
            <div style={refreshStyle}>
                <RefreshStatusView
                    lastUpdate={lastUpdate}
                    refreshInterval={refreshInterval}
                    align="left"
                    showLabel={false}
                    width="100%"
                />
            </div>
            <CompExperienceView profile={profile} />
        </div>
    );
};

export default PlayerProfileView;
