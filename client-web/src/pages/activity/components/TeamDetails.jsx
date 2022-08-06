const teamBarStyle = {
  height: 10,
};

const elementStyle = {
  display: "flex",
  flexDirection: "column",
};

const statHighlightsStyle = {
  display: "flex",
  flexDirection: "row",
  borderBottom: "1px solid #ffffff88",
  width: "min-content",
};

const statDetailsStyle = {
  display: "flex",
  flexDirection: "row",
};

const TeamDetails = (props) => {
  const team = props.team;

  return (
    <div style={elementStyle}>
      <div style={teamBarStyle} className={team.name.toLowerCase()}></div>
      <div style={statHighlightsStyle}>
        <div>icon</div>
        <div>score</div>
        <div>KD</div>
        <div>EFF</div>
      </div>
      <div style={statDetailsStyle}>
        <div>1</div>
        <div>2</div>
        <div>3</div>
        <div>4</div>
        <div>5</div>
        <div>6</div>
      </div>
    </div>
  );
};

export default TeamDetails;
