import Season from "shared/packages/enums/Season";
import EnumSelect from "./EnumSelect";

const seasons = [
  Season.RED_WAR,
  Season.CURSE_OF_OSIRIS,
  Season.WARMIND,
  Season.SEASON_OF_THE_OUTLAW,
  Season.SEASON_OF_THE_FORGE,
  Season.SEASON_OF_THE_DRIFTER,
  Season.SEASON_OF_OPULENCE,
  Season.SEASON_OF_THE_UNDYING,
  Season.SEASON_OF_DAWN,
  Season.SEASON_OF_THE_WORTHY,
  Season.SEASON_OF_ARRIVALS,
  Season.SEASON_OF_THE_HUNT,
  Season.SEASON_OF_THE_CHOSEN,
  Season.SEASON_OF_THE_SPLICER,
  Season.SEASON_OF_THE_LOST,
  Season.SEASON_OF_THE_RISEN,
  Season.SEASON_OF_THE_HAUNTED,
  Season.SEASON_OF_PLUNDER,
];

const SeasonSelect = (props) => {
  const onChange = props.onChange;
  const selected = props.selected;
  const maxLabelLength = props.maxLabelLength;
  const label = props.label ? props.label : "";
  const disabled = props.disabled;

  return (
    <EnumSelect
      onChange={onChange}
      options={seasons}
      selected={selected}
      label={label}
      maxLabelLength={maxLabelLength}
      disabled={disabled}
    />
  );
};

export default SeasonSelect;
