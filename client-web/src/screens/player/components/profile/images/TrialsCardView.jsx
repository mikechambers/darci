import React from "react";
import RoundedImageView from "../../../../../components/RoundedImageView";
import StatView from "../../../../../components/StatView";
import { RIGHT } from "../../../../../core/consts";
import OverlayTrialsFlawlessView from "../../../../overlay/components/OverlayTrialsFlawlessView";
import ProfileFlawlessView from "../ProfileFlawlessView";
import ProfilePassageStatusView from "../ProfilePassageStatusView";

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
    width: 360,
};

const valuesStyle = {
    display: "flex",
    justifyContent: "space-between",
};

const TrialsCardView = (props) => {
    const profile = props.profile;

    let card =
        profile.lastActiveCharacterProfile.progressions.trials.currentCard;

    if (!card) {
        return "";
    }

    return (
        <div style={containerStyle}>
            <RoundedImageView
                height={64}
                width={64}
                image={card.passage.icon}
                backgroundColor="var(--color-list-item-detail-background)"
            />
            <div style={dataContainerStyle}>
                <div className="subsection_header">{card.passage.name}</div>

                <div style={valuesStyle}>
                    <ProfilePassageStatusView card={card} />
                    <ProfileFlawlessView flawless={card.isFlawless} />

                    <StatView
                        value={card.roundsWon}
                        label="rounds"
                        key="rounds"
                        align={RIGHT}
                    />
                </div>
            </div>
        </div>
    );
};

export default TrialsCardView;
