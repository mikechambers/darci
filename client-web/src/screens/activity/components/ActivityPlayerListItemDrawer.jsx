import ActivityPlayerMedalsView from "./ActivityPlayerMedalsView";
import ActivityPlayerStatBreakdownView from "../../../components/ActivityPlayerStatBreakdownView";
import ActivityPlayerWeaponsList from "../../../components/ActivityPlayerWeaponsList";
import DestinyTrackerButton from "../../../components/DestinyTrackerButton";
import DurationView from "../../../components/DurationView";
import TrialsReportButton from "../../../components/TrialsReportButton";
import { SMALL } from "../../../core/consts";

const ActivityPlayerListItemDrawer = (props) => {
  const rootStyle = {
    height: "min-content",
    display: "flex",
    flexDirection: "column",
    rowGap: 20,
  };

  const statsContainterStyle = {
    display: "grid",
    gridTemplateColumns: "55% 25% 20%",
    justifyItems: "center",
  };

  const infoContainerStyle = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  };

  const linksStyle = {
    display: "flex",
    flexDirection: "row",
    columnGap: 4,
  };

  const player = props.player;

  return (
    <div style={rootStyle} className="list_item_drawer">
      <div style={statsContainterStyle}>
        <ActivityPlayerWeaponsList weapons={player.stats.extended.weapons} />
        <ActivityPlayerStatBreakdownView stats={player.stats} />
        <ActivityPlayerMedalsView
          medals={player.stats.extended.medals}
          size={SMALL}
        />
      </div>
      <div style={infoContainerStyle}>
        <div>
          <DurationView duration={player.stats.timePlayedSeconds * 1000} />
        </div>
        <div style={linksStyle}>
          <DestinyTrackerButton
            url={`https://destinytracker.com/destiny-2/profile/bungie/${player.player.memberId}/overview`}
            desription="View player on Destiny Tracker."
          />
          <TrialsReportButton
            url={`https://destinytrialsreport.com/report/${player.player.platformId}/${player.player.memberId}`}
            descrption="View player on Trials Report"
          />
        </div>
      </div>
    </div>
  );
};

export default ActivityPlayerListItemDrawer;
