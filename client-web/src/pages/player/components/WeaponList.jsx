import React from "react";
import Stat from "./Stat";
import GraphicListHeader from "../../../components/GraphicListHeader";
import ExportDataButton from "../../../components/ExportDataButton";

const containerStyle = {
  display: "flex",
  backgroundColor: "var(--list-item-background-color)",
  borderRadius: "8px",
  padding: "12px",
  gap: "var(--list-item-gap)",
};

const dataContainerStyle = {
  width: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
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
  gap: "var(--list-item-gap)",

  maxHeight: "488px",
  overflow: "auto",
};

const elementStyle = {
  padding: "var(--content-padding)",
  width: "422px",
};

const footerStyle = {
  display: "flex",
  justifyContent: "space-between",
};

const WeaponList = (props) => {
  let weapons = props.weapons;
  let title = props.title;
  //let maxCount = props.maxCount ? props.maxCount : 10;

  let maxCount = 1000;

  let description = props.description ? props.description : "";

  //need to account for smaller than max
  let end = maxCount < weapons.length ? maxCount : weapons.length;
  //let [weaponsSlice, setWeaponsSlice] = useState(weapons.slice(0, end));

  const onPageChange = function (items) {
    //setWeaponsSlice(items);
  };

  return (
    <div style={elementStyle}>
      <GraphicListHeader title={title} description={description} />
      <div style={wrapperStyle}>
        {weapons.map((item, index) => {
          let iconStyle = {
            backgroundImage: `url(${item.icon})`,
            width: "64px",
            height: "64px",
            flexShrink: "0",
          };
          return (
            <div style={containerStyle} key={index}>
              <div className="weapon_list_icon" style={iconStyle}></div>
              <div id="data_container" style={dataContainerStyle}>
                <div id="header_containter" style={headerStyle}>
                  <div className="list_title">{item.title}</div>
                  <div className="list_subtitle">{item.subtitle}</div>
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
      <div style={footerStyle}>
        <div>
          <ExportDataButton />
        </div>
      </div>
    </div>
  );
};

export default WeaponList;
