import { CharacterClassSelection, Mode, Moment } from "shared";
import React, { useEffect } from "react";
import EnumSelectBase from "./EnumSelectBase";
import { useFetchPlayers } from "../hooks/remote";
import { useLocalStorage } from "@mantine/hooks";
import { useState } from "react";
import Player from "../core/data/Player";

const createUrl = function (player, classSelection, mode, moment) {
  let ts = new Date().getTime();
  let url = `/player/${player.memberId}/${player.platformId}/${classSelection.type}/${mode.type}/${moment.type}/?fr=${ts}`;

  return url;
};

const PlayerViewConfig = (props) => {
  const style = props.style;
  const onUpdate = props.onUpdate;
  const maxLabelLength = props.maxLabelLength ? props.maxLabelLength : 100;

  let classes = [
    CharacterClassSelection.ALL,
    CharacterClassSelection.HUNTER,
    CharacterClassSelection.TITAN,
    CharacterClassSelection.WARLOCK,
  ];
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

  let modes = [
    Mode.PVP_QUICKPLAY,
    Mode.PVP_COMPETITIVE,
    Mode.TRIALS_OF_OSIRIS,
    Mode.IRON_BANNER,
    Mode.RUMBLE,
    Mode.CLASH,
    Mode.MAYHEM,
    Mode.MOMENTUM,
    Mode.ELIMINATION,
    Mode.PRIVATE_MATCHES_ALL,
    Mode.ALL_PVP,
  ];
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

  let moments = [
    Moment.DAILY,
    Moment.WEEKLY,
    Moment.WEEKEND,
    Moment.DAY,
    Moment.WEEK,
    Moment.MONTH,
    Moment.SEASON_OF_THE_HAUNTED,
  ];
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

  const [loadedPlayers, isPlayersLoading, isPlayersError] = useFetchPlayers();
  const [players, setPlayers] = useState();
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

  let [selected, setSelected] = useState();

  useEffect(() => {
    if (!loadedPlayers) {
      return;
    }

    let found = false;
    for (const p of loadedPlayers) {
      p.label = p.getFullName();

      if (player && p.memberId === player.memberId) {
        found = true;
        setSelected(p);
      }
    }

    if (!found && loadedPlayers.length) {
      setPlayer(loadedPlayers[0]);
    }

    setPlayers(loadedPlayers);
  }, [loadedPlayers, player, setPlayer]);

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
      <EnumSelectBase
        onChange={playerOnChange}
        options={players}
        selected={selected}
        label="player"
        maxLabelLength={maxLabelLength}
      />

      <EnumSelectBase
        onChange={classOnChange}
        options={classes}
        selected={classSelection}
        label="class"
        maxLabelLength={maxLabelLength}
      />
      <EnumSelectBase
        onChange={modeOnChange}
        options={modes}
        selected={mode}
        label="mode"
        maxLabelLength={maxLabelLength}
      />
      <EnumSelectBase
        onChange={momentOnChange}
        options={moments}
        selected={moment}
        label="moment"
        maxLabelLength={maxLabelLength}
      />
      <button onClick={onClick}>View</button>
    </div>
  );
};

export default PlayerViewConfig;
