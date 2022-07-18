import { ReactComponent as HelpIcon } from "./images/help_icon.svg";

const ToolTip = (props) => {
  let text = props.text;

  return <HelpIcon title={text} />;
};

export default ToolTip;
