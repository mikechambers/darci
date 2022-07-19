import { ReactComponent as Icon } from "./images/joined_late_icon.svg";

const JoinedLateIcon = (props) => {
  let width = props.width;
  let height = props.height;

  return <Icon width={width} height={height} title="Joined game in progress" />;
};

export default JoinedLateIcon;
