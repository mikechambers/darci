const MedalsView = (props) => {
  let medals = props.medals ? props.medals : [];
  let maxCount = props.maxCount ? props.maxCount : 5;

  medals.sort((a, b) => {
    //return b.kills - a.kills;

    if (b.info.isGold === a.info.isGold) {
      return b.count - a.count;
    }

    if (b.info.isGold && !a.info.isGold) {
      return 1;
    }

    return -1;
  });

  //only display gold medals
  medals = medals.filter((m) => m.info.isGold);

  if (medals.length > maxCount) {
    medals = medals.slice(0, maxCount);
  }

  if (medals.length === 0) {
    return "";
  }

  return (
    <table>
      <thead>
        <tr>
          <th></th>
          <th class="left">MEDAL</th>
          <th></th>
          <th>COUNT</th>
          <th class="left">DESCRIPTION</th>
        </tr>
      </thead>
      <tbody>
        {medals.map((m, index) => {
          return (
            <tr key={m.id}>
              <td>
                <img
                  height="25"
                  width="25"
                  alt={m.info.description}
                  src={m.info.icon}
                />
              </td>
              <td class="left">{m.info.name}</td>
              <td>{m.info.isGold ? "GOLD" : ""}</td>
              <td>{m.count}</td>
              <td class="left">{m.info.description}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default MedalsView;
