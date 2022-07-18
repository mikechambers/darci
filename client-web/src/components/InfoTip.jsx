import { ReactComponent as HelpIcon } from "./images/help_icon.svg";

const InfoTip = (props) => {
  let text = props.text;

  return <HelpIcon title={text} />;
};

export default InfoTip;
