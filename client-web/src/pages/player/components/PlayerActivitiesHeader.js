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
      <div>
        <span>{playerName}</span>#<span>{playerNameCode}</span>{" "}
      </div>
      <div>
        &#47;&#47;&nbsp;<span>{classSelection}</span>&nbsp;&#47;&nbsp;
        <span>{mode.label}</span>&nbsp;&#47;&nbsp;
        <span>{moment.label}</span>
        &nbsp;&#47;<span> ({momentDate.toString()})</span>
      </div>
    </div>
  );
};

export default PlayerActivitiesHeader;
