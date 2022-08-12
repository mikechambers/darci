import ActivityPlayerList from "./ActivityPlayerList";
import ActivityTeamSummaryView from "./ActivityTeamSummaryView";

const ActivityTeamDetailsView = (props) => {
  const team = props.team;
  const players = team.players;

  return (
    <div>
      <ActivityTeamSummaryView team={team} />
      <ActivityPlayerList players={players} />
    </div>
  );
};

export default ActivityTeamDetailsView;
