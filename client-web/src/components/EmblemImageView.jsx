import ImageView from "./ImageView";

const EmblemImageView = (props) => {
  const emblem = props.emblem;

  return <ImageView height={50} width={50} image={emblem.icon} />;
};

export default EmblemImageView;
