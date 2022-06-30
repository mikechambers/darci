import { Link } from "react-router-dom";
import { CompletionReason } from "shared";

const ActivityList = (props) => {
  let activityStats = props.activityStats;

  if (props.isLoading) {
    return <div>Loading...</div>;
  }

  let activities = activityStats.activities;

  //todo: need to test when an error is thrown

  return (
    <table style={{ width: 1000 }}>
      <thead>
        <tr>
          <th>MAP</th>
          <th>MODE</th>
          <th>W/L</th>
          <th>KILLS</th>
          <th>ASSISTS</th>
          <th>K+A</th>
          <th>DEATHS</th>
          <th>KD</th>
          <th>KD/A</th>
          <th>EFF</th>
          <th>MERCY</th>
        </tr>
      </thead>
      <tbody>
        {activities.map((a, index) => {
          return (
            <tr key={a.activity.activityId}>
              <td>
                <Link
                  to={`/activity/${a.activity.activityId}/${a.player.memberId}`}
                >
                  {a.activity.map.name}
                </Link>
              </td>
              <td>{a.activity.mode.label}</td>
              <td>{a.stats.standing.toString()}</td>
              <td>{a.stats.kills}</td>
              <td>{a.stats.assists}</td>
              <td>{a.stats.opponentsDefeated}</td>
              <td>{a.stats.deaths}</td>
              <td>{a.stats.killsDeathsRatio.toFixed(2)}</td>
              <td>{a.stats.killsDeathsAssists.toFixed(2)}</td>
              <td>{a.stats.efficiency.toFixed(2)}</td>
              <td>
                {a.stats.completionReason === CompletionReason.MERCY
                  ? "TRUE"
                  : ""}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default ActivityList;
