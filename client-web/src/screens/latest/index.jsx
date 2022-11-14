/* MIT License
 *
 * Copyright (c) 2022 Mike Chambers
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import React from "react";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RefreshStatusView from "../../components/RefreshStatusView";
import { LATEST_ACTIVITY_REFRESH_INTERVAL } from "../../core/consts";
import { useFetchLatestActivityIdForMember } from "../../hooks/remote";
import ActivityView from "../activity";

const LatestView = (props) => {
    let params = useParams();
    let memberId = params.memberId;

    let [activityData, isLoading, loadError] =
        useFetchLatestActivityIdForMember(
            LATEST_ACTIVITY_REFRESH_INTERVAL,
            memberId
        );

    let activityId = activityData ? activityData.activityId : undefined;

    const [lastUpdate, setLastUpdate] = useState();
    useEffect(() => {
        setLastUpdate(new Date());
    }, [activityData]);

    if (!activityId) {
        return <div>Loading...</div>;
    }

    const rootStyle = {
        maxWidth: "var(--page-max-width)",
    };
    const refreshWrapperStyle = {
        padding: "var(--padding-page-container)",
    };

    return (
        <div style={rootStyle}>
            <div style={refreshWrapperStyle}>
                <RefreshStatusView
                    lastUpdate={lastUpdate}
                    refreshInterval={LATEST_ACTIVITY_REFRESH_INTERVAL}
                    align="left"
                />
            </div>
            <ActivityView activityId={activityId} />
        </div>
    );
};

export default LatestView;
