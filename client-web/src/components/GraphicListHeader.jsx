import InfoTip from "./InfoTip";

const headerStyle = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "flex-end",
};

const GraphicListHeader = (props) => {
  const description = props.description;
  const title = props.title;

  return (
    <div style={headerStyle}>
      <div className="section_header">
        {title} <InfoTip text={description} />
      </div>
      <div className="export">Export Data</div>
    </div>
  );
};

export default GraphicListHeader;
