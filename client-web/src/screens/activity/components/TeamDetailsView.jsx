import ActivityPlayerList from "./ActivityPlayerList";
import TeamSummaryView from "./TeamSummaryView";

const TeamDetailsView = (props) => {
  const team = props.team;
  const players = team.players;

  return (
    <div>
      <TeamSummaryView team={team} />
      <ActivityPlayerList players={players} />
    </div>
  );
};

export default TeamDetailsView;
