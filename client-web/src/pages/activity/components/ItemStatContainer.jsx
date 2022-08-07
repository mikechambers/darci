import React from "react";
import Stat from "../../player/components/Stat";

const ItemStatContainer = (props) => {
  const data = props.data;

  let rootStyle = {
    display: "grid",
    gridTemplateColumns: `repeat(${data.length}, 1fr)`,
    columnGap: 16,
  };

  return (
    <div style={rootStyle}>
      {data.map((item) => {
        return (
          <Stat
            key={item.label}
            label={item.label}
            value={item.value}
            highlight={!!item.highlight}
            title={data.title ? data.title : ""}
          />
        );
      })}
    </div>
  );
};

export default ItemStatContainer;
