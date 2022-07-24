import Stat from "./Stat";

const containerStyle = {
  display: "flex",
  backgroundColor: "var(--list-item-background-color)",
  borderRadius: "var(--border-radius)",
  padding: "12px",
  //gap: "var(--list-item-gap)",
};

const gapStyle = {
  width: "var(--list-item-gap)",
};

const dataContainerStyle = {
  width: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  marginLeft: "12px",
};

const headerStyle = {
  display: "flex",
  justifyContent: "space-between",
  width: "100%",
  alignItems: "flex-end",
};

const valuesStyle = {
  display: "flex",
  justifyContent: "space-between",
};

const wrapperStyle = {
  display: "flex",
  flexDirection: "column",
  //gap: "var(--list-item-gap)",

  //maxHeight: "488px",
  //overflow: "auto",
};

const WeaponListItem = (props) => {
  let weapons = props.data;
  let style = props.style;
  let index = props.index;

  let item = weapons[index];

  let iconStyle = {
    backgroundImage: `url(${item.icon})`,
    width: "64px",
    height: "64px",
    flexShrink: "0",
  };

  return (
    <div style={style}>
      <div style={containerStyle} key={index}>
        <div className="weapon_list_icon" style={iconStyle}></div>
        <div id="data_container" style={dataContainerStyle}>
          <div id="header_containter" style={headerStyle}>
            <div className="list_title">{item.title}</div>
            <div className="list_subtitle">{item.subtitle}</div>
          </div>
          <div id="values_containter" style={valuesStyle}>
            {item.items.map((stat, i) => {
              let align = i === item.items.length - 1 ? "right" : "left";
              return (
                <Stat
                  value={stat.value.toLocaleString()}
                  label={stat.label}
                  align={align}
                  key={i}
                />
              );
            })}
          </div>
        </div>
      </div>
      <div style={gapStyle}></div>
    </div>
  );
};

export default WeaponListItem;
