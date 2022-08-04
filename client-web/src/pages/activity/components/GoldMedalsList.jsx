import Medal, { MEDIUM } from "../../../components/Medal";

const elementStyle = {
  display: "flex",
  flexDirection: "columns",
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
};

const nameStyle = { font: "var(--font-title-name)" };
const nameCodeStyle = {
  font: "var(--font-title-name-code)",
};

const GoldMedalsList = (props) => {
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
                className={item.teamName.toLowerCase()}
              ></div>
              <div style={nameStyle} title={item.player.player.getFullName()}>
                {item.player.player.bungieDisplayName}
                <span className="bungie_name_code" style={nameCodeStyle}>
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

export default GoldMedalsList;
