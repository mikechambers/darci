const ActivityPlayerListItemDrawer = (props) => {
  const rootStyle = {
    height: 100,
    backgroundColor: "#FFFFFF66",
  };
  const player = props.player;

  return (
    <div style={rootStyle} className="activity_details">
      <div>Im a drawer!</div>
    </div>
  );
};

export default ActivityPlayerListItemDrawer;
