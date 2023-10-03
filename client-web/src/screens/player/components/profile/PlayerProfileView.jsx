import React, { useEffect, useState } from "react";
import ActivityInfoView from "../../../../components/ActivityInfoView";

import ErrorContainerView from "../../../../components/ErrorContainerView";
import LoadingAnimationView from "../../../../components/LoadingAnimationView";
import NoActivityImage from "./images/pvp_no_activity.jpg";
import RefreshStatusView from "../../../../components/RefreshStatusView";

import { useFetchPlayerProfile } from "../../../../hooks/remote";
import CurrentActivityView from "./CurrentActivityView";
import CompExperienceView from "./CompExperienceView";
import TrialsExperienceView from "./TrialsExperienceView";
import IronBannerExperienceView from "./IronBannerExperienceView";
import ValorExperienceView from "./ValorExperienceView";
import TrialsCardView from "./TrialsCardView";
import ProfileMercyView from "./ProfileMercyView";

const rootStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "var(--gap-list-item)",
    justifyContent: "flex-end",
};

const refreshStyle = {
    display: "flex",
    flexDirection: "column",
    height: 2,
    width: "100%",
};

const expListStyle = {
    display: "flex",
    flexDirection: "row",
    gap: "var(--gap-list-item)",
    flexWrap: "wrap",
    justifyContent: "flex-start",
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
            <div>
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
            </div>
            <div style={expListStyle}>
                <ValorExperienceView profile={profile} />
                <CompExperienceView profile={profile} />
                <IronBannerExperienceView profile={profile} />
                <TrialsExperienceView profile={profile} />
                <TrialsCardView profile={profile} />
                <ProfileMercyView profile={profile} />
            </div>
        </div>
    );
};

export default PlayerProfileView;
