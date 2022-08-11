import StatView from "../../../components/StatView";

const containerStyle = {
  display: "flex",
  backgroundColor: "var(--color-list-item-background)",
  borderRadius: "var(--radius-border)",
  padding: "12px",
  maxHeight: `110px`,
  columnGap: "var(--gap-list-item)",
  itemAlign: "flex-start",
  //gap: "var(--gap-list-item)",
};

const gapStyle = {
  height: "var(--gap-list-item)",
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
  gap: "var(--gap-list-item)",
};

const descriptionStyle = {
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
            <div className="subsection_header">{item.info.name}</div>
          </div>
          <div style={descriptionStyle}>{item.info.description}</div>
        </div>
        <div style={valuesStyle}>
          <StatView
            value={item.count}
            label="count"
            title="Total medals"
            align="right"
          />
          <StatView
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
