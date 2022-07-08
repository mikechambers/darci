const MedalsView = (props) => {
  let container_style = {
    display: "flex",
    alignContent: "flex-start",
  };

  let medal_style = {
    display: "flex",
    alignItems: "center",
    padding: "0px 20px 20px 0px",
  };

  let medals = props.medals ? props.medals : [];
  let max = props.max ? props.max : 5;

  medals.sort((a, b) => {
    //return b.kills - a.kills;

    if (b.info.isGold === a.info.isGold) {
      return b.count - a.count;
    }

    if (b.info.isGold && !a.info.isGold) {
      return 1;
    }

    return -1;
  });

  //only display gold medals
  medals = medals.filter((m) => m.info.isGold);

  if (medals.length > max) {
    medals = medals.slice(0, max);
  }

  if (medals.length === 0) {
    return "";
  }

  return (
    <div style={container_style}>
      {medals.map((m, index) => {
        return (
          <div style={medal_style} key={m.id}>
            <img
              height="25"
              width="25"
              alt={m.info.description}
              src={m.info.icon}
            />{" "}
            &nbsp;
            {m.info.name} x {m.count}
          </div>
        );
      })}
    </div>
  );
};

export default MedalsView;
