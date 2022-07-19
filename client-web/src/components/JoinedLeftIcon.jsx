import { ReactComponent as Icon } from "./images/joined_left_icon.svg";

const JoinedLeftIcon = (props) => {
  let width = props.width;
  let height = props.height;

  return (
    <Icon
      width={width}
      height={height}
      title="Joined game late and left early"
    />
  );
};

export default JoinedLeftIcon;
