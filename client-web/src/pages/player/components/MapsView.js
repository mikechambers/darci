import { calculatePercent, calculateAverage } from "../../../utils/index";

const MapsView = (props) => {
  let maps = props.maps ? props.maps : [];

  maps.sort((a, b) => {
    return b.summary.activityCount - a.summary.activityCount;
  });

  console.log(maps);

  return (
    <table>
      <thead>
        <tr>
          <th className="left">NAME</th>
          <th className="right">GAMES</th>
          <th className="right">WINS</th>
          <th className="right">KILLS</th>
          <th className="right">ASSISTS</th>
          <th className="right">DEFEATS</th>
          <th className="right">DEATHS</th>
          <th className="right">KD</th>
          <th className="right">EFF</th>
          <th className="right">MERCIES</th>
          <th className="right">COMPLETED</th>
        </tr>
      </thead>
      <tbody>
        {maps.map((m, index) => {
          return (
            <tr key={m.referenceId}>
              <td className="left">{m.map.name}</td>
              <td className="right">
                {m.summary.wins}-{m.summary.losses}{" "}
              </td>
              <td className="right">{`${calculatePercent(
                m.summary.wins,
                m.summary.activityCount
              ).toFixed()}%`}</td>
              <td className="right">
                {calculateAverage(
                  m.summary.kills,
                  m.summary.activityCount
                ).toFixed(2)}
              </td>
              <td className="right">
                {calculateAverage(
                  m.summary.assists,
                  m.summary.activityCount
                ).toFixed(2)}
              </td>
              <td className="right">
                {calculateAverage(
                  m.summary.opponentsDefeated,
                  m.summary.activityCount
                ).toFixed(2)}
              </td>
              <td className="right">
                {calculateAverage(
                  m.summary.deaths,
                  m.summary.activityCount
                ).toFixed(2)}
              </td>
              <td className="right">{m.summary.killsDeathsRatio.toFixed(2)}</td>
              <td className="right">{m.summary.efficiency.toFixed(2)}</td>
              <td className="right">{`${calculatePercent(
                m.summary.mercies,
                m.summary.activityCount
              ).toFixed()}%`}</td>
              <td className="right">{`${calculatePercent(
                m.summary.completed,
                m.summary.activityCount
              ).toFixed()}%`}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default MapsView;
