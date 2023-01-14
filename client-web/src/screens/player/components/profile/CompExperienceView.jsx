import React from "react";
import ProfileExperienceView from "./ProfileExperienceView";

const CompExperienceView = (props) => {
    const profile = props.profile;

    if (!profile) {
        return "";
    }

    const char = profile.lastActiveCharacterProfile;

    return (
        <ProfileExperienceView
            progression={char.progressions.competitive}
            title="Competitive"
            showResets={false}
        />
    );
};

export default CompExperienceView;
