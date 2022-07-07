import { Mode, Moment } from "shared";

const PlayerActivitiesHeader = (props) => {
  let playerName = props.playerName;
  let playerNameCode = props.playerNameCode;
  let classSelection = props.classSelection;
  let mode = Mode.fromString(props.modeName);
  let moment = Moment.fromString(props.momentName);
  let momentDate = new Date(props.momentDate);

  return (
    <div className="player_view_header">
      <span>{playerName}</span>#<span>{playerNameCode}</span> &nbsp;&gt;&nbsp;
      <span>{classSelection}</span>&nbsp;&gt;&nbsp;
      <span>{mode.label}</span>&nbsp;&gt;&nbsp;
      <span>{moment.label}</span>
      <span> ({momentDate.toString()})</span>
    </div>
  );
};

export default PlayerActivitiesHeader;
