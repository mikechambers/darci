import React from "react";
import { useParams } from "react-router-dom";
import ErrorContainerView from "../../components/ErrorContainerView";
import LoadingAnimationView from "../../components/LoadingAnimationView";
import ScreenNavigationView from "../../components/ScreenNavigationView";
import { PLAYER_VIEW_REFRESH_INTERVAL } from "../../core/consts";
import { useFetchPlayerProfile } from "../../hooks/remote";

const pageLinks = [
    {
        value: "Current",
        id: "current",
    },
];

const ProfileView = (props) => {
    const params = useParams();
    const memberId = params.memberId;
    const platformId = params.platformId;

    const refreshInterval = PLAYER_VIEW_REFRESH_INTERVAL;

    const [profile, isLoading, error] = useFetchPlayerProfile(
        refreshInterval,
        memberId,
        platformId
    );

    if (isLoading) {
        return <LoadingAnimationView message="Loading Player data." />;
    }

    if (error) {
        return <ErrorContainerView errors={[error]} />;
    }

    console.log(profile);

    return (
        <div id="page_nav" className="page_containter">
            <div className="page_content">
                <ScreenNavigationView links={pageLinks} />
            </div>
        </div>
    );
};

export default ProfileView;
