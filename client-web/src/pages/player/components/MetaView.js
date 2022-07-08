import { calculateRatio } from "shared";
import { useState } from "react";

const COUNT_SORT = "COUNT";
const KILLS_SORT = "KILLS";
const KILLS_PLAYER_SORT = "KILLSPLAYER";
const ASCENDING = "ascending";
const DESCENDING = "descending";

const MetaView = (props) => {
  const [sortConfig, setSortConfig] = useState({
    key: COUNT_SORT,
    direction: ASCENDING,
  });

  let meta = props.meta ? props.meta : [];
  let maxCount = props.max ? props.max : 5;

  const requestSort = (key) => {
    let direction = ASCENDING;
    if (sortConfig.key === key && sortConfig.direction === ASCENDING) {
      direction = DESCENDING;
    }
    setSortConfig({ key, direction });
  };

  const sort = (sortConfig) => {
    let direction = sortConfig.direction;
    let key = sortConfig.key;

    let f = (a, b) => {
      return b.count - a.count;
    };

    if (key === KILLS_SORT) {
      f = (a, b) => {
        return b.kills - a.kills;
      };
    } else if (key === KILLS_PLAYER_SORT) {
      f = (a, b) => {
        let aRatio = calculateRatio(a.kills, a.count);
        let bRatio = calculateRatio(b.kills, b.count);

        return bRatio - aRatio;
      };
    }

    let sf = (a, b) => {
      if (direction === DESCENDING) {
        [a, b] = [b, a];
      }
      return f(a, b);
    };
    meta.sort(sf);
  };

  sort(sortConfig);

  if (meta.length > maxCount) {
    meta = meta.slice(0, maxCount);
  }

  return (
    <table>
      <thead>
        <tr>
          <th></th>
          <th className="left">WEAPON</th>

          <th className="right">
            <button type="button" onClick={() => requestSort(COUNT_SORT)}>
              PLAYERS
            </button>
          </th>
          <th className="right">
            <button type="button" onClick={() => requestSort(KILLS_SORT)}>
              KILLS
            </button>
          </th>
          <th className="right">
            <button
              type="button"
              onClick={() => requestSort(KILLS_PLAYER_SORT)}
            >
              KILLS / PLAYER
            </button>
          </th>
          <th className="right">TYPE</th>
        </tr>
      </thead>
      <tbody>
        {meta.map((w, index) => {
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

              <td className="right">{w.count}</td>
              <td className="right">{w.kills}</td>
              <td className="right">
                {calculateRatio(w.kills, w.count).toFixed(2)}
              </td>
              <td className="right">{w.item.itemSubType.toString()}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default MetaView;
