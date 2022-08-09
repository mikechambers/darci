const NoMatchView = (props) => {
  const rootStyle = {
    display: "flex",
    width: "100%", //bit of a hack right now
    height: "100%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundImage: `url(https://www.bungie.net/img/destiny_content/pgcr/pvp_street.jpg)`,
    backgroundPosition: "center",
    backgroundSize: "cover",
  };

  let s2 = {
    opacity: "0.5",
  };

  return (
    <div style={rootStyle}>
      <div title="404" className="announce" style={s2}>
        unknown space
      </div>
      <div className="emphasis">
        The Nine have sent an Emissary to test Guardians
      </div>
    </div>
  );
};

export default NoMatchView;
