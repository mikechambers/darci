import { useState } from "react";

//make this generic,
const PageViewNavigation = (props) => {
  const links = props.links;
  const id = props.id;

  const elementStyle = {};

  const linkContainerStyle = {
    display: "flex",
    flexDirection: "columns",
    gap: "24px",
    justifyContent: "space-apart",
  };

  const underlineStyleBase = {
    position: "relative",
    borderTop: "var( --underline)",
    width: `20px`,
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
    <div style={elementStyle}>
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
  );
};

export default PageViewNavigation;

/*
     <div>
        <div className="page_nav_transition" style={underlineStyle}></div>
      </div>
*/
