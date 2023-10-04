import React from "react";
import {
    CARD_EMPTY,
    CARD_FILLED,
} from "../../../overlay/components/CardSwatchView";
import { LEFT, RIGHT } from "../../../../core/consts";
import ProfileCardStatView from "./ProfileCardStatView";
import ProfileFlawlessView from "./ProfileFlawlessView";
import StatView from "../../../../components/StatView";

const rootStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "var(--gap-list-item)",
    justifyContent: "flex-start",

    backgroundColor: "var(--color-list-item-background)",
    borderRadius: "var(--radius-border)",
    padding: "12px",
    height: "64px",
};

const dataContainerStyle = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",

    gap: "var(--gap-list-item)",
};

const valuesStyle = {
    display: "flex",
    justifyContent: "flex-start",
    flexWrap: "wrap",
    gap: "var(--gap-list-item)",
};

const ProfileMercyView = (props) => {
    const profile = props.profile;
    let card =
        profile.lastActiveCharacterProfile.progressions.trials.currentCard;

    if (!card || !card.showMercy) {
        return "";
    }

    return (
        <div style={rootStyle}>
            <div style={dataContainerStyle}>
                <div className="subsection_header">Mercy Card Status</div>
            </div>
            <div style={valuesStyle}>
                <ProfileFlawlessView flawless={card.isFlawless} />

                <ProfileCardStatView
                    type={card.secondLossForgiven ? CARD_EMPTY : CARD_FILLED}
                    label="mercy"
                />

                {card.weeklyFlawless === 0 && (
                    <ProfileCardStatView
                        type={card.firstLossForgiven ? CARD_EMPTY : CARD_FILLED}
                        label="mercy"
                    />
                )}

                <StatView
                    value={card.roundsWon}
                    label="rounds"
                    key="rounds"
                    align={RIGHT}
                />

                <StatView
                    value={card.weeklyFlawless}
                    label="weekly"
                    key="weekly"
                    align={RIGHT}
                />
            </div>
        </div>
    );
};

export default ProfileMercyView;
