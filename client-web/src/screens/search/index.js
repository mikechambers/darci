import { useState } from "react";
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
  const [player, setPlayer] = useState();
  const [characterClass, setCharacterClass] = useState();
  const [mode, setMode] = useState();
  const [moment, setMoment] = useState();

  const onPlayerSelectChange = function (p) {
    setPlayer(p);
  };

  const onClassSelectChange = function (c) {
    setCharacterClass(c);
  };

  const onModeSelectChange = function (m) {
    setMode(m);
  };

  const onMomentSelectChange = function (m) {
    setMoment(m);
  };

  return (
    <div id="page_nav" className="page_containter" style={pageContainerStyle}>
      <div style={gappedStyle}>
        <ScreenNavigationView links={pageLinks} />

        <div>
          <PlayerSelect label="player" onChange={onPlayerSelectChange} />
          <CharacterClassSelectionSelect
            label="class"
            onChange={onClassSelectChange}
          />
          <ModeSelect label="Mode" onChange={onModeSelectChange} />
          <MomentSelect label="Moment" onChange={onMomentSelectChange} />
          <button>Search</button>
        </div>
      </div>
    </div>
  );
};

export default SearchView;
