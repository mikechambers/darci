import { ResponsiveBar } from "@nivo/bar";
import NivoTooltip from "./NivoTooltip";

const rootStyle = {
  width: "100%",
  height: 50,
};

const SingleBarChart = (props) => {
  const data = props.data;

  let keys = [];

  let d = { d: "d" };

  for (const item of data) {
    d[item.label] = item.value;
    keys.push(item.label);
  }

  return (
    <div id="foo" style={rootStyle}>
      <ResponsiveBar
        data={[d]}
        keys={keys}
        indexBy="d"
        animate={false}
        borderRadius={4}
        margin={{ top: 0, right: 12, bottom: 0, left: 12 }}
        minValue={0}
        maxValue={100}
        layout="horizontal"
        valueScale={{ type: "linear" }}
        indexScale={{ type: "band", round: true }}
        colors={{ scheme: "paired" }}
        defs={[
          {
            id: "dots",
            type: "patternDots",
            background: "inherit",
            color: "#38bcb2",
            size: 4,
            padding: 1,
            stagger: true,
          },
          {
            id: "lines",
            type: "patternLines",
            background: "inherit",
            color: "#eed312",
            rotation: -45,
            lineWidth: 6,
            spacing: 10,
          },
        ]}
        fill={[
          {
            match: {
              id: "fries",
            },
            id: "dots",
          },
          {
            match: {
              id: "sandwich",
            },
            id: "lines",
          },
        ]}
        borderColor={{
          from: "color",
          modifiers: [["darker", 1.6]],
        }}
        axisTop={null}
        axisRight={null}
        axisBotton={null}
        axisLeft={null}
        enableGridY={false}
        theme={{
          tooltip: {
            container: {
              color: "#333333",
            },
          },
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{
          from: "color",
          modifiers: [["darker", 1.6]],
        }}
        role="application"
        isFocusable={true}
        ariaLabel=""
        label={function (e) {
          return e.formattedValue + "%";
        }}
        tooltip={(e) => {
          return (
            <NivoTooltip
              label={e.id}
              value={`${e.formattedValue}%`}
              color={e.color}
            />
          );
        }}
      />
    </div>
  );
};

export default SingleBarChart;
