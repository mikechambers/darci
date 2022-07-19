import GraphicListHeader from "../../../components/GraphicListHeader";
import { calculatePercent, calculateAverage } from "../../../utils/index";
import Stat from "./Stat";

const WIDTH = 725;

const containerStyle = {
  width: `${WIDTH}px`,
  display: "flex",
  flexDirection: "column",
  padding: "var(--content-padding)",
};

const datacontainerStyle = {
  height: "45px",
  backgroundColor: "var(--list-item-background-color)",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "0px 12px",
  borderRadius: "0px 0px 8px 8px",
};

const mapNameStyle = {
  display: "inline-block",
  alignSelf: "flex-end",
  padding: "0px 12px",
};

const wrapperStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "var(--list-item-gap)",
};

const headerStyle = {
  display: "flex",
  height: "25px",
  backgroundPosition: "center",
  backgroundSize: "cover",
};

const mapBackgroundStyle = {
  padding: "0px",
  borderRadius: "0px 0px 8px 8px",
};

const elementStyle = {
  borderRadius: "0px 0px 8px 8px",
  border: "var(--list-item-border)",
};

const MapsDetail = (props) => {
  let maps = props.maps ? props.maps : [];

  let description =
    "Data aggregated by map. Ordered by number of times the map was";

  maps.sort((a, b) => {
    return b.summary.activityCount - a.summary.activityCount;
  });

  let totalGames = 0;
  for (const m of maps) {
    totalGames += m.summary.activityCount;
  }

  let data = [];
  for (const m of maps) {
    let games = m.summary.activityCount;

    let d = [];

    d.push({
      label: "games",
      value: games,
    });

    d.push({
      label: "total",
      value: `${calculatePercent(
        m.summary.activityCount,
        totalGames
      ).toFixed()}%`,
    });

    d.push({
      label: "win",
      value: `${calculatePercent(
        m.summary.wins,
        m.summary.activityCount
      ).toFixed()}%`,
    });

    d.push({
      label: "kills",
      value: calculateAverage(m.summary.kills, m.summary.activityCount).toFixed(
        2
      ),
    });

    d.push({
      label: "assists",
      value: calculateAverage(
        m.summary.assists,
        m.summary.activityCount
      ).toFixed(2),
    });

    d.push({
      label: "defeats",
      value: calculateAverage(
        m.summary.opponentsDefeated,
        m.summary.activityCount
      ).toFixed(2),
    });

    d.push({
      label: "deaths",
      value: calculateAverage(
        m.summary.deaths,
        m.summary.activityCount
      ).toFixed(2),
    });

    d.push({
      label: "kd",
      value: m.summary.killsDeathsRatio.toFixed(2),
    });

    d.push({
      label: "eff",
      value: m.summary.efficiency.toFixed(2),
    });

    d.push({
      label: "mercies",
      value: `${calculatePercent(
        m.summary.mercies,
        m.summary.activityCount
      ).toFixed()}%`,
    });

    d.push({
      label: "completed",
      value: `${calculatePercent(
        m.summary.completed,
        m.summary.activityCount
      ).toFixed()}%`,
    });
    data.push({
      title: m.map.name,
      image: m.map.image,
      items: d,
    });
  }

  return (
    <div style={containerStyle}>
      <GraphicListHeader description={description} title="Maps" />

      <div style={wrapperStyle}>
        {data.map((map, index) => {
          let h = {
            ...headerStyle,
            backgroundImage: `url(${map.image})`,
          };

          return (
            <div key={index} style={elementStyle}>
              <div className="list_title" style={h}>
                <span style={mapNameStyle}>{map.title}</span>
              </div>
              <div style={datacontainerStyle}>
                {map.items.map((item, i) => {
                  let align = i === map.items.length - 1 ? "right" : "left";
                  return (
                    <Stat
                      key={i}
                      value={item.value}
                      label={item.label}
                      align={align}
                    />
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MapsDetail;
