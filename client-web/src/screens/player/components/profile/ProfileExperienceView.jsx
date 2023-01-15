import React from "react";
import RoundedImageView from "../../../../components/RoundedImageView";
import StatView from "../../../../components/StatView";
import { RIGHT } from "../../../../core/consts";
import { formatInt } from "../../../../core/utils/string";

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
    width: 266,
};

const valuesStyle = {
    display: "flex",
    justifyContent: "space-between",
};

const ProfileExperienceView = (props) => {
    const progression = props.progression;
    const showResets = props.showResets !== undefined ? props.showResets : true;

    if (!progression) {
        return <div style={containerStyle}></div>;
    }

    //Sometimes first string is all uppercase, sometimes capitalized
    //This is the make is consistent as Foo and not FOO
    let n = progression.step.name.split(" ");

    if (n.length > 0) {
        n[0] = n[0].toLocaleLowerCase();
        n[0] = n[0].charAt(0).toUpperCase() + n[0].slice(1);
    }
    const title = props.title ? `${props.title} : ${n.join(" ")}` : "";

    return (
        <div style={containerStyle}>
            <RoundedImageView
                height={64}
                width={64}
                image={progression.step.icon}
                backgroundColor="var(--color-list-item-detail-background)"
            />
            <div style={dataContainerStyle}>
                <div className="subsection_header">{`${title}`}</div>

                <div style={valuesStyle}>
                    <StatView
                        value={progression.currentProgress}
                        label="exp"
                        key="exp"
                    />
                    <StatView
                        value={`${formatInt(
                            progression.nextLevelAt -
                                progression.progressToNextLevel +
                                progression.currentProgress
                        )}`}
                        label="Next lvl"
                        key="next"
                    />

                    {(() => {
                        if (showResets) {
                            return (
                                <StatView
                                    value={formatInt(progression.resets)}
                                    label="resets"
                                    key="resets"
                                    align={RIGHT}
                                />
                            );
                        }
                    })()}
                </div>
            </div>
        </div>
    );
};

export default ProfileExperienceView;
