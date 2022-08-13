import { useEffect, useState } from "react";
import Icon, {
  ABOUT_ICON,
  LEADERBOARD_ICON,
  PLAYER_ICON,
  SEARCH_ICON,
} from "./Icon";
import SidebarBackground from "./images/nav_background_tg.png";
import SiteNavigationView from "./SiteNavigationView";
import PlayerSelectView from "./PlayerSelectView";
import { useNavigate, useLocation } from "react-router-dom";

const sidebarStyle = {
  top: "0",
  position: "sticky",

  //add 1 pixel as the border takes a pixel on the right
  width: "213px",
  borderRight: "var(--border-divider)",
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
const SidebarView = (props) => {
  const location = useLocation();
  const [navIndex, setNavIndex] = useState(0);

  let items = [
    {
      title: "Leaderboard",
      path: "/",
      icon: <Icon icon={LEADERBOARD_ICON} width="16" />,
    },
    {
      title: "Player",
      path: "/player",
      icon: <Icon icon={PLAYER_ICON} width="16" />,
    },
    {
      title: "Search",
      path: "/search",
      icon: <Icon icon={SEARCH_ICON} width="16" />,
    },
    {
      title: "About",
      path: "/about",
      icon: <Icon icon={ABOUT_ICON} width="16" />,
    },
  ];

  useEffect(() => {
    let index = 0;

    if (window.location.pathname === "/") {
      index = 0;
    } else {
      index = items.findIndex((item, i) => {
        if (window.location.pathname === "/") {
          return true;
        } else {
          if (!i) {
            return false;
          }
          return window.location.pathname.startsWith(item.path);
        }
      });
    }

    setNavIndex(index);
  }, [location]);

  const navigate = useNavigate();
  const onPlayerConfigUpdate = (url) => {
    navigate(url);

    //todo: do we need to set this, or will it be set when page
    //updates
    setNavIndex(1);
  };

  const onNavChange = (index) => {
    navigate(items[index].path);
    setNavIndex(index);
  };

  return (
    <div style={sidebarStyle}>
      <div>DARCI</div>
      <SiteNavigationView
        items={items}
        selectedIndex={navIndex}
        onChange={onNavChange}
      />
      <PlayerSelectView onUpdate={onPlayerConfigUpdate} maxLabelLength="22" />
    </div>
  );
};

export default SidebarView;
