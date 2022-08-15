import { CharacterClassSelection, Mode, Moment } from "shared";
import React, { useEffect } from "react";
import EnumSelect from "./EnumSelect";
import { useFetchPlayers } from "../hooks/remote";
import { useLocalStorage } from "@mantine/hooks";
import { useState } from "react";
import Player from "../core/data/Player";
import CharacterClassSelectionSelect from "./CharacterClassSelectionSelect";
import ModeSelect from "./ModeSelect";
import MomentSelect from "./MomentSelect";
import PlayerSelect from "./PlayerSelect";

const createUrl = function (player, classSelection, mode, moment) {
  let ts = new Date().getTime();
  let url = `/player/${player.memberId}/${player.platformId}/${classSelection.type}/${mode.type}/${moment.type}/?fr=${ts}`;

  return url;
};

const PlayerConfigSelectView = (props) => {
  const style = props.style;
  const onUpdate = props.onUpdate;
  const maxLabelLength = props.maxLabelLength ? props.maxLabelLength : 100;

  const [classSelection, setClassSelection] = useLocalStorage({
    key: "config-class-type",
    defaultValue: CharacterClassSelection.ALL,
    serialize: (value) => {
      return value.type;
    },
    deserialize: (localStorageValue) => {
      if (!localStorageValue) {
        return;
      }
      return CharacterClassSelection.fromString(localStorageValue);
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
      return Mode.fromString(localStorageValue);
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
      return Moment.fromString(localStorageValue);
    },
  });

  const [player, setPlayer] = useLocalStorage({
    key: "config-player",
    serialize: (value) => {
      return value.toJson();
    },
    deserialize: (localStorageValue) => {
      if (undefined) {
        return undefined;
      }

      return Player.fromJson(localStorageValue);
    },
  });

  let classOnChange = function (e) {
    setClassSelection(e);
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
    let url = createUrl(player, classSelection, mode, moment);

    //the fr indicates its from this navigatio, and passes a timestamp, so receivers
    //can differentiate between different calls
    //honestly, its a bit of a hack because my data framework isnt very good

    if (onClick) {
      onUpdate(url);
    }
  };

  let s = {
    ...style,
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    rowGap: "6px",
  };

  return (
    <div style={s}>
      <PlayerSelect
        onChange={playerOnChange}
        selected={player}
        maxLabelLength={maxLabelLength}
        label="player"
      />

      <CharacterClassSelectionSelect
        onChange={classOnChange}
        selected={classSelection}
        maxLabelLength={maxLabelLength}
        label="class"
      />
      <ModeSelect
        onChange={modeOnChange}
        selected={mode}
        label="mode"
        maxLabelLength={maxLabelLength}
      />
      <MomentSelect
        onChange={momentOnChange}
        selected={moment}
        label="moment"
        maxLabelLength={maxLabelLength}
      />

      <button onClick={onClick}>View</button>
    </div>
  );
};

export default PlayerConfigSelectView;
