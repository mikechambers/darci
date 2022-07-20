import { ReactComponent as ExportDataIcon } from "./images/export_data_icon.svg";

const ExportDataButton = (props) => {
  let onClick = props.onClick;
  let width = props.width ? props.width : 16;
  let height = props.height ? props.height : 16;

  return (
    <ExportDataIcon
      onClick={onClick}
      width={width}
      height={height}
      title="Export data"
    />
  );
};

export default ExportDataButton;
