import CharacterClassSelectionSelect from "../../components/CharacterClassSelectionSelect";
import ModeSelect from "../../components/ModeSelect";
import MomentSelect from "../../components/MomentSelect";
import PlayerSelect from "../../components/PlayerSelect";
import ScreenNavigationView from "../../components/ScreenNavigationView";

const pageContainerStyle = {
  minWidth: "720px",
};

const gappedStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "30px",
};

const pageLinks = [
  {
    value: "Search",
    id: "search",
  },
  {
    value: "Results",
    id: "results",
  },
];

const SearchView = (props) => {
  return (
    <div id="page_nav" className="page_containter" style={pageContainerStyle}>
      <div style={gappedStyle}>
        <ScreenNavigationView links={pageLinks} />

        <div>
          <PlayerSelect />
          <CharacterClassSelectionSelect />
          <ModeSelect />
          <MomentSelect />
        </div>
      </div>
    </div>
  );
};

export default SearchView;
