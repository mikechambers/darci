import Stat from "./Stat";

const containerStyle = {
  display: "flex",
  backgroundColor: "var(--list-item-background-color)",
  borderRadius: "var(--border-radius)",
  padding: "12px",
  maxHeight: `110px`,
  columnGap: "var(--list-item-gap)",
  itemAlign: "flex-start",
  //gap: "var(--list-item-gap)",
};

const gapStyle = {
  height: "var(--list-item-gap)",
};

const dataContainerStyle = {
  width: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
};

const headerStyle = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  width: "100%",
  alignItems: "flex-start",
};

const valuesStyle = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  gap: "var(--list-item-gap)",
};

const descriptionStyle = {
  font: "var(--font-description)",
  overflow: "hidden",
  textOverflow: "ellipsis",
  maxHeight: "50px",
};

const MedalListItem = (props) => {
  let medals = props.data.medals;
  let style = props.style;
  let index = props.index;
  let activityCount = props.data.activityCount;

  let item = medals[index];

  let iconStyle = {
    //backgroundImage: `url(${item.info.icon})`,
    width: "64x",
    height: "64x",
    flexShrink: "0",
    backgroundColor: "#212f3d",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  let imgTitle = item.info.isGold ? "Gold Medal" : "";

  return (
    <div style={style}>
      <div style={containerStyle}>
        <div className="weapon_list_icon" style={iconStyle}>
          {" "}
          <img
            title={imgTitle}
            alt={imgTitle}
            src={item.info.icon}
            className="outline"
            width="50"
            height="50"
          />
        </div>
        <div id="data_container" style={dataContainerStyle}>
          <div id="header_containter" style={headerStyle}>
            <div className="list_title">{item.info.name}</div>
          </div>
          <div style={descriptionStyle}>{item.info.description}</div>
        </div>
        <div style={valuesStyle}>
          <Stat
            value={item.count}
            label="count"
            title="Total medals"
            align="right"
          />
          <Stat
            value={Math.ceil(activityCount / item.count)}
            label="games/m"
            align="right"
            title="Number of games to get medal."
          />
        </div>
      </div>
      <div style={gapStyle}>&nbsp;</div>
    </div>
  );
};

export default MedalListItem;
