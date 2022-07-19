import { ReactComponent as Icon } from "./images/left_early_icon.svg";

const LeftEarlyIcon = (props) => {
  let width = props.width;
  let height = props.height;

  return <Icon width={width} height={height} title="Left game early" />;
};

export default LeftEarlyIcon;
