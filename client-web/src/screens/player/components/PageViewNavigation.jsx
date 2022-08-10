import React from "react";
import { ReactComponent as NavigationIcon } from "../../../components/images/tabler/map.svg";

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
const PageViewNavigation = (props) => {
  const links = props.links;

  const elementStyle = {};

  const linkContainerStyle = {
    display: "flex",
    flexDirection: "columns",
    gap: "24px",
    justifyContent: "space-apart",
  };

  //const [indicatorProps, setIndicatorProps] = useState({ width: 50, left: 0 });

  const onClick = (index) => {
    /*
    let e = document.getElementById(`page_view_nav_${index}`);

    let leftOffset = 0;
    for (let i = 0; i < index; i++) {
      let element = document.getElementById(`page_view_nav_${i}`);
      leftOffset += element.clientWidth + 24;
    }
    */

    let section = document.getElementById(links[index].id);
    section.scrollIntoView({ behavior: "smooth", block: "start" });
    //setIndicatorProps({ width: e.clientWidth, left: leftOffset });
  };

  /*
  let underlineStyle = {
    ...underlineStyleBase,
    width: indicatorProps.width,
    left: indicatorProps.left,
  };
  */

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

export default PageViewNavigation;

/*
     <div>
        <div className="page_nav_transition" style={underlineStyle}></div>
      </div>
*/
