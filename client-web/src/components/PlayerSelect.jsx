//import { useEffect, useState } from "react";
//import { useFetchPlayers } from "../hooks/remote";
import EnumSelect from "./EnumSelect";

const PlayerSelect = (props) => {
  const onChange = props.onChange;
  const selected = props.selected;
  const maxLabelLength = props.maxLabelLength;
  const label = props.label ? props.label : "";
  const players = props.players ? props.players : [];

  return (
    <EnumSelect
      onChange={onChange}
      options={players}
      selected={selected}
      label={label}
      maxLabelLength={maxLabelLength}
    />
  );
};

export default PlayerSelect;
