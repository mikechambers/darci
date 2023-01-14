import React from "react";
import ProfileExperienceView from "./ProfileExperienceView";

const IronBannerExperienceView = (props) => {
    const profile = props.profile;

    if (!profile) {
        return "";
    }

    const char = profile.lastActiveCharacterProfile;

    return (
        <ProfileExperienceView
            progression={char.progressions.ironBanner}
            title="Iron Banner"
        />
    );
};

export default IronBannerExperienceView;
