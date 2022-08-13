import { ResponsiveScatterPlot } from "@nivo/scatterplot";
import ActivityPlayerEffectivenessTooltip from "../../../components/ActivityPlayerEffectivenessTooltip";

const rootStyle = {
  width: 600,
  height: 400,
};

const chartStyle = {
  width: "100%",
  height: "100%",
  backgroundColor: "#ffffff",
};

const ActivityPlayerEffectivenessView = (props) => {
  const teams = props.teams;

  let data = [];

  for (const team of teams) {
    let item = { id: team.name, data: [] };

    for (const player of team.players) {
      item.data.push({
        x: player.stats.deaths,
        y: player.stats.kills,
        z: player.stats.efficiency,
        player: player.player,
      });
    }

    data.push(item);
  }

  return (
    <div style={rootStyle}>
      <div style={chartStyle}>
        <ResponsiveScatterPlot
          data={data}
          colors={(node) => {
            if (node.serieId === "Alpha") {
              return "#1a9ee8";
            } else if (node.serieId === "Bravo") {
              return "#c94340";
            } else {
              return "#228B22";
            }
          }}
          nodeSize={{ key: "data.z", values: [0, 4], sizes: [4, 32] }}
          margin={{ top: 60, right: 60, bottom: 60, left: 80 }}
          xScale={{ type: "linear", min: 0, max: "auto" }}
          yScale={{ type: "linear", min: 0, max: "auto" }}
          blendMode="multiply"
          axisTop={null}
          axisRight={null}
          axisBottom={{
            orient: "bottom",
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "Deaths",
            legendPosition: "middle",
            legendOffset: 46,
          }}
          axisLeft={{
            orient: "left",
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "Kills",
            legendPosition: "middle",
            legendOffset: -60,
          }}
          tooltip={(e) => {
            return (
              <ActivityPlayerEffectivenessTooltip
                data={e.node.data}
                color={e.node.color}
              />
            );
          }}
        />
      </div>
    </div>
  );
};

export default ActivityPlayerEffectivenessView;
