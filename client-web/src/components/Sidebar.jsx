import IconManager, {
  ABOUT_ICON,
  LEADERBOARD_ICON,
  PLAYER_ICON,
  SEARCH_ICON,
} from "./IconManager";
import SidebarBackground from "./images/nav_background_tg.png";
import NavItemContainer from "./NavItemContainter";

const sidebarStyle = {
  top: "0",
  position: "sticky",

  //add 1 pixel as the border takes a pixel on the right
  width: "213px",
  borderRight: "var(--divider-border)",
  backgroundImage: `url(${SidebarBackground})`,
  backgroundRepeat: "repeat",
  height: "100vh",
  flexShrink: "0",
  display: "flex",
  flexDirection: "column",
  paddingLeft: "12px",
  paddingTop: "12px",
  boxSizing: "border-box",

  rowGap: "24px",
};

//12, 42, 72, 102
const Sidebar = (props) => {
  let items = [
    {
      title: "Leaderboard",
      icon: <IconManager icon={LEADERBOARD_ICON} width="16" />,
    },
    { title: "Player", icon: <IconManager icon={PLAYER_ICON} width="16" /> },
    { title: "Search", icon: <IconManager icon={SEARCH_ICON} width="16" /> },
    { title: "About", icon: <IconManager icon={ABOUT_ICON} width="16" /> },
  ];

  return (
    <div style={sidebarStyle}>
      <div>DARCI</div>
      <NavItemContainer items={items} />
    </div>
  );
};

export default Sidebar;
