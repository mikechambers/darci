import { SMALL } from "../../components/Medal";
import MedalsList from "../player/components/MedalsList";

const PlayerMedalsView = (props) => {
  const medals = props.medals;

  return (
    <div>
      <div className="subsection_header subsection_header_underline">
        Medals
      </div>
      <MedalsList size={SMALL} medals={medals} />
    </div>
  );
};

export default PlayerMedalsView;
