import Medal from "../../../components/Medal";

const elementStyle = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  columnGap: "4px",
};

const MedalsList = (props) => {
  const medals = props.medals;
  const size = props.size;

  return (
    <div style={elementStyle}>
      {medals.map((medal, index) => {
        return (
          <Medal
            key={medal.id}
            medal={medal.info}
            count={medal.count}
            size={size}
          />
        );
      })}
    </div>
  );
};

export default MedalsList;
