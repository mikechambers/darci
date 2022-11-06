import React from "react";
import { ReactComponent as NavigationIcon } from "./images/tabler/map.svg";

const navigationIconWrapperStyle = {
  position: "sticky",
  top: 0,
};

//note, this is a bit of hack. Need to find a programtic
//way to position correctly
const navigationIconStyle = {
  strokeWidth: 1,
  width: 18,
  position: "absolute",
  top: 26,
  left: -30,
};

const onPageHomeClick = function () {
  let e = document.getElementById("page_nav");
  e.scrollIntoView({ behavior: "smooth", block: "start" });
};
const ScreenNavigationView = (props) => {
  const links = props.links;

  const elementStyle = {};

  const linkContainerStyle = {
    display: "flex",
    flexDirection: "columns",
    gap: "var(--nav-item-gap)",
    justifyContent: "space-apart",
  };

  const onClick = (index) => {
    let section = document.getElementById(links[index].id);
    section.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <React.Fragment>
      <div
        style={navigationIconWrapperStyle}
        onClick={onPageHomeClick}
        title="Return to top of page"
      >
        <NavigationIcon style={navigationIconStyle} className="page_nav_icon" />
      </div>
      <div id="s" style={elementStyle}>
        <div style={linkContainerStyle}>
          {links.map((item, index) => {
            return (
              <div
                className="nav page"
                id={`page_view_nav_${index}`}
                key={item.value}
                onClick={() => onClick(index)}
              >
                {item.value}
              </div>
            );
          })}
        </div>
      </div>
    </React.Fragment>
  );
};

export default ScreenNavigationView;
