import ActivityPlayerWeaponsList from "./ActivityPlayerWeaponsList";

const ActivityPlayerListItemDrawer = (props) => {
  const rootStyle = {
    height: "min-content",
  };
  const player = props.player;

  return (
    <div style={rootStyle} className="activity_details">
      <ActivityPlayerWeaponsList weapons={player.stats.extended.weapons} />
    </div>
  );
};

export default ActivityPlayerListItemDrawer;
