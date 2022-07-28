import Stat from "./Stat";

const containerStyle = {
  display: "flex",
  backgroundColor: "var(--list-item-background-color)",
  borderRadius: "var(--border-radius)",
  padding: "12px",
  maxHeight: `100px`,
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
  marginLeft: "12px",
  gap: "2px",
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
  justifyContent: "space-between",
  font: "var(--font-description)",
  textOverflow: "ellipsis",
  maxHeight: "10px",
};

const MedalListItem = (props) => {
  let medals = props.data;
  let style = props.style;
  let index = props.index;

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
          <img
            title={imgTitle}
            alt={imgTitle}
            src={item.info.icon}
            width="50"
            height="50"
          />
        </div>
        <div id="data_container" style={dataContainerStyle}>
          <div id="header_containter" style={headerStyle}>
            <div className="list_title">{item.info.name}</div>
            <div className="data" title="Count">
              {item.count}
            </div>
          </div>
          <div style={valuesStyle}>{item.info.description}</div>
        </div>
      </div>
      <div style={gapStyle}>&nbsp;</div>
    </div>
  );
};

export default MedalListItem;
