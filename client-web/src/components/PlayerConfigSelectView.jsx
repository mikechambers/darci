import { CharacterClassSelection, Mode, Moment } from "shared";
import React, { useContext } from "react";
import { useLocalStorage } from "@mantine/hooks";
import Player from "../core/data/Player";
import CharacterClassSelectionSelect from "./CharacterClassSelectionSelect";
import ModeSelect from "./ModeSelect";
import MomentSelect from "./MomentSelect";
import PlayerSelect from "./PlayerSelect";
import { GlobalContext } from "../contexts/GlobalContext";
import { createPlayerUrl } from "../core/utils";
import { MOMENT_TYPE } from "../core/consts";

const PlayerConfigSelectView = (props) => {
  const style = props.style;
  const onUpdate = props.onUpdate;
  const maxLabelLength = props.maxLabelLength ? props.maxLabelLength : 100;

  const { global, dispatchGlobal } = useContext(GlobalContext);
  const players = global.players;

  const [characterClass, setCharacterClassSelection] = useLocalStorage({
    key: "config-class-type",
    defaultValue: CharacterClassSelection.ALL,
    serialize: (value) => {
      return value.type;
    },
    deserialize: (localStorageValue) => {
      if (!localStorageValue) {
        return;
      }
      return CharacterClassSelection.fromType(localStorageValue);
    },
  });

  const [mode, setMode] = useLocalStorage({
    key: "config-mode",
    defaultValue: Mode.PVP_QUICKPLAY,
    serialize: (value) => {
      return value.type;
    },
    deserialize: (localStorageValue) => {
      if (!localStorageValue) {
        return;
      }
      return Mode.fromType(localStorageValue);
    },
  });

  const [moment, setMoment] = useLocalStorage({
    key: "config-moment",
    defaultValue: Moment.WEEK,
    serialize: (value) => {
      return value.type;
    },
    deserialize: (localStorageValue) => {
      if (!localStorageValue) {
        return;
      }
      return Moment.fromType(localStorageValue);
    },
  });

  const [player, setPlayer] = useLocalStorage({
    key: "config-player",

    //this is a hack, since we cant have it return undefined
    defaultValue: undefined,
    serialize: (value) => {
      return value.toJson();
    },
    deserialize: (localStorageValue) => {
      if (!localStorageValue) {
        return undefined;
      }

      return Player.fromJson(localStorageValue);
    },
  });

  let classOnChange = function (e) {
    setCharacterClassSelection(e);
  };

  let modeOnChange = function (e) {
    setMode(e);
  };

  let momentOnChange = function (e) {
    setMoment(e);
  };

  let playerOnChange = function (e) {
    setPlayer(e);
  };

  let onClick = function (e) {
    let url = createPlayerUrl({
      player,
      characterClass,
      mode,
      momentType: MOMENT_TYPE,
      startMoment: moment,
    });

    //the fr indicates its from this navigation, and passes a timestamp, so receivers
    //can differentiate between different calls
    //honestly, its a bit of a hack because my data framework isnt very good

    if (onClick) {
      onUpdate(url);
    }
  };

  let s = {
    ...style,
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    columnGap: "6px",
    justifyContent: "flex-start",
  };

  return (
    <div style={s}>
      <PlayerSelect
        players={players}
        onChange={playerOnChange}
        selected={player}
        maxLabelLength={maxLabelLength}
      />

      <CharacterClassSelectionSelect
        onChange={classOnChange}
        selected={characterClass}
        maxLabelLength={maxLabelLength}
      />
      <ModeSelect
        onChange={modeOnChange}
        selected={mode}
        maxLabelLength={maxLabelLength}
      />
      <MomentSelect
        onChange={momentOnChange}
        selected={moment}
        maxLabelLength={maxLabelLength}
      />

      <button onClick={onClick}>View</button>
    </div>
  );
};

export default PlayerConfigSelectView;
