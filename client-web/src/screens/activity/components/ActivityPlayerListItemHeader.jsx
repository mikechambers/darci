import { calculateEfficiency, calculateKillsDeathsRatio } from "shared";
import { SMALL } from "../../../components/Medal";
import CompactMedalsList from "../../../components/CompactMedalsList";
import StatusView from "../../../components/StatusView";
import ActivityPlayerStatsView from "./ActivityPlayerStatsView";
import PlayerInfoView from "./ActivityPlayerInfoView";

const rootStyle = {
  display: "grid",
  gridTemplateColumns: "200px 340px 60px 100px",
  flexDirection: "row",
  alignItems: "center",
  columnGap: 12,
  //justifyContent: "center",
};

const ActivityPlayerListItemHeader = (props) => {
  const player = props.player;
  const onClick = props.onClick;

  let className = props.onClick ? "list_item_header link" : "list_item_header";

  const data = [
    { value: player.stats.score, label: "score" },
    { value: player.stats.kills, label: "kills" },
    { value: player.stats.assists, label: "assists" },
    { value: player.stats.opponentsDefeated, label: "defeats" },
    { value: player.stats.deaths, label: "deaths" },
    {
      value: calculateKillsDeathsRatio(
        player.stats.kills,
        player.stats.deaths
      ).toFixed(2),
      label: "kd",
    },
    {
      value: calculateEfficiency(
        player.stats.kills,
        player.stats.deaths,
        player.stats.assists
      ).toFixed(2),
      label: "eff",
    },
  ];

  const handleOnClick = (e) => {
    if (!onClick) {
      return;
    }

    onClick(e);
  };

  const goldMedals = player.stats.extended.medals.filter((m) => m.info.isGold);

  return (
    <div className={className} style={rootStyle} onClick={handleOnClick}>
      <PlayerInfoView player={player} />
      <ActivityPlayerStatsView data={data} />
      <StatusView
        completed={player.stats.completed}
        joinedLate={player.stats.joinedLate}
      />
      <CompactMedalsList medals={goldMedals} size={SMALL} />
    </div>
  );
};

export default ActivityPlayerListItemHeader;
