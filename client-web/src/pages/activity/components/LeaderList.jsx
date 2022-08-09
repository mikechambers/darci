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

const titleStyle = {
  font: "var(--font-subsection-header)",
  borderBottom: "1px #ffffff66 solid",
};

const nameStyle = {
  font: "var(--font-small-name)",
};

const nameCodeStyle = {
  font: "var(--font-small-name-code)",
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
      <div style={titleStyle}>{title}</div>
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
                className="overflow"
                style={nameStyle}
                title={item.player.getFullName()}
              >
                {item.player.bungieDisplayName}
                <span className="bungie_name_code" style={nameCodeStyle}>
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
