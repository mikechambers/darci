const siteIconStyle = {
  verticalAlign: "middle",
};

const DestinyTrackerLink = (props) => {
  const url = props.url;
  const descriptipn = props.descriptipn ? props.descriptipn : "Trials Report";

  return (
    <div>
      <a href={url}>
        <img
          src="https://destinytracker.com/public/icons/icon192.png"
          width="18"
          alt={descriptipn}
          title={descriptipn}
          style={siteIconStyle}
        />
      </a>
    </div>
  );
};

export default DestinyTrackerLink;
