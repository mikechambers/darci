import { calculateRatio } from "shared";

const MetaView = (props) => {
  let meta = props.meta ? props.meta : [];
  let maxCount = props.maxCount ? props.maxCount : 5;

  meta.sort((a, b) => {
    return b.count - a.count;
  });

  if (meta.length > maxCount) {
    meta = meta.slice(0, maxCount);
  }

  return (
    <table>
      <thead>
        <tr>
          <th></th>
          <th class="left">WEAPON</th>
          <th class="left">TYPE</th>
          <th>PLAYERS</th>
          <th>KILLS</th>
          <th>KILLS / PLAYER</th>
        </tr>
      </thead>
      <tbody>
        {meta.map((w, index) => {
          return (
            <tr key={w.id}>
              <td>
                <div
                  style={{
                    width: 25,
                    height: 25,
                    borderRadius: "50%",
                    border: "solid black 2px",
                    backgroundSize: "cover",
                    backgroundImage: `url(${w.item.icon})`,
                  }}
                ></div>
              </td>
              <td class="left">{w.item.name}</td>
              <td class="left">{w.item.itemSubType.toString()}</td>
              <td>{w.count}</td>
              <td>{w.kills}</td>
              <td>{calculateRatio(w.kills, w.count).toFixed(2)}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default MetaView;
