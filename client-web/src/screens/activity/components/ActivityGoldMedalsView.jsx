import Medal, { MEDIUM } from "../../../components/Medal";

const elementStyle = {
  display: "grid",
  gridTemplateColumns: "min-content min-content min-content",
  gap: 36,
  flexWrap: "wrap",
};

const medalEntryStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  gap: 8,
};

const playerEntryStyle = {
  display: "flex",
  flexDirection: "column",
  gap: 8,
  width: 200,
};

const teamStyle = {
  width: 3,
  height: 14,
  //margin: 2,
};

const headerStyle = {
  display: "flex",
  flexDirection: "row",
  columnGap: 4,
  rowGap: 2,
  alignItems: "center",
  borderBottom: "1px #ffffff66 solid",
};

const ActivityGoldMedalsView = (props) => {
  const players = props.players;

  let goldMedals = [];

  for (const p of players) {
    let g = [];
    let total = 0;
    for (const m of p.player.stats.extended.medals) {
      if (m.info.isGold) {
        total += m.count;
        g.push(m);
      }
    }

    if (g.length) {
      g.sort((a, b) => b.count - a.count);
      goldMedals.push({
        player: p.player,
        teamName: p.teamName,
        total: total,
        goldMedals: g,
      });
    }
  }

  goldMedals.sort((a, b) => b.total - a.total);

  if (!goldMedals.length) {
    return <div>No Gold Medals in match</div>;
  }

  return (
    <div style={elementStyle}>
      {goldMedals.map((item) => {
        return (
          <div style={playerEntryStyle} key={item.player.player.memberId}>
            <div style={headerStyle}>
              <div
                style={teamStyle}
                className={`${item.teamName.toLowerCase()}_team`}
              ></div>
              <div
                className="player_name_large"
                title={item.player.player.getFullName()}
              >
                {item.player.player.bungieDisplayName}
                <span className="player_name_code_large">
                  #{item.player.player.bungieDisplayNameCode}
                </span>
              </div>
            </div>

            {item.goldMedals.map((medal) => {
              return (
                <div style={medalEntryStyle} key={medal.info.id}>
                  <Medal medal={medal.info} count={medal.count} size={MEDIUM} />
                  <div>{medal.info.name}</div>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default ActivityGoldMedalsView;