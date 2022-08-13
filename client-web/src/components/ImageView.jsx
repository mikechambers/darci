const ImageView = (props) => {
  const width = props.width;
  const height = props.height;
  const image = props.image;

  const elementStyle = {
    width: width,
    height: height,
    backgroundImage: `url(${image})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    borderRadius: 4,
  };
  return <div style={elementStyle}></div>;
};

export default ImageView;
