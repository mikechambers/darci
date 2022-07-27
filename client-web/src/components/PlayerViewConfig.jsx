import { CharacterClassSelection, Mode, Moment } from "shared";
import React, { useEffect, useState } from "react";
import EnumSelectBase from "./EnumSelectBase";
import { useFetchPlayers } from "../hooks/remote";
import { useLocation, useNavigate } from "react-router-dom";

const PlayerViewConfig = (props) => {
  let classes = [
    CharacterClassSelection.ALL,
    CharacterClassSelection.HUNTER,
    CharacterClassSelection.TITAN,
    CharacterClassSelection.WARLOCK,
  ];
  const [classSelection, setClassSelection] = useState(
    props.classSelection ? props.classSelection : CharacterClassSelection.ALL
  );

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
  const [mode, setMode] = useState(
    props.mode ? props.mode : Mode.PVP_QUICKPLAY
  );

  let moments = [
    Moment.DAILY,
    Moment.WEEKLY,
    Moment.WEEKEND,
    Moment.DAY,
    Moment.WEEK,
    Moment.MONTH,
    Moment.SEASON_OF_THE_HAUNTED,
  ];
  const [moment, setMoment] = useState(
    props.moment ? props.moment : Moment.WEEK
  );

  const [loadedPlayers, isPlayersLoading, isPlayersError] = useFetchPlayers();
  const [players, setPlayers] = useState();
  const [player, setPlayer] = useState();

  useEffect(() => {
    let selected = props.player;
    for (const p of loadedPlayers) {
      p.label = p.getFullName();
      p.toString = () => p.label;

      if (selected && p.memberId === selected.memberId) {
        selected = p;
        setPlayer(selected);
      }
    }

    if (loadedPlayers && loadedPlayers.length && !selected) {
      setPlayer(loadedPlayers[0]);
    }

    setPlayers(loadedPlayers);
  }, [loadedPlayers, props.player]);

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

  const navigate = useNavigate();

  let onClick = function (e) {
    let ts = new Date().getTime();

    let url = `/player/${player.memberId}/${player.platformId}/${classSelection.type}/${mode.type}/${moment.type}/?fr=${ts}`;

    //the fr indicates its from this navigatio, and passes a timestamp, so receivers
    //can differentiate between different calls
    //honestly, its a bit of a hack because my data framework isnt very good
    navigate(url);
  };

  let style = {
    display: "flex",
  };

  return (
    <div style={style}>
      <EnumSelectBase
        onChange={playerOnChange}
        options={players}
        selected={player}
        label="players"
      />

      <EnumSelectBase
        onChange={classOnChange}
        options={classes}
        selected={classSelection}
        label="classes"
      />
      <EnumSelectBase
        onChange={modeOnChange}
        options={modes}
        selected={mode}
        label="modes"
      />
      <EnumSelectBase
        onChange={momentOnChange}
        options={moments}
        selected={moment}
        label="moments"
      />

      <button className="nav_button" onClick={onClick}>
        Go
      </button>
    </div>
  );
};

export default PlayerViewConfig;
