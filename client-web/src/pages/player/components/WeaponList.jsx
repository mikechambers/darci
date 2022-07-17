import Stat from "./Stat";

const WeaponList = (props) => {
  let weapons = props.weapons;
  let title = props.title;
  let maxCount = props.maxCount ? props.maxCount : 10;

  if (weapons.length > maxCount) {
    weapons = weapons.slice(0, maxCount);
  }

  let containterStyle = {
    display: "flex",
    backgroundColor: "#2E2E2E",
    borderRadius: "8px",
    padding: "12px",
    gap: "12px",
  };

  let dataContainerStyle = {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  };

  let headerStyle = {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "flex-end",
  };

  let valuesStyle = {
    display: "flex",
    justifyContent: "space-between",
  };

  let wrapperStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  };

  let elementStyle = {
    padding: "var(--content-padding)",
    width: "422px",
  };

  let elementHeaderStyle = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  };

  return (
    <div style={elementStyle}>
      <div style={elementHeaderStyle}>
        <div className="section_header">{title}</div>
        <div className="export">Export Data</div>
      </div>
      <div style={wrapperStyle}>
        {weapons.map((item, index) => {
          let iconStyle = {
            backgroundImage: `url(${item.icon})`,
            width: "64px",
            height: "64px",
            flexShrink: "0",
          };
          return (
            <div style={containterStyle} key={index}>
              <div className="weapon_list_icon" style={iconStyle}></div>
              <div id="data_container" style={dataContainerStyle}>
                <div id="header_containter" style={headerStyle}>
                  <div className="weapon_title">{item.title}</div>
                  <div className="weapon_subtitle">{item.subtitle}</div>
                </div>
                <div id="values_containter" style={valuesStyle}>
                  {item.items.map((stat, index) => {
                    let align =
                      index === item.items.length - 1 ? "right" : "left";
                    return (
                      <Stat
                        value={stat.value.toLocaleString()}
                        label={stat.label}
                        align={align}
                        key={index}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WeaponList;
