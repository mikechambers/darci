import React from "react";
import RoundedImageView from "../../../../components/RoundedImageView";
import StatView from "../../../../components/StatView";

const dataContainerStyle = {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    marginLeft: "12px",
};

const containerStyle = {
    display: "flex",
    backgroundColor: "var(--color-list-item-background)",
    borderRadius: "var(--radius-border)",
    padding: "12px",
    //gap: "var(--gap-list-item)",
    width: 260,
};

const valuesStyle = {
    display: "flex",
    justifyContent: "space-between",
};

const ProfileExperienceView = (props) => {
    const progression = props.progression;
    const title = props.title ? `${props.title} : ` : "";

    return (
        <div style={containerStyle}>
            <RoundedImageView
                height={64}
                width={64}
                image={progression.step.icon}
                //backgroundColor="var(--color-list-item-detail-background)"
                backgroundColor="#3b4569"
            />
            <div style={dataContainerStyle}>
                <div className="subsection_header">{`${title}${progression.step.name}`}</div>

                <div style={valuesStyle}>
                    <StatView
                        value={progression.currentProgress}
                        label="level"
                        key="level"
                    />
                    <StatView
                        value={`+${
                            progression.nextLevelAt -
                            progression.progressToNextLevel
                        }`}
                        label="Next"
                        key="next"
                    />
                </div>
            </div>
        </div>
    );
};

export default ProfileExperienceView;
