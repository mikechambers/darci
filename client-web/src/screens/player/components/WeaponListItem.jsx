import StatView from "../../../components/StatView";

const containerStyle = {
  display: "flex",
  backgroundColor: "var(--color-list-item-background)",
  borderRadius: "var(--radius-border)",
  padding: "12px",
  //gap: "var(--gap-list-item)",
};

const gapStyle = {
  width: "var(--gap-list-item)",
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
      <div style={containerStyle}>
        <div className="weapon_list_icon" style={iconStyle}></div>
        <div id="data_container" style={dataContainerStyle}>
          <div id="header_containter" style={headerStyle}>
            <div className="subsection_header">{item.title}</div>
            <div className="list_subtitle">{item.subtitle}</div>
          </div>
          <div id="values_containter" style={valuesStyle}>
            {item.items.map((stat, i) => {
              let align = i === item.items.length - 1 ? "right" : "left";
              return (
                <StatView
                  value={stat.value}
                  label={stat.label}
                  align={align}
                  key={stat.label}
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
