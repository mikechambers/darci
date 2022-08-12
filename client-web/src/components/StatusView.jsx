import { ReactComponent as JoinedLateIcon } from "./images/tabler/joined_late_icon.svg";
import { ReactComponent as JoinedLateLeftEarlyIcon } from "./images/tabler/joined_late_left_early_icon.svg";

const rotateStyle = { transform: "rotate(180deg)" };
const StatusView = (props) => {
  const joinedLate = props.joinedLate;
  const completed = props.completed;

  const dimension = props.dimension ? props.dimension : 18;

  let statusIcon = <div></div>;
  if (!completed) {
    statusIcon = (
      <JoinedLateIcon
        style={rotateStyle}
        width={dimension}
        height={dimension}
        title="Left game before completion"
      />
    );
  }

  if (joinedLate) {
    statusIcon = (
      <JoinedLateIcon
        width={dimension}
        height={dimension}
        title="Joined game in progress"
      />
    );
  }

  if (!completed && joinedLate) {
    statusIcon = (
      <JoinedLateLeftEarlyIcon
        width={dimension}
        height={dimension}
        title="Joined game in progress and left before completion"
      />
    );
  }

  return statusIcon;
};

export default StatusView;
