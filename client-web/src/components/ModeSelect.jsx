import Mode from "shared/packages/enums/Mode";
import EnumSelect from "./EnumSelect";

const ModeSelect = (props) => {
  const onChange = props.onChange;
  const selected = props.selected;
  const maxLabelLength = props.maxLabelLength;
  const label = props.label ? props.label : "";

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

  return (
    <EnumSelect
      onChange={onChange}
      options={modes}
      selected={selected}
      label={label}
      maxLabelLength={maxLabelLength}
    />
  );
};

export default ModeSelect;
