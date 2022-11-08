import { useNavigate } from "react-router-dom";
import PlayerConfigSelectView from "./PlayerConfigSelectView";

const rootStyle = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  width: "var(--page-max-width)",
  gap: "var(--nav-item-gap)",

  padding: "var(--padding-content) var(--padding-page-container)",
};

const navStyle = {
  display: "flex",
  gap: "24px", //move this to css and reuse
};

const MainNavView = (props) => {
  const navigate = useNavigate();
  const onUpdate = (url) => {
    navigate(url);
  };

  return (
    <div style={rootStyle}>
      <div style={navStyle}>
        <div className="nav page" onClick={() => onUpdate("/")}>
          DARCI
        </div>
        <div className="nav page" onClick={() => onUpdate("/search/")}>
          SEARCH
        </div>
        <div className="nav page" onClick={() => onUpdate("/about/")}>
          ABOUT
        </div>
      </div>
      <PlayerConfigSelectView onUpdate={onUpdate} />
      <hr className="page_section_title" />
    </div>
  );
};

export default MainNavView;
