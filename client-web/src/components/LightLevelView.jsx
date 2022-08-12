import { ReactComponent as LightLevelIcon } from "./images/light_level_icon.svg";

const elementStyle = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
};

const iconStyle = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
};

const LightLevelView = (props) => {
  const level = props.level;

  return (
    <div style={elementStyle}>
      <div style={iconStyle}>
        <LightLevelIcon />
      </div>
      <div className="light_level">{level}</div>
    </div>
  );
};

export default LightLevelView;
