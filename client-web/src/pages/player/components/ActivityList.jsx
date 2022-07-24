import ExportDataButton from "../../../components/ExportDataButton";
import GraphicListHeader from "../../../components/GraphicListHeader";
import ActivityListItem from "./ActivityListItem";

const WIDTH = 735;

const containerStyle = {
  width: `${WIDTH}px`,
  display: "flex",
  flexDirection: "column",
  padding: "var(--content-padding)",
};

const wrapperStyle = {
  display: "flex",
  flexDirection: "column",
  /*gap: "var(--list-item-gap)"*/
  gap: "2px",
};

const footerStyle = {
  display: "flex",
  justifyContent: "space-between",
};

const ActivityList = (props) => {
  let activities = props.activities;
  let summary = props.summary;

  let description =
    "List of most recent activities, displaying stats, highlights and game status.";

  if (props.isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={containerStyle}>
      <GraphicListHeader description={description} title="Games" />

      <div style={wrapperStyle}>
        {activities.map((game, index) => {
          return (
            <ActivityListItem
              activity={game}
              summary={summary}
              key={game.activity.activityId}
            />
          );
        })}
      </div>
      <div style={footerStyle}>
        <div>
          <ExportDataButton />
        </div>
      </div>
    </div>
  );
};

export default ActivityList;
