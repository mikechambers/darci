import ImageView from "./ImageView";

const WeaponImageView = (props) => {
  const weapon = props.weapon;

  return <ImageView width="16" heigh="16" image={weapon.item.icon} />;
};

export default WeaponImageView;
