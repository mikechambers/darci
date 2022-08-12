import { SMALL } from "./Medal";

const WeaponImageView = (props) => {
  const weapon = props.weapon;
  const size = SMALL;

  let rootStyle = {
    width: 16,
    height: 16,
    borderRadius: 4,
    backgroundImage: `url(${weapon.item.icon})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  return <div style={rootStyle}></div>;
};

export default WeaponImageView;
