import { humanDuration } from "../../../core/utils/date";

const DurationView = (props) => {
  const duration = props.duration;

  const d = humanDuration(duration);

  return <div className="section_entry">{d}</div>;
};

export default DurationView;
