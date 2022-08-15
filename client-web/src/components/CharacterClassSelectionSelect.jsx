import { CharacterClassSelection } from "shared";
import EnumSelect from "./EnumSelect";

const CharacterClassSelectionSelect = (props) => {
  const onChange = props.onChange;
  const selected = props.selected;
  const maxLabelLength = props.maxLabelLength;
  const label = props.label ? props.label : "";

  let classes = [
    CharacterClassSelection.ALL,
    CharacterClassSelection.HUNTER,
    CharacterClassSelection.TITAN,
    CharacterClassSelection.WARLOCK,
  ];

  return (
    <EnumSelect
      onChange={onChange}
      options={classes}
      selected={selected}
      label={label}
      maxLabelLength={maxLabelLength}
    />
  );
};

export default CharacterClassSelectionSelect;
