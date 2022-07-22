const NoMatchView = (props) => {
  let s = {
    display: "flex",
    width: "100%",
    height: "100vh",
    flexFlow: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundImage: `url(https://www.bungie.net/img/destiny_content/pgcr/pvp_street.jpg)`,
  };

  let s2 = {
    opacity: "0.5",
    font: "var(--font-section-header)",
    fontSize: "64px",
    textTransform: "uppercase",
    textShadow: "var(--text-shadow)",
  };

  let s3 = {
    fontStyle: "italic",
  };

  return (
    <div style={s}>
      <div title="404" className="not_found" style={s2}>
        unknown space
      </div>
      <div style={s3}>The Nine have sent an Emissary to test Guardians</div>
    </div>
  );
};

export default NoMatchView;
