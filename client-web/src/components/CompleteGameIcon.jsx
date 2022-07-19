import { ReactComponent as Icon } from "./images/complete_game_icon.svg";

const CompleteGameIcon = (props) => {
  let width = props.width;
  let height = props.height;
  return <Icon width={width} height={height} title="Played complete game" />;
};

export default CompleteGameIcon;
