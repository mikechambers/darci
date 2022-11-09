import OrderBy from "shared/packages/enums/OrderBy";
import EnumSelect from "./EnumSelect";

const orderByOptions = [
  OrderBy.PERIOD,
  OrderBy.KILLS,
  OrderBy.ASSISTS,
  OrderBy.SCORE,
  OrderBy.OPPONENTS_DEFEATED,
  OrderBy.DEATHS,
  OrderBy.PRECISION_KILLS,
  OrderBy.GRENADE_KILLS,
  OrderBy.MELEE_KILLS,
  OrderBy.SUPER_KILLS,
  OrderBy.MEDALS_EARNED,
];

const OrderBySelect = (props) => {
  const onChange = props.onChange;
  const selected = props.selected;
  const maxLabelLength = props.maxLabelLength;
  const label = props.label ? props.label : "";
  const disabled = props.disabled;

  return (
    <EnumSelect
      onChange={onChange}
      options={orderByOptions}
      selected={selected}
      label={label}
      maxLabelLength={maxLabelLength}
      disabled={disabled}
    />
  );
};

export default OrderBySelect;
