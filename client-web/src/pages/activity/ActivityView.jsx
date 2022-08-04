import { DateTime, Interval } from "luxon";
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

  //todo: need to test this with rumble
  let alphaTeam = teams[0];
  let betaTeam = teams[1];

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
    width: "60%",
  };

  let matchTimeStyle = {
    width: "40%",
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
    textShadow: "var(--text-shadow)",
  };

  const activityDuration = humanDuration(
    details.activityDurationSeconds * 1000
  );

  //todo: change based on time
  let period = DateTime.fromJSDate(details.period);
  let now = DateTime.now();
  let diff = Interval.fromDateTimes(period, now).length("days");
  let periodHuman;
  if (diff < 2) {
    periodHuman = `${period.toRelativeCalendar()} at ${period.toFormat("t")}`;
  } else if (diff < 7) {
    periodHuman = period.toFormat("EEEE, LLLL d 'at' t");
  } else if (period.get("year") !== now.get("year")) {
    periodHuman = period.toFormat("LLLL d, kkkk 'at' t");
  } else {
    periodHuman = period.toFormat("LLLL d 'at' t");
  }

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

  let modeMapStyle = {
    display: "flex",
    flexDirection: "column",
  };

  let modeIconStyle = {
    width: 70,
    height: 70,
    backgroundImage: `url(${details.modeInfo.icon})`,
    backgroundSize: "cover",
  };

  return (
    <div style={pageContainerStyle}>
      <div style={gappedStyle}>
        <PageViewNavigation links={pageLinks} />
        <div style={summaryStyle}>
          <div style={scoreStyle}>
            <div style={completionReasonStyle}>
              {details.completionReason.label}
            </div>
            <div style={teamScoresStyle}>
              <div style={alphaScoreBoxStyle}>{alphaTeam.score}</div>
              <div style={scoreDivider}></div>
              <div style={betaScoreBoxStyle}>{betaTeam.score}</div>
            </div>
            <div>{activityDuration}</div>
          </div>
          <div style={spacerContainerStyle}></div>
          <div style={gameInfoContainterStyle}>
            <div style={gameInfoStyle}>
              <div style={modeMapContainerStyle}>
                <div style={modeIconStyle}></div>
                <div style={modeMapStyle}>
                  <div style={mapNameStyle}>{details.map.name}</div>
                  <div>
                    <hr style={dividerStyle} />
                  </div>
                  <div style={modeNameStyle}>{details.modeInfo.name}</div>
                </div>
              </div>
            </div>
            <div style={matchTimeStyle}>
              <div style={periodStyle}>{periodHuman}</div>
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
