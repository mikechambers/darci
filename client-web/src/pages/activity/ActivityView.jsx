import { DateTime } from "luxon";
import { useParams } from "react-router-dom";
import { useFetchActivity } from "../../hooks/remote";
import { humanDuration } from "../../utils/date";
import PageViewNavigation from "../player/components/PageViewNavigation";

const ActivityView = (props) => {
  const params = useParams();
  const activityId = params.activityId;

  const [activity, isLoading, error] = useFetchActivity(activityId);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div>
        An error occured <br />
        {error.toString()}
        <br />
        {error.stack}
      </div>
    );
  }

  const pageContainerStyle = {
    minWidth: "720px",
    padding: "0px var(--page-container-padding)",
    background:
      "linear-gradient(180deg, var(--background-color) 0%, rgba(54,54,54,1) 100%)",
  };

  const gappedStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "30px",
  };

  const pageLinks = [
    {
      value: "Overview",
      id: "overview",
    },
    {
      value: "Weapons",
      id: "weapons",
    },
    {
      value: "Meta Weapons",
      id: "meta",
    },
    {
      value: "medals",
      id: "medals",
    },
    {
      value: "maps",
      id: "maps",
    },
    {
      value: "games",
      id: "games",
    },
  ];

  const details = activity.details;
  const teams = activity.teams;

  let summaryStyle = {
    width: 700,
    height: 400,
    backgroundImage: `url(${details.map.image})`,
    backgroundSize: "cover",

    borderRadius: 4,
    display: "flex",
    flexDirection: "column",
    alignItems: "space-apart",
  };

  let scoreStyle = {
    padding: "var(--content-padding)",
    height: "33%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "6px",
  };

  let spacerContainerStyle = {
    height: "50%",
  };
  let gameInfoContainterStyle = {
    height: "25%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-apart",
    alignItems: "flex-end",

    backgroundColor: "#00000044",
    padding: "var(--content-padding)",
  };

  let gameInfoStyle = {
    width: "50%",
  };

  let matchTimeStyle = {
    width: "50%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "flex-end",
  };

  let modeMapContainerStyle = {
    display: "flex",
    flexDirection: "columns",
    alignItems: "center",
  };

  let modeIconStyle = {
    width: 70,
    height: 70,
    backgroundImage: `url(${details.modeInfo.icon})`,
    backgroundSize: "cover",
  };

  let mapNameStyle = {
    font: "var(--font-activity-map-name)",
  };

  let modeNameStyle = {
    font: "var(--font-activity-mode-name)",
    textTransform: "uppercase",
  };

  let dividerStyle = {
    margin: 0,
  };

  let periodStyle = {
    font: "var(--font-activity-period)",
  };

  //todo: need to test this and move to Activity
  let activityDuration = teams[0].players[0].stats.activityDurationSeconds;
  activityDuration = humanDuration(activityDuration * 1000);

  let completionReason = teams[0].players[0].stats.completionReason;

  //let period = DateTime.fromJSDate(details.period).toRelative();

  let period = DateTime.fromJSDate(details.period).toFormat("ff");

  let teamScoresStyle = {
    display: "flex",
    flexDirection: "rows",
    gap: "10px",
  };

  let scoreBoxBaseStyle = {
    width: 60,
    height: 30,
    border: "1px solid #ffffff88",
    font: "var(--font-activity-score-box)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  let alphaScoreBoxStyle = {
    ...scoreBoxBaseStyle,
    backgroundColor: "#567CC6ee",
  };

  let betaScoreBoxStyle = {
    ...scoreBoxBaseStyle,
    backgroundColor: "#9D3627ee",
  };

  let scoreDivider = {
    borderColor: "#ffffff",
    borderStyle: "solid",
    borderWidth: "0px 1px 0px 0px",
  };

  let completionReasonStyle = {
    font: "var(--font-activity-completion-reason)",
    textTransform: "uppercase",
  };

  console.log(activity);
  return (
    <div style={pageContainerStyle}>
      <div style={gappedStyle}>
        <PageViewNavigation links={pageLinks} />
        <div style={summaryStyle}>
          <div style={scoreStyle}>
            <div style={completionReasonStyle}>{completionReason.label}</div>
            <div style={teamScoresStyle}>
              <div style={alphaScoreBoxStyle}>150</div>
              <div style={scoreDivider}></div>
              <div style={betaScoreBoxStyle}>92</div>
            </div>
            <div>{activityDuration}</div>
          </div>
          <div style={spacerContainerStyle}></div>
          <div style={gameInfoContainterStyle}>
            <div style={gameInfoStyle}>
              <div style={modeMapContainerStyle}>
                <div style={modeIconStyle}></div>
                <div>
                  <div style={mapNameStyle}>{details.map.name}</div>
                  <div>
                    <hr style={dividerStyle} />
                  </div>
                  <div style={modeNameStyle}>{details.modeInfo.name}</div>
                </div>
              </div>
            </div>
            <div style={matchTimeStyle}>
              <div style={periodStyle}>{period}</div>
            </div>
          </div>
        </div>
        <div>Activity Id : {activityId}</div>
        <div>
          <a href={`https://destinytracker.com/destiny-2/pgcr/${activityId}`}>
            Destiny Tracker
          </a>
        </div>
        <div>
          <a href={`https://www.bungie.net/en/PGCR/${params.activityId}`}>
            Bungie PGCR
          </a>
        </div>
      </div>
    </div>
  );
};

export default ActivityView;
