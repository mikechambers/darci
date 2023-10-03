import React from "react";
import RoundedImageView from "../../../../components/RoundedImageView";
import StatView from "../../../../components/StatView";
import { RIGHT } from "../../../../core/consts";
import ProfileFlawlessView from "./ProfileFlawlessView";
import ProfileMercyView from "./ProfileMercyView";
import ProfilePassageStatusView from "./ProfilePassageStatusView";
import MERCY_PASSAGE_ID from "../../../../core/data/PlayerProfile";

const dataContainerStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    marginLeft: "12px",
    gap: "var(--gap-list-item)",
};

const containerStyleBase = {
    display: "flex",
    backgroundColor: "var(--color-list-item-background)",
    borderRadius: "var(--radius-border)",
    padding: "12px",
};

const valuesStyle = {
    display: "flex",
    justifyContent: "flex-start",
    flexWrap: "wrap",
};

const TrialsCardView = (props) => {
    const profile = props.profile;

    let card =
        profile.lastActiveCharacterProfile.progressions.trials.currentCard;

    if (!card) {
        return "";
    }

    const containerStyle = {
        ...containerStyleBase,
        //width: card.showMercy ? 420 : 360,
    };

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
                </div>
            </div>
        </div>
    );
};

export default TrialsCardView;
