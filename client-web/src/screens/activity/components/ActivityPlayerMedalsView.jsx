import CompactMedalsList from "../../../components/CompactMedalsList";
import { SMALL } from "../../../components/Medal";

const rootStyle = {
  display: "flex",
  flexDirection: "column",
  rowGap: 4,
};

const ActivityPlayerMedalsView = (props) => {
  const medals = props.medals;

  return (
    <div style={rootStyle}>
      <div className="subsection_header underline">Medals</div>
      <CompactMedalsList size={SMALL} medals={medals} />
    </div>
  );
};

export default ActivityPlayerMedalsView;
