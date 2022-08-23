import { Moment } from "shared";
import EnumSelect from "./EnumSelect";

const MomentSelect = (props) => {
  const onChange = props.onChange;
  const selected = props.selected;
  const maxLabelLength = props.maxLabelLength;
  const label = props.label ? props.label : "";

  let moments = [
    Moment.DAILY,
    Moment.WEEKLY,
    Moment.WEEKEND,
    Moment.DAY,
    Moment.WEEK,
    Moment.MONTH,
    Moment.SEASON_OF_THE_PLUNDER,
  ];

  return (
    <EnumSelect
      onChange={onChange}
      options={moments}
      selected={selected}
      label={label}
      maxLabelLength={maxLabelLength}
    />
  );
};

export default MomentSelect;
