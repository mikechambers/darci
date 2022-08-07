const siteIconStyle = {
  verticalAlign: "middle",
};

const TrialsReportLink = (props) => {
  const url = props.url;
  const descriptipn = props.descriptipn ? props.descriptipn : "Trials Report";

  return (
    <div>
      <a href={url}>
        <img
          src="https://trials.report/assets/svg/icon.svg"
          width="12"
          alt={descriptipn}
          title={descriptipn}
          style={siteIconStyle}
          className="icon_glow"
        />
      </a>
    </div>
  );
};

export default TrialsReportLink;
