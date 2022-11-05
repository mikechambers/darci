import { useEffect, useState } from "react";
import { useFetchPlayers } from "../hooks/remote";
import EnumSelect from "./EnumSelect";

const PlayerSelect = (props) => {
  const onChange = props.onChange;
  const player = props.selected;
  const maxLabelLength = props.maxLabelLength;
  const label = props.label ? props.label : "";

  const [loadedPlayers, isPlayersLoading, isPlayersError] = useFetchPlayers();
  const [selected, setSelected] = useState();

  const [players, setPlayers] = useState([]);

  useEffect(() => {
    if (!loadedPlayers) {
      return;
    }

	let proxySetSelected = function(s) {
		if(s && props.onChange) {
			onChange(s);
		}
		
		setSelected(s);
	}

	let s;
    let out = [];
    for (const p of loadedPlayers) {
      p.label = p.getFullName();
      out.push(p);

      if (player && p.memberId === player.memberId) {
        s = p;
		proxySetSelected(p);
      }
    }

	if(!s) {
		proxySetSelected(out[0]);
	}

    setPlayers(out);
  }, [loadedPlayers, player]);

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
