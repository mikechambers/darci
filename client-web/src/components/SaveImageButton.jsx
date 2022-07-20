import { ReactComponent as SaveImageIcon } from "./images/save_image_icon.svg";

const SaveImageButton = (props) => {
  let onClick = props.onClick;

  return <SaveImageIcon onClick={onClick} title="Export data" />;
};

export default SaveImageButton;
