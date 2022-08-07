const EmblemIconDisplay = (props) => {
  const emblem = props.emblem;

  const elementStyle = {
    width: 50,
    height: 50,
    backgroundColor: "#000000",
    backgroundImage: `url(${emblem.icon})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    borderRadius: 4,
  };
  return <div style={elementStyle}></div>;
};

export default EmblemIconDisplay;
