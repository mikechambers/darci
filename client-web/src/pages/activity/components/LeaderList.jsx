import React from "react";
import { ItemSubType } from "shared";

const teamStyle = {
  width: 3,
  margin: 2,
};

const LeaderList = (props) => {
  let title = props.title;
  let leaderData = props.leaderData;

  const elementWrapperStyle = {
    width: 200,
  };
  const itemWrapperStyle = {
    display: "grid",
    gridTemplateColumns: "10px 160px 30px",
  };

  const valueStyle = {
    display: "flex",
    justifyContent: "flex-end",
  };

  const titleStyle = {
    font: "var(--font-subsection-header)",
    paddingBottom: 8,
  };

  const nameStyle = {
    font: "var(--font-small-name)",
  };

  const nameCodeStyle = {
    font: "var(--font-small-name-code)",
  };
  return (
    <div>
      <div style={titleStyle}>{title}</div>
      <div style={itemWrapperStyle}>
        {leaderData.map((item) => {
          return (
            <React.Fragment key={item.player.memberId}>
              <div
                className={item.teamName.toLowerCase()}
                style={teamStyle}
              ></div>
              <div style={nameStyle}>
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
