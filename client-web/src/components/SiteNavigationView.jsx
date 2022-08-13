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
  borderTop: "var(--border-divider)",
};

const SiteNavigationView = (props) => {
  const items = props.items;
  const onChange = props.onChange;
  const selectedIndex = props.selectedIndex;

  const navOnClick = function (e) {
    const index = parseInt(e.target.dataset.index);

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

export default SiteNavigationView;
