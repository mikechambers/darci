import React from "react";
import ProfileExperienceView from "./ProfileExperienceView";

const ValorExperienceView = (props) => {
    const profile = props.profile;

    if (!profile) {
        return "";
    }

    const char = profile.lastActiveCharacterProfile;

    return (
        <ProfileExperienceView
            progression={char.progressions.valor}
            title="Valor"
        />
    );
};

export default ValorExperienceView;
