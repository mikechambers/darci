import SidebarBackground from "./images/nav_background.png";

const sidebarStyle = {
  top: "0",
  position: "sticky",
  width: "212px",
  borderRight: "var(--divider-border)",
  backgroundImage: `url(${SidebarBackground})`,
  backgroundRepeat: "repeat",
  height: "100vh",
  flexShrink: "0",
};

const Sidebar = (props) => {
  return (
    <div style={sidebarStyle}>
      <div>DARCI</div>
    </div>
  );
};

export default Sidebar;
