const rootStyle = {
  padding: "2px 4px",
  borderRadius: 4,
  display: "flex",
  alignItems: "center",
  columnGap: 4,
};
const NivoTooltip = (props) => {
  const label = props.label;
  const value = props.value;
  const color = props.color;

  let colorStyle = {
    backgroundColor: color,
  };

  return (
    <div style={rootStyle} className="nivo_tooltip">
      <div style={colorStyle} className="tooltip_color_swatch"></div>
      {label} : {value}
    </div>
  );
};

export default NivoTooltip;
