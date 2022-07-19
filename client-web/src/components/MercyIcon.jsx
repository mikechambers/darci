import { ReactComponent as Icon } from "./images/mercy_icon.svg";

const MercyIcon = (props) => {
  let width = props.width;
  let height = props.height;

  return <Icon width={width} height={height} title="Game ended due to mercy" />;
};

export default MercyIcon;
