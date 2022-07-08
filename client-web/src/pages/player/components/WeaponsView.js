import { calculatePercent, calculateAverage } from "../../../utils/index";

const WeaponsView = (props) => {
  let weapons = props.weapons ? props.weapons : [];
  let maxCount = props.max ? props.max : 5;

  weapons.sort((a, b) => {
    return b.kills - a.kills;
  });

  if (weapons.length > maxCount) {
    weapons = weapons.slice(0, maxCount);
  }

  return (
    <table>
      <thead>
        <tr>
          <th></th>
          <th className="left">WEAPON</th>
          <th className="right">GAMES</th>
          <th className="right">KILLS</th>
          <th className="right">KILLS / G</th>
          <th className="right">PRECISION</th>
          <th className="right">TYPE</th>
        </tr>
      </thead>
      <tbody>
        {weapons.map((w, index) => {
          return (
            <tr key={w.id}>
              <td>
                <div
                  className="weapon_icon"
                  style={{
                    backgroundImage: `url(${w.item.icon})`,
                  }}
                ></div>
              </td>
              <td className="left">{w.item.name}</td>

              <td className="right">{w.activityCount}</td>
              <td className="right">{w.kills}</td>
              <td className="right">
                {calculateAverage(w.kills, w.activityCount).toFixed(2)}
              </td>
              <td className="right">
                {calculatePercent(w.precisionKills, w.kills).toFixed(2)}%
              </td>
              <td className="right">{w.item.itemSubType.toString()}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default WeaponsView;
