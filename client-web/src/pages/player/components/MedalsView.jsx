import Medal from "../../../components/Medal";

const elementStyle = {
  display: "flex",
  flexWrap: "wrap",
  columnGap: "4px",
};

const MedalsView = (props) => {
  const medals = props.medals;
  const size = props.size;
  const showDivider = !!props.title;
  const title = props.title ? props.title : "";

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

export default MedalsView;
