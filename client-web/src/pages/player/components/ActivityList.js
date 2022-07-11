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
          <th className="left">MAP</th>
          <th className="left">MODE</th>
          <th className="left">W/L</th>
          <th className="right">KILLS</th>
          <th className="right">ASSISTS</th>
          <th className="right">K+A</th>
          <th className="right">DEATHS</th>
          <th className="right">KD</th>
          <th className="right">EFF</th>
          <th className="right">COMPLETED</th>
          <th className="right">MERCY</th>
        </tr>
      </thead>
      <tbody>
        {activities.map((a, index) => {
          return (
            <tr key={a.activity.activityId}>
              <td className="left">
                <Link
                  to={`/activity/${a.activity.activityId}/${a.player.memberId}`}
                >
                  {a.activity.map.name}
                </Link>
              </td>
              <td className="left">{a.activity.mode.label}</td>
              <td className="left">{a.stats.standing.toString()}</td>
              <td className="right">{a.stats.kills}</td>
              <td className="right">{a.stats.assists}</td>
              <td className="right">{a.stats.opponentsDefeated}</td>
              <td className="right">{a.stats.deaths}</td>
              <td className="right">{a.stats.killsDeathsRatio.toFixed(2)}</td>
              <td className="right">{a.stats.efficiency.toFixed(2)}</td>
              <td className="right">{!a.stats.completed ? "FALSE" : ""}</td>
              <td className="right">
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
