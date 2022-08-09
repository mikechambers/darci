import React from "react";

const teamStyle = {
  width: 3,
  height: 14,
  //margin: 2,
};

const itemWrapperStyle = {
  width: 200,
  display: "grid",
  gridTemplateColumns: "3px 148px 42px",
  columnGap: 4,
  rowGap: 2,
  alignItems: "center",
};

const valueStyle = {
  display: "flex",
  justifyContent: "flex-end",
};

const rootStyle = {
  display: "flex",
  flexDirection: "column",
  rowGap: 4,
  borderRadius: 4,
  backgroundColor: "var(--list-item-background-color)",
  padding: 8,
};

const LeaderList = (props) => {
  let title = props.title;
  let leaderData = props.leaderData;

  return (
    <div style={rootStyle}>
      <div className="subsection_header underline">{title}</div>
      <div style={itemWrapperStyle}>
        {leaderData.map((item) => {
          return (
            <React.Fragment key={item.player.memberId}>
              <div
                className={`${item.teamName.toLowerCase()}_team`}
                style={teamStyle}
                title={`${item.teamName} team`}
              ></div>
              <div
                className="overflow player_name_small"
                title={item.player.getFullName()}
              >
                {item.player.bungieDisplayName}
                <span className="player_name_code_small">
                  #{item.player.bungieDisplayNameCode}
                </span>
              </div>
              <div style={valueStyle}>{item.stat}</div>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default LeaderList;
