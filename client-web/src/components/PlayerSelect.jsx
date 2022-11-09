//import { useEffect, useState } from "react";
//import { useFetchPlayers } from "../hooks/remote";
import EnumSelect from "./EnumSelect";

const PlayerSelect = (props) => {
  const onChange = props.onChange;
  const selected = props.selected;
  const maxLabelLength = props.maxLabelLength;
  const label = props.label ? props.label : "";
  const players = props.players ? props.players : [];
  const disabled = props.disabled;

  return (
    <EnumSelect
      onChange={onChange}
      options={players}
      selected={selected}
      label={label}
      maxLabelLength={maxLabelLength}
      disabled={disabled}
    />
  );
};

export default PlayerSelect;
