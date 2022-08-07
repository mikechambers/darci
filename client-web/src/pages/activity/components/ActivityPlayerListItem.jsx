import { useState } from "react";
import ActivityPlayerListItemDrawer from "./ActivityPlayerListItemDrawer";
import ActivityPlayerListItemHeader from "./ActivityPlayerListItemHeader";

const rootStyle = { width: "min-content" };

const ActivityPlayerListItem = (props) => {
  const player = props.player;

  const [expanded, setExpanded] = useState(false);

  let drawer;
  if (expanded) {
    drawer = <ActivityPlayerListItemDrawer player={player} />;
  } else {
    drawer = <div></div>;
  }

  const handleOnClick = (e) => {
    setExpanded(!expanded);
  };

  return (
    <div style={rootStyle} id={player.player.getFullName()}>
      <ActivityPlayerListItemHeader player={player} onClick={handleOnClick} />
      {drawer}
    </div>
  );
};

export default ActivityPlayerListItem;
