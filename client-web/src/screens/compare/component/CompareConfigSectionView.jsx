import React from "react";
import PlayerNameView from "../../../components/PlayerNameView";
import { Moment, Season } from "shared";
import { SEASON_TYPE } from "../../../core/consts";

const CompareConfigSectionView = (props) => {
    const summary1 = props.summary1;
    const summary2 = props.summary2;
    const period1 = props.period1;
    const period2 = props.period2;

    return (
        <React.Fragment>
            {" "}
            <div className="compare_row compare_data_row" id="overview">
                <div></div>
                <div>
                    <PlayerNameView player={summary1.player} />
                </div>
                <div>
                    <PlayerNameView player={summary2.player} />
                </div>
                <div></div>
            </div>
            <div className="compare_row compare_data_row">
                <div>Class</div>
                <div>{summary1.query.classSelection}</div>
                <div>{summary1.query.classSelection}</div>
                <div></div>
            </div>
            <div className="compare_row compare_data_row">
                <div>Mode</div>
                <div>{summary1.query.mode}</div>
                <div>{summary1.query.mode}</div>
                <div></div>
            </div>
            <div className="compare_row compare_data_row">
                <div>Period</div>
                <div>{createPeriodData(period1)}</div>
                <div>{createPeriodData(period2)}</div>
                <div></div>
            </div>
        </React.Fragment>
    );
};

const createPeriodData = function (period) {
    if (period.type === SEASON_TYPE) {
        return Season.fromType(period.season).label;
    } else {
        let startMoment = Moment.fromType(period.startMoment);
        let endMoment = Moment.fromType(period.endMoment);
        return `${startMoment.label} to ${endMoment.label}`;
    }
};

export default CompareConfigSectionView;
