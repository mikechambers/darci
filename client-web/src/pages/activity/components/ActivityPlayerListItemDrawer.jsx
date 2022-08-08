import { MEDIUM, SMALL } from "../../../components/Medal";
import PlayerMedalsView from "./PlayerMedalsView";
import ActivityPlayerStatBreakdownView from "./ActivityPlayerStatBreakdownView";
import ActivityPlayerWeaponsList from "./ActivityPlayerWeaponsList";
import DestinyTrackerLink from "./DestinyTrackerLink";
import DurationView from "./DurationView";
import TrialsReportLink from "./TrialsReportLink";

const ActivityPlayerListItemDrawer = (props) => {
  const rootStyle = {
    height: "min-content",
    display: "flex",
    flexDirection: "column",
    rowGap: 20,
  };

  const statsContainterStyle = {
    display: "grid",
    gridTemplateColumns: "60% 20% 20%",
    //flexDirection: "row",
    //justifyContent: "space-between",
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
    <div style={rootStyle} className="activity_details">
      <div style={statsContainterStyle}>
        <ActivityPlayerWeaponsList weapons={player.stats.extended.weapons} />
        <ActivityPlayerStatBreakdownView stats={player.stats} />
        <PlayerMedalsView medals={player.stats.extended.medals} size={SMALL} />
      </div>
      <div style={infoContainerStyle}>
        <div>
          <DurationView duration={player.stats.timePlayedSeconds * 1000} />
        </div>
        <div style={linksStyle}>
          <DestinyTrackerLink
            url={`https://destinytracker.com/destiny-2/profile/bungie/${player.player.memberId}/overview`}
            desription="View player on Destiny Tracker."
          />
          <TrialsReportLink
            url={`https://destinytrialsreport.com/report/${player.player.platformId}/${player.player.memberId}`}
            descrption="View player on Trials Report"
          />
        </div>
      </div>
    </div>
  );
};

export default ActivityPlayerListItemDrawer;
