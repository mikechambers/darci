import { useState } from "react";

const navContainerStyle = {
  display: "flex",
  flexDirection: "row",
  width: "200px",
};

const navItemContainterStyle = {
  display: "flex",
  flexDirection: "column",
  width: "160px",
  rowGap: "12px",
};

const navItemStyle = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
};

const navIndicatorContainerStyle = {
  width: "40px",
  display: "flex",
  justifyContent: "flex-end",
};

const navIndicatorStyleBase = {
  position: "relative",
  right: "0px",
  width: "30px",
  height: "1px",
  borderTop: "var(--divider-border)",
};

export const MAIN_NAV = "main";
export const PAGE_NAV = "page";

const NavItemContainer = (props) => {
  const items = props.items;
  const type = props.type ? props.type : MAIN_NAV;
  const onChange = props.onChange;

  const [selectedIndex, setSelectedIndex] = useState(0);

  const navOnClick = function (e) {
    const index = parseInt(e.target.dataset.index);

    setSelectedIndex(index);

    if (onChange) {
      onChange(index);
    }
  };

  const navIndicatorStyle = {
    ...navIndicatorStyleBase,
    top: `${selectedIndex * 31 + 12}px`,
  };

  let links = items.map((item, index) => {
    const className = index === selectedIndex ? "nav_active" : "nav_inactive";

    const icon = item.icon ? item.icon : "";
    return {
      ...item,
      icon,
      className,
    };
  });

  return (
    <div style={navContainerStyle}>
      <div style={navItemContainterStyle}>
        {links.map((link, index) => {
          return (
            <div style={navItemStyle} key={index}>
              <div
                data-index={index}
                className={`nav ${link.className}`}
                onClick={navOnClick}
              >
                {link.title}
              </div>
              <div className={`nav ${link.className}`}>{link.icon}</div>
            </div>
          );
        })}
      </div>
      <div style={navIndicatorContainerStyle}>
        <div className="nav_transition" style={navIndicatorStyle}></div>
      </div>
    </div>
  );
};

export default NavItemContainer;
