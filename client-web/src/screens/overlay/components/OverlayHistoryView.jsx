import React from "react";
import { Moment, OrderBy } from "shared";
import { PLAYER_VIEW_REFRESH_INTERVAL } from "../../../core/consts";
import { useQuery } from "../../../hooks/browser";
import { useFetchPlayerActivities } from "../../../hooks/remote";
import ActivitySwatchView from "./ActivitySwatchView";

const listStyle = {
    display: "flex",
    flexDirection: "row",
    gap: 10,
};

const rootStyle = {
    display: "flex",
    flexDirection: "column",
    gap: 4,
};

const OverlayHistoryView = (props) => {
    const memberId = props.memberId;
    const mode = props.mode;
    const startMoment = props.startMoment;
    const characterClass = props.characterClass;
    const refreshInterval = props.refreshInterval
        ? props.refreshInterval
        : PLAYER_VIEW_REFRESH_INTERVAL;

    const config = props.config;

    const query = useQuery();

    let [
        playerActivities,
        isPlayerActivitiesLoading,
        playerActivitiesLoadError,
    ] = useFetchPlayerActivities({
        refreshInterval,
        memberId: memberId,
        mode,
        startMoment,
        endMoment: Moment.NOW,
        characterClass,
        hash: query.get("fr"),
        orderBy: OrderBy.PERIOD,
    });

    if (!playerActivities || playerActivitiesLoadError) {
        return "";
    }

    let activities = playerActivities.activities;
    if (config.count < activities.length) {
        activities = playerActivities.activities.slice(0, config.count);
    }

    const labelDiv = config.showTitle ? (
        <div className="overlay_title">Activity History</div>
    ) : (
        ""
    );

    return (
        <div style={rootStyle}>
            {labelDiv}
            <div style={listStyle}>
                {activities.map((a) => {
                    return (
                        <ActivitySwatchView
                            activity={a}
                            key={a.activity.activityId}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default OverlayHistoryView;
