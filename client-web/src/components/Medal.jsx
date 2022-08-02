export const LARGE = "large";
export const MEDIUM = "medium";
export const SMALL = "small";
const Medal = (props) => {
  const medal = props.medal;
  const count = props.count;
  const size = props.size ? props.size : LARGE;

  let fontSize = 16;
  let width = 96;
  let minWidth = 25;

  if (size === MEDIUM) {
    width = 32;
    minWidth = 11;
    fontSize = 9;
  } else if (size === SMALL) {
    width = 20;
    minWidth = 10;
    fontSize = 8;
  }

  let elementWrapperStyle = {
    width: width,
    height: width,
    backgroundImage: `url(${medal.icon})`,
    backgroundSize: "cover",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "flex-end",
  };

  let badgeStyle = {
    borderRadius: 2,
    backgroundColor: "#dddddd",
    color: "#222222",
    fontSize: fontSize,
    padding: 1,
    minWidth: minWidth,
    minHeight: minWidth,
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "bold",
  };

  const badge =
    count > 1 ? (
      <div style={badgeStyle} title={`${count} medal${count > 0 ? "s" : ""}`}>
        {count}
      </div>
    ) : (
      ""
    );
  return (
    <div
      style={elementWrapperStyle}
      title={`${medal.name} : ${medal.description}`}
    >
      {badge}
    </div>
  );
};

export default Medal;
