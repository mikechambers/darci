import { Moment } from "shared";
import EnumSelect from "./EnumSelect";

const moments = [
  Moment.DAILY,
  Moment.WEEKLY,
  Moment.WEEKEND,
  Moment.DAY,
  Moment.WEEK,
  Moment.MONTH,
  Moment.SEASON_OF_PLUNDER,
  Moment.NOW,
];

const MomentSelect = (props) => {
  const onChange = props.onChange;
  const selected = props.selected;
  const maxLabelLength = props.maxLabelLength;
  const label = props.label ? props.label : "";
  const disabled = props.disabled;

  return (
    <EnumSelect
      onChange={onChange}
      options={moments}
      selected={selected}
      label={label}
      maxLabelLength={maxLabelLength}
      disabled={disabled}
    />
  );
};

export default MomentSelect;
